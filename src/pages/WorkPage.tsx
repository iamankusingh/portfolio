import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { works } from "../data/works";
import useMediaQuery from "../hooks/useMediaQuery";
import WorkContent from "../components/sections/WorkContent";

gsap.registerPlugin(ScrollTrigger);

export default function WorkPage() {
  const list = useRef<HTMLDivElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const shortViewport = useMediaQuery("(max-height: 40rem)");
  const stacked = !reducedMotion && !shortViewport;

  useLayoutEffect(() => {
    const element = list.current;
    if (!element || !stacked) return;

    const cards = Array.from(element.querySelectorAll<HTMLElement>("article"));
    if (cards.length < 2) return;
    const top = () => parseFloat(getComputedStyle(cards[0]).top);
    const step = () =>
      cards[0].offsetHeight + parseFloat(getComputedStyle(element).rowGap);
    const animations: gsap.core.Tween[] = [];
    const context = gsap.context(() => {
      cards.slice(0, -1).forEach((card, index) => {
        const surface = card.firstElementChild;
        if (!surface) return;
        animations.push(
          gsap.to(surface, {
            scale: 0.96,
            ease: "none",
            scrollTrigger: {
              // A sticky card's viewport position no longer represents its
              // original place in the document, so measure from the list.
              trigger: element,
              start: () =>
                `top+=${(index + 1) * step() - card.offsetHeight} ${top()}`,
              end: () => `top+=${(index + 1) * step()} ${top()}`,
              scrub: 0.3,
              invalidateOnRefresh: true,
            },
          }),
        );
      });
    }, element);

    let frame = 0;
    const scheduleRefresh = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        animations.forEach((tween) => tween.scrollTrigger?.refresh());
      });
    };
    const resize = new ResizeObserver(scheduleRefresh);
    resize.observe(element);
    if (element.parentElement) resize.observe(element.parentElement);
    cards.forEach((card) => resize.observe(card));
    scheduleRefresh();

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      context.revert();
    };
  }, [stacked]);

  return (
    <>
      <title>Work — Anku Singh</title>
      <section
        aria-labelledby="work-title"
        className="bg-bg-light px-page pt-[calc(var(--navigation-top)+var(--navigation-control-size)+1rem)] pb-section-sm text-text-dark"
      >
        <header className="mb-8 text-center">
          <h1
            id="work-title"
            className="border-b border-line-light pb-6 font-display text-h2 leading-none tracking-tight"
          >
            Work
          </h1>
          <p className="mt-3 text-micro text-text-muted-light">
            {String(works.length).padStart(2, "0")} works · Scroll to explore
          </p>
        </header>

        <div ref={list} className="relative isolate flex flex-col gap-10">
          {works.map((work, index) => (
            <article
              key={work.slug}
              aria-labelledby={`${work.slug}-title`}
              className={
                stacked
                  ? "sticky top-[calc(var(--navigation-top)+var(--navigation-control-size)+1rem)] h-[calc(100svh-var(--navigation-top)-var(--navigation-control-size)-2.25rem)] min-w-0 shrink-0"
                  : "relative min-w-0"
              }
              style={{ zIndex: index }}
              onFocusCapture={(event) => {
                if (!stacked || !event.target.matches(":focus-visible")) return;
                const element = list.current;
                if (!element) return;
                const card = event.currentTarget;
                const gap = parseFloat(getComputedStyle(element).rowGap);
                const top = parseFloat(getComputedStyle(card).top);
                // Tab and Shift+Tab bring covered cards back into view.
                window.scrollTo({
                  top:
                    window.scrollY +
                    element.getBoundingClientRect().top +
                    index * (card.offsetHeight + gap) -
                    top,
                  behavior: "instant",
                });
              }}
            >
              <div
                className={`grid min-h-0 min-w-0 origin-top overflow-hidden rounded-md border border-line-light bg-surface-light lg:grid-cols-[3fr_2fr] ${stacked ? "h-full grid-rows-[minmax(0,2fr)_minmax(0,3fr)] lg:grid-rows-[minmax(0,1fr)]" : ""}`}
              >
                <WorkContent
                  work={work}
                  index={index}
                  total={works.length}
                  constrained={stacked}
                  heading="h2"
                  priority={index === 0}
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
