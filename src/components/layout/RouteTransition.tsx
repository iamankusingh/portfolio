import { useContext, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  ScrollRestoration,
  UNSAFE_DataRouterContext as RouterContext,
  UNSAFE_DataRouterDataContext as RouterDataContext,
  UNSAFE_DataRouterStateContext as RouterStateContext,
  UNSAFE_LocationContext as LocationContext,
  useOutlet,
} from "react-router";
import useMediaQuery from "../../hooks/useMediaQuery";
import Footer from "./Footer";

type Phase = "idle" | "fading-out" | "switching" | "fading-in";

export default function RouteTransition() {
  const locationContext = useContext(LocationContext);
  const routerState = useContext(RouterStateContext);
  const routerData = useContext(RouterDataContext);
  const outlet = useOutlet();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const surfaceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const incoming = { locationContext, routerState, routerData, outlet };
  const [displayed, setDisplayed] = useState(incoming);
  const [requestedLocation, setRequestedLocation] = useState(
    locationContext.location,
  );
  const [phase, setPhase] = useState<Phase>("idle");
  const latest = useRef(incoming);
  const focusedLocation = useRef(locationContext.location);

  // Reconcile before committing children: POP must never render the incoming
  // outlet for even one frame before the outgoing surface reaches zero opacity.
  if (requestedLocation !== locationContext.location) {
    setRequestedLocation(locationContext.location);
    if (
      reducedMotion ||
      (phase === "idle" &&
        displayed.locationContext.location.pathname ===
          locationContext.location.pathname)
    ) {
      setDisplayed(incoming);
      setPhase("idle");
    } else if (phase === "switching") {
      setDisplayed(incoming);
    } else if (phase !== "fading-out") {
      setPhase("fading-out");
    }
  }
  if (reducedMotion && phase !== "idle") {
    setDisplayed(incoming);
    setPhase("idle");
  }

  useLayoutEffect(() => {
    latest.current = incoming;
  });

  useLayoutEffect(() => {
    const surface = surfaceRef.current;
    if (!surface || phase === "idle") return;

    if (phase === "switching") {
      // Commit the new DOM and restoration at opacity zero, then give the
      // browser a painted zero-opacity frame before starting the entrance.
      let secondFrame = 0;
      const firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() => setPhase("fading-in"));
      });
      return () => {
        cancelAnimationFrame(firstFrame);
        cancelAnimationFrame(secondFrame);
      };
    }

    let finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      if (phase === "fading-out") {
        setDisplayed(latest.current);
        setPhase("switching");
      } else {
        setPhase("idle");
      }
    }
    function onEnd(event: TransitionEvent) {
      if (event.target === surface && event.propertyName === "opacity")
        finish();
    }
    surface.addEventListener("transitionend", onEnd);
    // Derive the watchdog from CSS so changing timing cannot desynchronize the
    // swap. It also handles canceled/zero-distance transitions and hidden tabs.
    const duration =
      parseFloat(getComputedStyle(surface).transitionDuration) * 1000;
    const timeout = window.setTimeout(finish, duration + 100);
    return () => {
      finished = true;
      surface.removeEventListener("transitionend", onEnd);
      window.clearTimeout(timeout);
    };
  }, [phase, displayed.locationContext.location]);

  const active = phase === "idle" ? incoming : displayed;
  const location = active.locationContext.location;

  useLayoutEffect(() => {
    if (focusedLocation.current === location || phase === "fading-out") return;
    // The switching surface is inert; transfer focus as soon as it is revealed.
    if (phase === "switching") return;
    let target: HTMLElement | null = mainRef.current;
    if (location.hash) {
      try {
        target =
          document.getElementById(decodeURIComponent(location.hash.slice(1))) ??
          target;
      } catch {
        // Malformed hashes still allow focus to reach the page.
      }
    }
    if (!document.querySelector("dialog[open]")) {
      target?.focus({ preventScroll: true });
    }
    focusedLocation.current = location;
  }, [location, phase]);

  return (
    // A cached outlet alone is insufficient: its descendants would still see
    // the live location and ScrollRestoration would run against the old DOM.
    // Keep this version-sensitive data-router adapter isolated here.
    <LocationContext.Provider value={active.locationContext}>
      <RouterStateContext.Provider value={active.routerState}>
        <RouterDataContext.Provider value={active.routerData}>
          <div
            ref={surfaceRef}
            className="route-transition"
            data-phase={phase}
            inert={phase === "switching"}
          >
            <main
              ref={mainRef}
              id="main-content"
              tabIndex={-1}
              className={
                location.pathname === "/lab" ? "min-h-dvh" : "min-h-screen"
              }
            >
              {active.outlet}
            </main>
            {location.pathname === "/" && <Footer />}
          </div>
          <DisplayedScrollRestoration locationKey={location.key} />
        </RouterDataContext.Provider>
      </RouterStateContext.Provider>
    </LocationContext.Provider>
  );
}

function DisplayedScrollRestoration({ locationKey }: { locationKey: string }) {
  const context = useContext(RouterContext);
  const displayedKey = useRef(locationKey);
  useLayoutEffect(() => {
    displayedKey.current = locationKey;
  }, [locationKey]);

  const scrollContext = useMemo(() => {
    if (!context) return context;
    const router = context.router;
    const enableScrollRestoration: typeof router.enableScrollRestoration = (
      positions,
      getPosition,
      getKey,
    ) =>
      router.enableScrollRestoration(
        positions,
        () => {
          // Rapid navigation can skip a history entry before it is displayed.
          // Do not overwrite it with the outgoing page's scroll position.
          const key = router.state.location.key;
          return key === displayedKey.current
            ? getPosition()
            : (positions[key] ?? 0);
        },
        getKey,
      );
    return {
      ...context,
      router: { ...router, enableScrollRestoration },
    };
  }, [context]);

  return (
    <RouterContext.Provider value={scrollContext}>
      <ScrollRestoration />
    </RouterContext.Provider>
  );
}
