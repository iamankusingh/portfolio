import { useEffect, useRef, useState } from "react";
import { works } from "../../data/works";
import useMediaQuery from "../../hooks/useMediaQuery";
import LinkButton from "../ui/LinkButton";

export default function SelectedWork() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const pinned = !reducedMotion;
  const [activeworks, setActiveworks] = useState(0);

  useEffect(() => {
    if (!pinned) return;
    const element = section.current;
    const viewport = stage.current;
    if (!element || !viewport) return;

    let frame = 0;
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
      setActiveworks(
        Math.min(works.length - 1, Math.floor(progress * works.length)),
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(element);
    resize.observe(viewport);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pinned]);

  return (
    <section
      ref={section}
      id="selected-work"
      tabIndex={-1}
      aria-labelledby="selected-work-title"
      className="relative bg-bg-light text-text-dark"
      style={pinned ? { height: `${(works.length + 1) * 100}svh` } : undefined}
    >
      <div
        ref={stage}
        className={`mx-auto max-w-content px-page pt-[calc(var(--navigation-top)+var(--navigation-control-size)+1rem)] pb-5 ${pinned ? "sticky top-0 flex h-svh flex-col" : ""}`}
      >
        <header className="mb-5 flex shrink-0 flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <h2
            id="selected-work-title"
            className="font-display text-h2 leading-none tracking-tight"
          >
            Selected <span className="italic">work.</span>
          </h2>
          <LinkButton to="/work">View all work</LinkButton>
        </header>
        <div className={pinned ? "grid min-h-0 flex-1" : "grid gap-10"}>
          {works.map((work, index) => {
            const active = !pinned || index === activeworks;
            return (
              <article
                key={work.slug}
                aria-labelledby={`${work.slug}-title`}
                aria-hidden={!active}
                inert={!active}
                style={
                  pinned
                    ? {
                        gridArea: "1 / 1",
                        opacity: active ? 1 : 0,
                        zIndex: active ? 1 : 0,
                      }
                    : undefined
                }
                className={`grid min-h-0 min-w-0 overflow-hidden rounded-md border border-line-light bg-surface-light lg:grid-cols-[3fr_2fr] ${pinned ? "grid-rows-[minmax(0,2fr)_minmax(0,3fr)] transition-opacity duration-420 ease-out motion-reduce:transition-none lg:grid-rows-[minmax(0,1fr)]" : ""} ${active ? "" : "pointer-events-none"}`}
              >
                <div className="min-h-0 min-w-0 bg-surface-light">
                  <img
                    src={
                      new URL(
                        `../../assets/work/${work.image}`,
                        import.meta.url,
                      ).href
                    }
                    alt={work.imageAlt}
                    width="1600"
                    height="1000"
                    loading="lazy"
                    decoding="async"
                    className={pinned ? "h-full w-full object-contain" : "aspect-8/5 w-full object-contain lg:h-full lg:aspect-auto"}
                  />
                </div>
                <div
                  tabIndex={pinned && active ? 0 : undefined}
                  role="region"
                  aria-label={`Work ${index + 1} details`}
                  className={`min-h-0 min-w-0 bg-bg-light p-5 sm:p-6 xl:p-8 ${pinned ? "overflow-y-auto" : ""}`}
                >
                  <p className="mb-4 text-micro tracking-[0.14em] uppercase">
                    Work {String(index + 1).padStart(2, "0")} /{" "}
                    {String(works.length).padStart(2, "0")}
                  </p>
                  <h3
                    id={`${work.slug}-title`}
                    className="font-display text-h1 leading-none tracking-tight"
                  >
                    {work.title}
                  </h3>
                  <p className="mt-5 max-w-sm text-small leading-relaxed text-text-muted-light">
                    {work.description}
                  </p>
                  <dl className="mt-6 grid grid-cols-2 gap-5 border-t border-line-light pt-5 text-small">
                    <div>
                      <dt className="mb-1 text-micro text-text-muted-light">
                        Role
                      </dt>
                      <dd>{work.role}</dd>
                    </div>
                    <div>
                      <dt className="mb-1 text-micro text-text-muted-light">
                        Built with
                      </dt>
                      <dd>{work.technologies}</dd>
                    </div>
                  </dl>
                </div>
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
