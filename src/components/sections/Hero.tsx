// Hero section
import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Link } from "react-router";
import useMediaQuery from "../../hooks/useMediaQuery";
import useHeroTilt from "../../hooks/useHeroTilt";
import type { HeroReadiness } from "../three/heroLoading";
import LandscapeFallback from "./LandscapeFallback";
import Introduction from "./Introduction";

const HeroScene = lazy(() => import("../three/HeroScene"));

class SceneBoundary extends Component<
  { children: ReactNode; onUnavailable: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("The optional hero scene could not load.", error, info);
    this.props.onUnavailable();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function prefersDataSavingLandscape() {
  const connection =
    "connection" in navigator ? navigator.connection : undefined;
  const saveData =
    connection &&
    typeof connection === "object" &&
    "saveData" in connection &&
    connection.saveData === true;
  return Boolean(saveData);
}

type HeroProps = {
  preparing: boolean;
  forceStatic: boolean;
  onReady: (readiness: HeroReadiness) => void;
};

export default function Hero({ preparing, forceStatic, onReady }: HeroProps) {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [dataSaving] = useState(prefersDataSavingLandscape);
  const [requested, setRequested] = useState(false);
  const [active, setActive] = useState(false);
  const progress = useRef(0);
  const viewport = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const onUnavailable = useCallback(() => setFailed(true), []);
  const onSceneReady = useCallback(() => onReady("ready"), [onReady]);
  const staticLandscape = reducedMotion || dataSaving || failed || forceStatic;
  const tilt = useHeroTilt(active && !preparing && !staticLandscape, section);

  useEffect(() => {
    onReady(staticLandscape ? "fallback" : "pending");
  }, [staticLandscape, onReady]);

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    let visible = false;
    const menu = document.getElementById("site-navigation");
    const sync = () => {
      const canRender =
        (visible || preparing) &&
        !document.hidden &&
        !menu?.hasAttribute("open");
      setActive(canRender);
      // Loading is independent of animation visibility. Keep the scene mounted
      // so model and texture requests can finish while the tab is hidden.
      if (visible || preparing) setRequested(true);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    const menuObserver = new MutationObserver(sync);
    if (menu)
      menuObserver.observe(menu, {
        attributes: true,
        attributeFilter: ["open"],
      });
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      observer.disconnect();
      menuObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [preparing]);

  useEffect(() => {
    const element = section.current;
    const stage = viewport.current;
    if (!element || !stage) return;
    if (staticLandscape) {
      progress.current = 0;
      element.style.removeProperty("--intro-opacity");
      element.style.removeProperty("--intro-shade");
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = element.getBoundingClientRect();
      const distance = Math.max(1, bounds.height - stage.clientHeight);
      const value = Math.max(0, Math.min(1, -bounds.top / distance));
      progress.current = value;
      const reveal = Math.max(0, Math.min(1, (value - 0.5) / 0.35));
      const opacity = reveal * reveal * (3 - 2 * reveal);
      element.style.setProperty("--intro-opacity", String(opacity));
      element.style.setProperty("--intro-shade", String(opacity));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(element);
    resize.observe(stage);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      window.cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      element.style.removeProperty("--intro-opacity");
      element.style.removeProperty("--intro-shade");
    };
  }, [staticLandscape]);

  return (
    <section
      ref={section}
      aria-labelledby="hero-title"
      data-landscape={staticLandscape ? "static" : "animated"}
      className="hero min-h-screen relative isolate bg-bg-dark"
    >
      <Link className="skip-link left-1/2 -translate-x-1/2" to="#introduction">
        Skip to introduction
      </Link>
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-clip"
        aria-hidden="true"
      >
        {/* Fill the visible viewport as mobile browser controls hide or return. */}
        <div ref={viewport} className="sticky top-0 h-dvh">
          {staticLandscape ? (
            <LandscapeFallback />
          ) : (
            (requested || preparing) && (
              <SceneBoundary onUnavailable={onUnavailable}>
                <Suspense fallback={null}>
                  <HeroScene
                    progress={progress}
                    tilt={tilt.input}
                    active={active}
                    preparing={preparing}
                    onReady={onSceneReady}
                    onUnavailable={onUnavailable}
                  />
                </Suspense>
              </SceneBoundary>
            )
          )}
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,13,14,0.35),transparent_28%,transparent_75%,rgba(11,13,14,0.25))]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,13,14,0.96),rgba(11,13,14,0.65)_65%,transparent)] opacity-(--intro-shade,0) md:bg-[linear-gradient(90deg,rgba(11,13,14,0.96),rgba(11,13,14,0.8)_42%,rgba(11,13,14,0.12)_80%)]" />
        </div>
      </div>

      {staticLandscape ? (
        <div className="flex min-h-svh items-end justify-center px-page pt-28 pb-8">
          <div className="max-w-md rounded-md bg-bg-dark/90 p-5 text-center text-text-light">
            <p className="text-small font-medium">Simplified landscape</p>
            <p className="mt-2 text-small text-text-light/80">
              {reducedMotion || dataSaving
                ? "This still illustration respects your reduced-motion or data-saving preference."
                : "You’re viewing a still illustration. Reload the page to try the interactive scene again."}
            </p>
            {!reducedMotion && !dataSaving && (
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 min-h-12 cursor-pointer rounded-full bg-primary px-5 py-3 text-small font-medium text-text-dark focus-visible:outline-text-light focus-visible:outline-offset-4"
              >
                Reload interactive scene
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="h-svh" aria-hidden="true" />
      )}
      {!staticLandscape && <div className="h-[60svh]" aria-hidden="true" />}
      <Introduction />
    </section>
  );
}
