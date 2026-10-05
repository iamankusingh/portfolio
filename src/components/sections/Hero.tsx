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
import { hero } from "../../data/hero";
import useMediaQuery from "../../hooks/useMediaQuery";
import LandscapeFallback from "./LandscapeFallback";

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

function prefersStaticLandscape() {
  const connection =
    "connection" in navigator ? navigator.connection : undefined;
  const saveData =
    connection &&
    typeof connection === "object" &&
    "saveData" in connection &&
    connection.saveData === true;
  return Boolean(
    saveData ||
    (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 2),
  );
}

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [constrained] = useState(prefersStaticLandscape);
  const [requested, setRequested] = useState(false);
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onUnavailable = useCallback(() => setFailed(true), []);
  const staticLandscape = reducedMotion || constrained || failed;

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    let visible = false;
    const menu = document.getElementById("site-navigation");
    const sync = () => {
      const canRender =
        visible && !document.hidden && !menu?.hasAttribute("open");
      setActive(canRender);
      if (canRender) setRequested(true);
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
    return () => {
      observer.disconnect();
      menuObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <section
      ref={section}
      aria-labelledby="hero-title"
      data-intro={staticLandscape ? "static" : ready ? "ready" : "loading"}
      className="hero relative isolate bg-bg-dark"
    >
      {/* 3D scene */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-clip"
        aria-hidden="true"
      >
        <div className="sticky top-0 h-svh min-h-120">
          {staticLandscape ? (
            <LandscapeFallback />
          ) : (
            requested && (
              <SceneBoundary onUnavailable={onUnavailable}>
                <Suspense fallback={null}>
                  <HeroScene
                    host={section}
                    active={active && !paused}
                    onPresented={onReady}
                    onUnavailable={onUnavailable}
                  />
                </Suspense>
              </SceneBoundary>
            )
          )}
          <div className="absolute inset-0 bg-[linear-gradient(0deg,#0b0d0e,transparent_24%,transparent_72%,rgba(11,13,14,0.5))]" />
          <div className="absolute inset-0 bg-bg-dark opacity-(--hero-shade,0)" />
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto flex min-h-[max(100svh,30rem)] flex-col justify-between px-page pt-[calc(var(--navigation-top)+var(--navigation-control-size)+1.5rem)] pb-6 sm:pb-8">
        <h1
          id="hero-title"
          className="hero-name text-center font-display text-[clamp(2.75rem,5.5vw,5.5rem)] leading-none tracking-tight"
        >
          {hero.name}
        </h1>
        <div className="hero-controls mt-72 flex items-end justify-between gap-6 text-small">
          <a
            href="#hero-outlook"
            aria-label="Explore the landscape"
            className="inline-flex min-h-11 items-center gap-3 underline-offset-8 hover:underline"
          >
            <span aria-hidden="true">↓</span> Explore
          </a>
          {requested && !staticLandscape && (
            <button
              type="button"
              aria-pressed={paused}
              onClick={() => setPaused(!paused)}
              className="min-h-11 cursor-pointer underline-offset-8 hover:underline"
            >
              {paused ? "Resume motion" : "Pause motion"}
            </button>
          )}
        </div>
      </div>

      {/* 3D model credits */}
      {/* <div
        id="hero-outlook"
        tabIndex={-1}
        aria-label="End of opening landscape"
        className="min-h-[20svh] px-page py-6"
      >
        <details className="max-w-lg text-micro text-mist">
          <summary className="flex min-h-11 cursor-pointer items-center underline-offset-4 hover:underline">
            Scene credits
          </summary>
          <p className="pb-4">
            Based on{" "}
            <a
              className="underline"
              href="https://sketchfab.com/3d-models/low-poly-floating-island-9700497248364520bd2a9e61272d6b62"
            >
              Low-Poly Floating Island
            </a>{" "}
            by{" "}
            <a className="underline" href="https://sketchfab.com/ramsurya">
              Ram Surya
            </a>
            , licensed under{" "}
            <a className="underline" href="https://sketchfab.com/licenses">
              Sketchfab Standard License
            </a>
            . Adapted scale and placement; embedded water omitted; animated
            water, lighting, and intro added.
          </p>
        </details>
      </div> */}
    </section>
  );
}
