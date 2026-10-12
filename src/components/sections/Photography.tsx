import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { photographs } from "../../data/photographs";
import useMediaQuery from "../../hooks/useMediaQuery";
import placeholder from "../../assets/anku.avif";

gsap.registerPlugin(ScrollTrigger);

const images = import.meta.glob<string>(
  "../../assets/photography/*.{avif,webp,jpg,jpeg,png,AVIF,WEBP,JPG,JPEG,PNG}",
  { eager: true, query: "?url", import: "default" },
);

// Centers relative to the viewport; outer frames intentionally meet its edges.
// [horizontal position, vertical position, width, height], in viewport fractions.
const desktop = [
  [0, -0.19, 0.19, 0.29],
  [-0.23, -0.37, 0.19, 0.29],
  [0.23, -0.39, 0.12, 0.36],
  [-0.46, -0.1, 0.12, 0.32],
  [0.46, -0.1, 0.19, 0.29],
  [-0.23, 0.15, 0.12, 0.32],
  [0.23, 0.18, 0.19, 0.29],
  [0, 0.42, 0.19, 0.3],
  [-0.46, 0.43, 0.13, 0.36],
  [0.46, 0.45, 0.19, 0.32],
  [0, -0.55, 0.12, 0.24],
] as const;
const mobile = [
  [0, -0.22, 0.4, 0.22],
  [-0.38, -0.4, 0.3, 0.2],
  [0.37, -0.4, 0.29, 0.24],
  [-0.43, -0.08, 0.25, 0.2],
  [0.44, -0.06, 0.28, 0.19],
  [-0.28, 0.2, 0.32, 0.22],
  [0.27, 0.23, 0.36, 0.2],
  [0, 0.48, 0.38, 0.22],
  [-0.43, 0.48, 0.24, 0.2],
  [0.44, 0.47, 0.26, 0.24],
  [0, -0.51, 0.24, 0.16],
] as const;
const collection = photographs.map((photo) => {
  const source = images[`../../assets/photography/${photo.image}`];
  return {
    ...photo,
    source: source ?? placeholder,
    alt:
      source && !photo.isPlaceholder
        ? photo.alt
        : "Portrait of Anku Singh (placeholder)",
    isPlaceholder: photo.isPlaceholder || !source,
  };
});

export default function Photography() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const frames = useRef<(HTMLLIElement | null)[]>([]);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const field = useRef<HTMLUListElement>(null);
  const portraitLayout = useMediaQuery("(max-width: 639px)");
  const placements = getPlacements(portraitLayout);
  const travel = Math.max(0.8, ...placements.map(([, y]) => y)) - 0.1;

  useLayoutEffect(() => {
    const element = section.current;
    const viewport = stage.current;
    const photoField = field.current;
    if (!element || !viewport || !photoField || reducedMotion) return;

    let context: gsap.Context | undefined;
    let frame = 0;
    let previousWidth = 0;
    let previousHeight = 0;
    let timeline: gsap.core.Timeline | undefined;
    const refresh = () => {
      frame = 0;
      const width = viewport.clientWidth;
      const height = viewport.clientHeight;
      if (width === previousWidth && height === previousHeight) {
        timeline?.scrollTrigger?.refresh();
        return;
      }
      previousWidth = width;
      previousHeight = height;
      context?.revert();
      context = gsap.context(() => {
        const layout = getPlacements(portraitLayout);
        const openingWidth = Math.min(width * 0.56, height * 0.48, 360);
        timeline = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });

        frames.current.forEach((photo, index) => {
          const placement = layout[index];
          if (!photo || !placement) return;
          const [x, y, w, h] = placement;
          const opening = index < desktop.length;
          gsap.set(photo, {
            width: width * w,
            height: height * h,
            xPercent: -50,
            yPercent: -50,
            x: opening ? 0 : x * width,
            y: opening ? 0 : y * height,
            scale: opening ? openingWidth / (width * w) : 1,
            opacity: index === 0 || !opening ? 1 : 0,
          });
          if (!opening) return;
          const delay = index === 0 ? 0 : (index % 4) * 0.035;
          timeline?.to(
            photo,
            {
              x: x * width,
              y: y * height,
              scale: 1,
              duration: 1,
              ease: "power2.inOut",
            },
            delay,
          );
          if (index > 0) {
            timeline?.to(photo, { opacity: 1, duration: 0.16 }, delay);
          }
        });
        // Only the image field travels; the heading belongs to the sticky stage.
        timeline.to(
          photoField,
          {
            y: -travel * height,
            duration: travel,
            ease: "none",
          },
          1.25,
        );
      }, element);
      timeline?.scrollTrigger?.refresh();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(refresh);
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(viewport);
    if (element.parentElement) resize.observe(element.parentElement);
    refresh();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      context?.revert();
    };
  }, [reducedMotion, portraitLayout, travel]);

  if (!collection.length) return null;

  return (
    <section
      ref={section}
      id="photography"
      aria-labelledby="photography-title"
      tabIndex={-1}
      className="relative bg-bg-light text-text-dark"
      style={
        reducedMotion ? undefined : { height: `${(2.5 + travel) * 100}svh` }
      }
    >
      <div
        ref={stage}
        className={
          reducedMotion
            ? "px-page py-section-md"
            : "sticky top-0 isolate h-dvh overflow-hidden"
        }
      >
        <h2
          id="photography-title"
          className={
            reducedMotion
              ? "mb-10 text-h1 font-semibold tracking-tight"
              : "absolute inset-0 flex items-center justify-center text-[clamp(1.6rem,6.8vw,8rem)] leading-none font-extrabold tracking-[-0.065em] uppercase"
          }
        >
          Photography
        </h2>
        <ul
          ref={field}
          key={reducedMotion ? "static" : "animated"}
          className={
            reducedMotion
              ? "grid grid-cols-2 items-start gap-5 sm:grid-cols-3"
              : "absolute inset-0"
          }
        >
          {collection.map((photo, index) => (
            <li
              key={photo.id}
              ref={(element) => {
                frames.current[index] = element;
              }}
              className={
                reducedMotion
                  ? "overflow-hidden bg-surface-light"
                  : `absolute top-1/2 left-1/2 h-[min(40dvh,27rem)] w-[min(56vw,22.5rem)] overflow-hidden bg-surface-light ${index === 0 ? "z-10" : "opacity-0"}`
              }
            >
              <img
                src={photo.source}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  const image = event.currentTarget;
                  if (image.getAttribute("src") === placeholder) return;
                  image.src = placeholder;
                  image.alt = "Portrait of Anku Singh (image unavailable)";
                }}
                className={
                  reducedMotion
                    ? "aspect-4/5 w-full object-cover"
                    : "h-full w-full object-cover"
                }
                style={{ objectPosition: photo.objectPosition ?? "50% 50%" }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Extend the opening composition with staggered rows; every data entry is shown.
function getPlacements(
  portrait: boolean,
): (readonly [number, number, number, number])[] {
  const opening = portrait ? mobile : desktop;
  const columns = portrait ? 3 : 5;
  return collection.map((_, index) => {
    const initial = opening[index];
    if (initial) return initial;
    const offset = index - opening.length;
    const column = offset % columns;
    const row = Math.floor(offset / columns);
    const x = portrait ? (column - 1) * 0.36 : (column - 2) * 0.23;
    const y = 0.88 + row * 0.48 + (column % 2) * 0.12;
    const wide = (row + column) % 2 === 0;
    return [
      x,
      y,
      portrait ? (wide ? 0.32 : 0.25) : wide ? 0.19 : 0.13,
      wide ? 0.25 : 0.34,
    ];
  });
}
