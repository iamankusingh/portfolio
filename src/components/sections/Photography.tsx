import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { photographs } from "../../data/photograph";
import useMediaQuery from "../../hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

const images = import.meta.glob<string>("../../assets/photographs/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});

// Original collage composition, including frames at the viewport edges.
// [horizontal center, vertical center, maximum width, maximum height].
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
const collection = photographs
  .filter((photo) => photo.displayInHome)
  .map((photo) => ({
    ...photo,
    source: images[`../../assets/photographs/${photo.image}`],
  }));

export default function Photography() {
  const viewer = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const viewerImage = useRef<HTMLImageElement>(null);
  const viewerBackdrop = useRef<HTMLDivElement>(null);
  const closeAnimation = useRef<(() => void) | null>(null);
  const viewerTrigger = useRef<HTMLButtonElement | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof collection)[number] | null>(null);
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const frames = useRef<(HTMLLIElement | null)[]>([]);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const field = useRef<HTMLUListElement>(null);
  const portraitLayout = useMediaQuery("(max-width: 639px)");
  const placements = getPlacements(portraitLayout);
  const travel = Math.max(0.8, ...placements.map(([, y]) => y)) - 0.1;

  useLayoutEffect(() => {
    const dialog = viewer.current;
    const image = viewerImage.current;
    const backdrop = viewerBackdrop.current;
    const trigger = viewerTrigger.current;
    if (!dialog || !image || !backdrop || !trigger || !selectedPhoto) return;
    const previousVisibility = trigger.style.visibility;
    dialog.showModal();
    closeButton.current?.focus({ preventScroll: true });
    // Measure after the modal scroll lock is applied to avoid a shifted start.
    const origin = trigger.getBoundingClientRect();
    let closing = false;
    let ready = false;
    let disposed = false;
    let startFrame = 0;
    let animation: gsap.core.Timeline;
    const fit = () => {
      const ratio = selectedPhoto.width / selectedPhoto.height;
      const width = Math.max(1, Math.min(dialog.clientWidth - 32, Math.max(1, dialog.clientHeight - 144) * ratio));
      const height = width / ratio;
      return { width, height, x: (dialog.clientWidth - width) / 2, y: (dialog.clientHeight - height) / 2 };
    };
    const context = gsap.context(() => {
      const target = fit();
      gsap.set(image, {
        width: target.width,
        height: target.height,
        x: reducedMotion ? target.x : origin.left,
        y: reducedMotion ? target.y : origin.top,
        scale: reducedMotion ? 1 : origin.width / target.width,
        transformOrigin: "top left",
        force3D: true,
        willChange: "transform",
        opacity: 0,
      });
      // Fade a fixed blur layer rather than recalculating the blur every frame.
      gsap.set(backdrop, { opacity: 0, willChange: "opacity" });
      gsap.set(closeButton.current, { opacity: 0 });
      animation = gsap.timeline({ paused: true, defaults: { duration: reducedMotion ? 0 : 0.75, ease: "power2.inOut" } })
        .to(image, { x: target.x, y: target.y, scale: 1 }, 0)
        .to(backdrop, { opacity: 1 }, 0)
        .to(closeButton.current, { opacity: 1, duration: reducedMotion ? 0 : 0.25 }, reducedMotion ? 0 : 0.2);
    }, dialog);

    // Keep the source visible until the fullscreen copy has a decoded bitmap.
    // This also avoids a blank frame when opening a photo for the first time.
    const start = () => {
      if (disposed || closing) return;
      startFrame = requestAnimationFrame(() => {
        if (disposed || closing) return;
        ready = true;
        context.add(() => gsap.set(image, { opacity: 1 }));
        trigger.style.visibility = "hidden";
        animation.play(0);
      });
    };
    void image.decode().then(start, start);

    closeAnimation.current = () => {
      if (closing) return;
      closing = true;
      cancelAnimationFrame(startFrame);
      animation.kill();
      if (!ready) {
        dialog.close();
        return;
      }
      context.add(() => {
        const destination = trigger.getBoundingClientRect();
        const imageWidth = image.offsetWidth;
        animation = gsap.timeline({
          defaults: { duration: reducedMotion ? 0 : 0.55, ease: "power2.inOut" },
          onComplete: () => {
            trigger.style.visibility = previousVisibility;
            dialog.close();
          },
        })
          .to(image, reducedMotion ? { opacity: 0 } : {
            x: destination.left,
            y: destination.top,
            scale: destination.width / imageWidth,
          }, 0)
          .to(backdrop, { opacity: 0 }, 0)
          .to(closeButton.current, { opacity: 0, duration: reducedMotion ? 0 : 0.15 }, 0);
      });
    };
    const resize = () => {
      if (closing) {
        trigger.style.visibility = previousVisibility;
        dialog.close();
        return;
      }
      if (!ready) return;
      animation.progress(1);
      context.add(() => gsap.set(image, { ...fit(), scale: 1 }));
    };
    window.addEventListener("resize", resize);
    return () => {
      disposed = true;
      cancelAnimationFrame(startFrame);
      window.removeEventListener("resize", resize);
      closeAnimation.current = null;
      context.revert();
      trigger.style.visibility = previousVisibility;
      dialog.close();
    };
  }, [selectedPhoto, reducedMotion]);

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
        const openingWidth = Math.min(width * 0.72, height * 0.8, 640);
        timeline = gsap.timeline({
          onUpdate: () => {
            // Keep keyboard navigation on the photographs currently in view.
            frames.current.forEach((frame) => {
              const button = frame?.querySelector("button");
              if (!frame || !button) return;
              const bounds = frame.getBoundingClientRect();
              button.tabIndex =
                Number(gsap.getProperty(frame, "opacity")) > 0.5 &&
                bounds.bottom > 0 && bounds.top < window.innerHeight &&
                bounds.right > 0 && bounds.left < window.innerWidth ? 0 : -1;
            });
          },
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
          const entry = collection[index];
          if (!entry) return;
          const ratio = entry.width / entry.height;
          // Enlarge both dimensions uniformly while retaining the collage centers.
          const photoWidth = Math.min(width * w, height * h * ratio) * 1.3;
          const initialWidth = Math.min(openingWidth, height * 0.64 * ratio);
          const opening =
            index < (portraitLayout ? mobile.length : desktop.length);
          const targetX = x * width;
          gsap.set(photo, {
            width: photoWidth,
            height: photoWidth / ratio,
            xPercent: -50,
            yPercent: -50,
            x: opening ? 0 : targetX,
            y: opening ? 0 : y * height,
            scale: opening ? initialWidth / photoWidth : 1,
            autoAlpha: index === 0 || !opening ? 1 : 0,
          });
          if (!opening) return;
          const delay = index === 0 ? 0 : (index % 4) * 0.035;
          timeline?.to(
            photo,
            {
              x: targetX,
              y: y * height,
              scale: 1,
              duration: 1,
              ease: "power2.inOut",
            },
            delay,
          );
          if (index > 0) {
            timeline?.to(photo, { autoAlpha: 1, duration: 0.16 }, delay);
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
                  : `absolute top-1/2 left-1/2 w-[min(56vw,22.5rem)] overflow-hidden bg-surface-light ${index === 0 ? "z-10" : "opacity-0"}`
              }
            >
              <button
                type="button"
                aria-label={`View ${photo.alt} fullscreen`}
                aria-haspopup="dialog"
                tabIndex={reducedMotion || index === 0 ? 0 : -1}
                className={`block w-full cursor-zoom-in focus-visible:outline-3 focus-visible:-outline-offset-4 focus-visible:outline-sun ${reducedMotion ? "" : "h-full"}`}
                onClick={(event) => {
                  viewerTrigger.current = event.currentTarget;
                  setSelectedPhoto(photo);
                }}
              >
              <img
                src={photo.source}
                alt={photo.alt}
                // loading="lazy"
                decoding="async"
                width={photo.width}
                height={photo.height}
                className={
                  reducedMotion
                    ? "h-auto w-full"
                    : "h-full w-full object-contain"
                }
              />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <dialog
        ref={viewer}
        id="photography-viewer"
        aria-label="Fullscreen photograph"
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden overscroll-contain border-0 bg-transparent p-0 text-white backdrop:bg-transparent"
        onCancel={(event) => {
          event.preventDefault();
          closeAnimation.current?.();
        }}
        onClose={() => {
          if (viewer.current?.open) return;
          setSelectedPhoto(null);
          viewerTrigger.current?.focus({ preventScroll: true });
        }}
      >
        <div ref={viewerBackdrop} aria-hidden="true" className="absolute inset-0 bg-black/30 opacity-0 backdrop-blur-[6px]" />
          {selectedPhoto && (
            <img
              ref={viewerImage}
              src={selectedPhoto.source}
              alt={selectedPhoto.alt}
              width={selectedPhoto.width}
              height={selectedPhoto.height}
              className="absolute top-0 left-0 max-w-none object-contain opacity-0"
              decoding="async"
            />
          )}
        <button
          ref={closeButton}
          type="button"
          aria-label="Close photograph"
          onClick={() => closeAnimation.current?.()}
          className="absolute top-(--navigation-top) right-(--navigation-right) grid size-12 cursor-pointer place-items-center rounded-full bg-bg-light text-text-dark hover:bg-sun focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white sm:size-14"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="m6 6 12 12M6 18 18 6" />
          </svg>
        </button>
      </dialog>
    </section>
  );
}

// Continue the original opening collage with its staggered scrolling rows.
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
