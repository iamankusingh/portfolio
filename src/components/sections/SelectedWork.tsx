import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { works } from "../../data/works";
import useMediaQuery from "../../hooks/useMediaQuery";
import LinkButton from "../ui/LinkButton";
import WorkContent from "./WorkContent";

const SCROLL_PER_WORK_SVH = 45;

export default function SelectedWork() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const pinned = !reducedMotion;
  const [activeworks, setActiveworks] = useState(0);

  const cards = useRef<(HTMLElement | null)[]>([]);
  const transitionReady = useRef(false);

  useLayoutEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power2.inOut" } });
    cards.current.forEach((card, index) => {
      if (!card) return;
      const image = card.querySelector("img");
      const copy = card.querySelectorAll('[role="region"] > *');
      const active = index === activeworks;
      if (!pinned) {
        gsap.set(card, { clearProps: "opacity" });
        if (image) gsap.set(image, { clearProps: "opacity" });
        gsap.set(copy, { clearProps: "opacity,transform" });
        return;
      }
      if (!transitionReady.current) {
        gsap.set(card, { opacity: active ? 1 : 0 });
        if (image) gsap.set(image, { opacity: active ? 1 : 0 });
        gsap.set(copy, { opacity: active ? 1 : 0, y: active ? 0 : 12 });
        return;
      }
      // Interrupted transitions continue from their current visual values.
      timeline.to(card, { opacity: active ? 1 : 0, duration: 0.65 }, 0);
      if (image)
        timeline.to(image, { opacity: active ? 1 : 0, duration: 0.8 }, 0);
      timeline.to(
        copy,
        {
          opacity: active ? 1 : 0,
          y: active ? 0 : 12,
          duration: active ? 0.65 : 0.35,
          stagger: active ? 0.045 : 0,
          ease: active ? "power2.out" : "power2.inOut",
        },
        active ? 0.08 : 0,
      );
    });
    transitionReady.current = pinned;
    return () => {
      timeline.kill();
    };
  }, [activeworks, pinned]);

  useEffect(() => {
    if (!pinned) return;
    const element = section.current;
    const viewport = stage.current;
    if (!element || !viewport) return;

    let frame = 0;
    let visible = true;
    let previousIndex = -1;
    const update = () => {
      frame = 0;
      const distance = Math.max(
        1,
        element.offsetHeight - viewport.offsetHeight,
      );
      const progress = Math.max(
        0,
        Math.min(1, -element.getBoundingClientRect().top / distance),
      );
      const nextIndex = Math.min(works.length - 1, Math.floor(progress * works.length));
      if (nextIndex !== previousIndex) {
        previousIndex = nextIndex;
        setActiveworks(nextIndex);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onScroll = () => { if (visible) schedule(); };
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    });
    visibility.observe(element);
    const resize = new ResizeObserver(schedule);
    resize.observe(element);
    resize.observe(viewport);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      visibility.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
    };
  }, [pinned]);

  return (
    <section
      ref={section}
      id="selected-work"
      data-daylight="day"
      tabIndex={-1}
      aria-labelledby="selected-work-title"
      className="relative bg-bg-light text-text-dark"
      style={
        pinned
          ? { height: `${100 + works.length * SCROLL_PER_WORK_SVH}svh` }
          : undefined
      }
    >
      <div
        ref={stage}
        className={`isolate px-page pt-[calc(var(--navigation-top)+var(--navigation-control-size)+1rem)] pb-5 ${pinned ? "sticky top-0 flex h-svh flex-col" : "relative"}`}
      >
        <div aria-hidden="true" data-daylight-glow className="daylight-glow" />
        <div className="mb-5 flex shrink-0 flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <h2
            id="selected-work-title"
            className="font-display text-h2 leading-none tracking-tight"
          >
            Selected <span className="italic">work.</span>
          </h2>
          <LinkButton to="/work">View All Works</LinkButton>
        </div>

        <div className={pinned ? "grid min-h-0 flex-1" : "grid gap-10"}>
          {works.map((work, index) => {
            const active = !pinned || index === activeworks;
            return (
              <article
                key={work.slug}
                ref={(element) => {
                  cards.current[index] = element;
                }}
                aria-labelledby={`${work.slug}-title`}
                aria-hidden={!active}
                inert={!active}
                style={
                  pinned
                    ? {
                        gridArea: "1 / 1",
                        zIndex: active ? 1 : 0,
                      }
                    : undefined
                }
                className={`grid min-h-0 min-w-0 overflow-hidden rounded-md border border-line-light bg-surface-light lg:grid-cols-[3fr_2fr] ${pinned ? "grid-rows-[minmax(0,2fr)_minmax(0,3fr)] lg:grid-rows-[minmax(0,1fr)]" : ""} ${active ? "" : "pointer-events-none"}`}
              >
                <WorkContent
                  work={work}
                  index={index}
                  total={works.length}
                  constrained={pinned}
                  active={active}
                />
              </article>
            );
          })}
        </div>

        {pinned && (
          <p className="mt-3 shrink-0 text-micro text-text-muted-light">
            Scroll to explore · {String(activeworks + 1).padStart(2, "0")} /{" "}
            {String(works.length).padStart(2, "0")}
          </p>
        )}
      </div>
    </section>
  );
}
