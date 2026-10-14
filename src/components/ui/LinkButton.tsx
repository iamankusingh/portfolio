import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router";
import type { LinkProps } from "react-router";
import useMediaQuery from "../../hooks/useMediaQuery";

const REST_ANGLE = -45;
const RESPONSE = 18;

export default function LinkButton({
  children,
  className = "",
  ...props
}: LinkProps) {
  const arrow = useRef<SVGSVGElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const icon = arrow.current;
    const badge = icon?.parentElement;
    const link = icon?.closest("a");
    if (!icon || !badge || !link || reducedMotion) return;

    let angle = REST_ANGLE;
    let target = REST_ANGLE;
    let velocity = 0;
    let running = false;
    const stop = () => {
      gsap.ticker.remove(update);
      running = false;
    };
    function update(_time: number, deltaMilliseconds: number) {
      if (!icon) return;
      const step = Math.min(deltaMilliseconds / 1000, 0.05);
      const offset = angle - target;
      const momentum = velocity + RESPONSE * offset;
      const decay = Math.exp(-RESPONSE * step);
      angle = target + (offset + momentum * step) * decay;
      velocity = (velocity - RESPONSE * momentum * step) * decay;
      if (Math.abs(angle - target) < 0.05 && Math.abs(velocity) < 0.5) {
        angle = target;
        velocity = 0;
        stop();
      }
      icon.style.transform = `rotate(${angle}deg)`;
    }
    const aim = (degrees: number) => {
      // Choose the nearest equivalent angle across the -180/180 seam, while
      // retaining angular velocity as the pointer changes direction.
      target = angle + gsap.utils.wrap(-180, 180, degrees - angle);
      if (!running) {
        running = true;
        gsap.ticker.add(update);
      }
    };
    const track = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const bounds = badge.getBoundingClientRect();
      const x = event.clientX - (bounds.left + bounds.width / 2);
      const y = event.clientY - (bounds.top + bounds.height / 2);
      // Direction is unstable directly over the compass pivot.
      if (Math.hypot(x, y) < 4) return;
      aim((Math.atan2(y, x) * 180) / Math.PI);
    };
    const reset = () => aim(REST_ANGLE);
    const suspend = () => {
      stop();
      angle = target = REST_ANGLE;
      velocity = 0;
      icon.style.transform = `rotate(${REST_ANGLE}deg)`;
    };
    link.addEventListener("pointerenter", track);
    link.addEventListener("pointermove", track);
    link.addEventListener("pointerleave", reset);
    link.addEventListener("pointercancel", reset);
    window.addEventListener("blur", suspend);
    document.addEventListener("visibilitychange", suspend);
    return () => {
      suspend();
      link.removeEventListener("pointerenter", track);
      link.removeEventListener("pointermove", track);
      link.removeEventListener("pointerleave", reset);
      link.removeEventListener("pointercancel", reset);
      window.removeEventListener("blur", suspend);
      document.removeEventListener("visibilitychange", suspend);
    };
  }, [reducedMotion]);

  return (
    <Link
      {...props}
      className={`group inline-flex min-h-12 items-center justify-between gap-2 rounded-full bg-primary py-1.5 pr-1.5 pl-4 text-left text-small font-medium text-text-dark focus-visible:outline-secondary focus-visible:outline-offset-4 ${className}`}
    >
      <span>{children}</span>
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-text-dark text-primary transition-colors duration-220 group-hover:bg-secondary group-hover:text-text-dark group-focus-visible:bg-secondary group-focus-visible:text-text-dark">
        <svg
          ref={arrow}
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="size-5"
          style={{ transform: "rotate(-45deg)" }}
        >
          <path d="M4 12h15m-6-6 6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
