import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { anku } from "../../data/anku";
import useMediaQuery from "../../hooks/useMediaQuery";
import LinkButton from "../ui/LinkButton";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { about } = anku;
  const section = useRef<HTMLElement>(null);
  const portraitFrame = useRef<HTMLDivElement>(null);
  const portrait = useRef<HTMLImageElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useLayoutEffect(() => {
    const element = section.current;
    const frame = portraitFrame.current;
    const image = portrait.current;
    if (!element || !frame || !image || reducedMotion) return;

    let animation: gsap.core.Tween | undefined;
    const context = gsap.context(() => {
      // Overscan keeps the fixed frame filled throughout the vertical travel.
      animation = gsap.fromTo(
        image,
        { yPercent: 6, scale: 1.14 },
        {
          yPercent: -6,
          scale: 1.14,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.35,
          },
        },
      );
    }, element);
    let refreshFrame = 0;
    const resize = new ResizeObserver(() => {
      if (refreshFrame) return;
      refreshFrame = requestAnimationFrame(() => {
        refreshFrame = 0;
        animation?.scrollTrigger?.refresh();
      });
    });
    resize.observe(element);
    if (element.parentElement) resize.observe(element.parentElement);
    return () => {
      cancelAnimationFrame(refreshFrame);
      resize.disconnect();
      context.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={section}
      id="about"
      aria-labelledby="about-title"
      tabIndex={-1}
      className="bg-bg-light px-page py-section-lg text-text-dark"
    >
      <div>
        <div className="mb-10 border-t border-line-light pt-5 sm:mb-16">
          <p className="text-small tracking-[0.16em] uppercase">
            {about.label}
          </p>
          <h2
            id="about-title"
            className="mt-5 font-display text-display-lg leading-none tracking-[-0.035em]"
          >
            {anku.proffesion}
          </h2>
        </div>

        <div className="grid items-start gap-12 md:grid-cols-2 md:gap-10 lg:gap-24">
          <figure className="min-w-0">
            <div
              ref={portraitFrame}
              className="overflow-hidden bg-surface-light"
            >
              <img
                ref={portrait}
                src={about.portrait.src}
                alt={about.portrait.alt}
                loading="lazy"
                decoding="async"
                className="aspect-4/5 w-full object-cover object-top"
              />
            </div>
            <figcaption className="mt-4 flex flex-wrap justify-between gap-x-6 gap-y-1 text-small">
              <span>{anku.name}</span>
              <span className="text-text-muted-light">{anku.role}</span>
            </figcaption>
          </figure>

          <div className="md:pt-8">
            <p className="mb-5 text-micro tracking-[0.08em] text-text-muted-light uppercase">
              {about.previewLabel}
            </p>
            <h3 className="font-display text-h2 leading-[1.1] tracking-[-0.02em]">
              {about.heading}
            </h3>
            <div className="mt-8 max-w-lg space-y-5 text-body-lg leading-relaxed">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <ul className="mt-8 flex flex-wrap items-center gap-4">
              {about.domain.map((domain, index) => (
                <li
                  key={index}
                  className="rounded-full border border-line-light px-3 py-1 text-small text-text-muted-light hover:text-text-dark hover:border-primary transition-colors duration-200"
                >
                  {domain}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <LinkButton to="/about">More about me</LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
