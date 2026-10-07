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

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [dataSaving] = useState(prefersDataSavingLandscape);
  const [requested, setRequested] = useState(false);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onUnavailable = useCallback(() => setFailed(true), []);
  const staticLandscape = reducedMotion || dataSaving || failed;

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
                    active={active}
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
      <div className="mx-auto min-h-[max(100svh,30rem)] flex flex-col justify-end px-page pt-[calc(var(--navigation-top)+var(--navigation-control-size)+1.5rem)] pb-6 sm:pb-8">
        <h3 className="hero-controls w-fit mx-auto flex items-end text-small">
          <span aria-hidden="true">↓</span> Explore
        </h3>
      </div>

      {/* 3D model credits */}
      <div
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
          <p className="pb-4">
            Clouds based on{" "}
            <a
              className="underline"
              href="https://sketchfab.com/3d-models/cloud-test-6d1fff581b3a424d88ee2125f909f3f3"
            >
              Cloud Test
            </a>{" "}
            by{" "}
            <a className="underline" href="https://sketchfab.com/3dartel">
              Andrey Martyanov
            </a>
            , licensed under{" "}
            <a
              className="underline"
              href="https://creativecommons.org/licenses/by/4.0/"
            >
              CC BY 4.0
            </a>
            . Adapted opacity, lighting response, scale, and placement; repeated
            in the sky.
          </p>
          <p className="pb-4">
            Mountains based on{" "}
            <a
              className="underline"
              href="https://sketchfab.com/3d-models/low-poly-mountain-free-dabda46f9be2416c93a4b584be17786b"
            >
              Low Poly Mountain Free
            </a>{" "}
            by{" "}
            <a className="underline" href="https://sketchfab.com/lowpolyartwork">
              Poly Craftsman
            </a>
            , licensed under{" "}
            <a className="underline" href="https://creativecommons.org/licenses/by/4.0/">
              CC BY 4.0
            </a>
            . Adapted scale, rotation, and placement; repeated as a distant range.
          </p>
        </details>
      </div>
    </section>
  );
}
