import { useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import useMediaQuery from "../../hooks/useMediaQuery";

type PageLoaderProps = {
  progress: number;
  onComplete: () => void;
  onSkip: () => void;
};

export default function PageLoader({
  progress,
  onComplete,
  onSkip,
}: PageLoaderProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const circle = useRef<HTMLDivElement>(null);
  const percentage = useRef<HTMLDivElement>(null);
  const value = useRef({ progress: 0 });
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useLayoutEffect(() => {
    const element = dialog.current;
    if (!element) return;
    element.showModal();
    return () => element.close();
  }, []);

  useLayoutEffect(() => {
    const overlay = dialog.current;
    const disc = circle.current;
    const label = percentage.current;
    if (!overlay || !disc || !label) return;
    const expansion = { amount: 0 };
    const renderExpansion = () => {
      // Recalculate from the actual overlay to cover corners after rotation/resize.
      const diameter =
        Math.hypot(overlay.clientWidth, overlay.clientHeight) + 4;
      gsap.set(disc, {
        scale: 1 + (diameter / disc.offsetWidth - 1) * expansion.amount,
      });
    };
    const renderProgress = () => {
      const current = value.current.progress;
      const brightness = Math.round((current / 100) * 255);
      disc.style.backgroundColor = `rgb(${brightness}, ${brightness}, ${brightness})`;
      const percent = Math.floor(current);
      label.textContent = `${percent}%`;
      label.setAttribute("aria-valuenow", String(percent));
    };
    // Rebuild from current progress when resources settle or motion preferences change.
    gsap.set(overlay, { opacity: 1, backgroundColor: "#000000" });
    gsap.set(disc, { scale: 1 });
    gsap.set(label, { opacity: 1 });
    const timeline = gsap.timeline();
    timeline.to(value.current, {
      progress: Math.max(value.current.progress, progress),
      duration: reducedMotion ? 0 : 0.45,
      ease: "power2.out",
      onUpdate: renderProgress,
      onComplete: renderProgress,
    });
    if (progress === 100) {
      if (reducedMotion) {
        timeline.to(overlay, { opacity: 0, duration: 0.12, onComplete });
      } else {
        timeline
          .to(label, { opacity: 0, duration: 0.15 }, "+=0.22")
          .to(
            expansion,
            {
              amount: 1,
              duration: 1.05,
              ease: "power3.inOut",
              onUpdate: renderExpansion,
            },
            "<",
          )
          .set(overlay, { backgroundColor: "#ffffff" })
          .to(overlay, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete,
          });
      }
    }
    window.addEventListener("resize", renderExpansion);
    return () => {
      timeline.kill();
      window.removeEventListener("resize", renderExpansion);
    };
  }, [progress, reducedMotion, onComplete]);

  return createPortal(
    <dialog
      ref={dialog}
      id="homepage-loader"
      aria-label="Loading portfolio"
      aria-describedby="homepage-loading-help"
      onCancel={(event) => {
        event.preventDefault();
        onSkip();
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none touch-none overflow-hidden overscroll-none border-0 bg-[#000000] p-0 text-white outline-none backdrop:bg-transparent"
    >
      <p id="homepage-loading-help" className="sr-only">
        Preparing the homepage. Press Escape to continue with a static
        landscape.
      </p>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          ref={circle}
          aria-hidden="true"
          className="size-[clamp(5rem,12vw,7.5rem)] rounded-full bg-[#000000] will-change-transform"
        />
        <div
          ref={percentage}
          role="progressbar"
          aria-label="Homepage resources"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
          tabIndex={-1}
          autoFocus
          className="absolute top-full left-1/2 mt-6 -translate-x-1/2 font-mono text-xs leading-none tabular-nums outline-none"
        >
          0%
        </div>
      </div>
    </dialog>,
    document.body,
  );
}
