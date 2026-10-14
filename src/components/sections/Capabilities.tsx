import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useMediaQuery from "../../hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

const ORBITS = [0, 1, 2];
const capabilities = {
  label: "capabilities",
  lines: [
    { text: "I bring design and engineering together —", placement: "" },
    { text: "shaping intuitive interfaces,", placement: "pl-[6%] sm:pl-[18%]" },
    {
      text: "building full-stack applications, connecting systems,",
      placement: "sm:pl-[4%]",
    },
    {
      text: "and exploring creative code. From the first idea",
      placement: "pl-[6%] sm:pl-[12%]",
    },
    { text: "to the smallest interaction, I turn complex", placement: "" },
    {
      text: "possibilities into thoughtful digital experiences.",
      placement: "pl-[3%] sm:pl-[10%]",
    },
  ],
};
const circleClass =
  "absolute top-1/2 left-1/2 rounded-full bg-black shadow-[0_0_24px_5px_rgba(0,0,0,0.38)]";

export default function Capabilities() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const center = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const satellites = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useLayoutEffect(() => {
    const element = section.current;
    const viewport = stage.current;
    const core = center.current;
    const orbit = ring.current;
    if (!element || !viewport || !core || !orbit) return;

    const orbitingCircles = satellites.current.slice();
    let frame = 0;
    const update = (scrollProgress: number) => {
      // Keep the opening beats together and reserve more scroll for expansion.
      const progress = scrollProgress * 1.25;
      const width = viewport.clientWidth;
      const height = viewport.clientHeight;
      const size = Math.min(width * 0.72, height * 0.64);
      const merge = beat(progress, 0.6, 0.78);
      const expand = beat(progress, 0.8, 1.2);
      const reveal = beat(progress, 0, 0.04);
      const orbitDiameter = size * 0.74;
      const radius = (orbitDiameter / 2) * (1 - merge);
      // End at the reference's top / lower-right / lower-left arrangement.
      const rotation = (beat(progress, 0.12, 0.6) - 1) * Math.PI * 2;
      const coreDiameter = size * (0.2 + 0.16 * merge);
      // The diagonal covers all four corners, including wide and short screens.
      const coverDiameter = Math.hypot(width, height) + 4;
      const diameter = coreDiameter + (coverDiameter - coreDiameter) * expand;
      const textReveal = beat(progress, 0.84, 1.18);
      const textShade = Math.round(255 * textReveal);
      const glow = beat(progress, 1.1, 1.2);

      // The circle contains the copy; its color, rather than a separate growing
      // text mask, makes the words emerge gradually from black into white.
      viewport.style.setProperty(
        "--capabilities-reveal",
        `circle(${textReveal > 0 ? diameter / 2 : 0}px at 50% 50%)`,
      );
      // Black text is still visible against the light surface while the core
      // is scaling in. Keep the entire layer transparent until its reveal beat.
      viewport.style.setProperty("--capabilities-copy-opacity", textReveal > 0 ? "1" : "0");
      viewport.style.setProperty("--capabilities-text", `rgb(${textShade}, ${textShade}, ${textShade})`);
      viewport.style.setProperty("--capabilities-glow", `0 0 ${12 * glow}px rgb(255 255 255 / ${0.22 * glow})`);

      core.style.opacity = String(reveal);
      core.style.transform = `translate(-50%, -50%) scale(${(diameter / 100) * reveal})`;
      orbit.style.width = `${orbitDiameter}px`;
      orbit.style.height = `${orbitDiameter}px`;
      orbit.style.opacity = String(beat(progress, 0.13, 0.25) * (1 - merge));
      orbit.style.transform = `translate(-50%, -50%) scale(${1 - merge})`;

      orbitingCircles.forEach((satellite, index) => {
        if (!satellite) return;
        const appear = beat(progress, 0.14 + index * 0.07, 0.29 + index * 0.07);
        const angle = rotation - Math.PI / 2 + (index * Math.PI * 2) / 3;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const scale = (size * 0.36 * appear) / 100;
        satellite.style.opacity = String(
          appear * (1 - beat(progress, 0.74, 0.79)),
        );
        satellite.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
      });
    };
    // Measure the center inside the first viewport, not the tall section's
    // midpoint. Entry starts before the stage reaches its sticky position.
    const trigger = reducedMotion ? undefined : ScrollTrigger.create({
      trigger: element,
      start: () => `top+=${viewport.clientHeight / 2} bottom`,
      end: "bottom bottom",
      onUpdate: (self) => update(self.progress),
      onRefresh: (self) => update(self.progress),
    });
    update(reducedMotion ? 1 : trigger?.progress ?? 0);
    const refresh = () => {
      frame = 0;
      if (trigger) trigger.refresh();
      else update(1);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(refresh);
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(element);
    resize.observe(viewport);
    if (element.parentElement) resize.observe(element.parentElement);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      trigger?.kill();
      viewport.style.removeProperty("--capabilities-reveal");
      viewport.style.removeProperty("--capabilities-copy-opacity");
      viewport.style.removeProperty("--capabilities-text");
      viewport.style.removeProperty("--capabilities-glow");
      core.style.removeProperty("opacity");
      core.style.removeProperty("transform");
      orbit.style.removeProperty("width");
      orbit.style.removeProperty("height");
      orbit.style.removeProperty("opacity");
      orbit.style.removeProperty("transform");
      orbitingCircles.forEach((satellite) => {
        satellite?.style.removeProperty("opacity");
        satellite?.style.removeProperty("transform");
      });
    };
  }, [reducedMotion]);

  return (
    <section
      ref={section}
      id="capabilities"
      aria-label="Capabilities"
      tabIndex={-1}
      className={`relative bg-bg-light ${reducedMotion ? "" : "h-[600svh]"}`}
    >
      <div
        ref={stage}
        className={`isolate h-dvh overflow-hidden ${reducedMotion ? "relative bg-black" : "sticky top-0"}`}
      >
        <div
          ref={ring}
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 rounded-full border-2 border-black opacity-0 shadow-[0_0_20px_rgba(0,0,0,0.2)]"
        />
        {ORBITS.map((index) => (
          <div
            key={index}
            aria-hidden="true"
            ref={(element) => {
              satellites.current[index] = element;
            }}
            className={`${circleClass} h-25 w-25 opacity-0`}
          />
        ))}
        <div
          aria-hidden="true"
          ref={center}
          className={`${circleClass} h-25 w-25 opacity-0`}
        />
        <div
          className="capabilities-copy absolute inset-0"
          style={{
            opacity: reducedMotion ? 1 : "var(--capabilities-copy-opacity, 0)",
            color: reducedMotion ? "white" : "var(--capabilities-text, black)",
            textShadow: reducedMotion ? "none" : "var(--capabilities-glow, none)",
            clipPath: reducedMotion
              ? "none"
              : "var(--capabilities-reveal, circle(0px at 50% 50%))",
          }}
        >
          <div
            tabIndex={0}
            role="region"
            aria-label="Capabilities statement"
            className="flex h-full overflow-y-auto px-page pt-[calc(var(--navigation-top)+var(--navigation-control-size)+1.5rem)] pb-8"
          >
            <p className="my-auto flex w-full flex-col gap-[clamp(0.5rem,1.6dvh,1.25rem)] font-display text-[clamp(1.25rem,min(3.7vw,5.2dvh),4rem)] leading-[1.15] tracking-[-0.02em]">
              <span className="mb-2 block font-sans text-micro leading-normal tracking-[0.08em] opacity-60 uppercase">
                {capabilities.label}
              </span>
              {capabilities.lines.map((line) => (
                <span key={line.text} className={`block ${line.placement}`}>
                  {line.text}{" "}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

function beat(progress: number, start: number, end: number) {
  const value = clamp((progress - start) / (end - start));
  return value * value * (3 - 2 * value);
}
