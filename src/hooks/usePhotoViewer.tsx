import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import type { Photograph } from "../data/photograph";
import useMediaQuery from "./useMediaQuery";

type ViewerPhotograph = Photograph & { source: string };

export default function usePhotoViewer() {
  const viewer = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const viewerImage = useRef<HTMLImageElement>(null);
  const viewerBackdrop = useRef<HTMLDivElement>(null);
  const viewerLocation = useRef<HTMLParagraphElement>(null);
  const closeAnimation = useRef<(() => void) | null>(null);
  const viewerTrigger = useRef<HTMLButtonElement | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<ViewerPhotograph | null>(
    null,
  );
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useLayoutEffect(() => {
    const dialog = viewer.current;
    const image = viewerImage.current;
    const backdrop = viewerBackdrop.current;
    const trigger = viewerTrigger.current;
    const location = viewerLocation.current;
    const controls = location
      ? [closeButton.current, location]
      : closeButton.current;
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
      const captionSpace = location ? location.offsetHeight + 12 : 0;
      const width = Math.max(
        1,
        Math.min(
          dialog.clientWidth - 32,
          Math.max(1, dialog.clientHeight - 144 - captionSpace) * ratio,
        ),
      );
      const height = width / ratio;
      return {
        width,
        height,
        x: (dialog.clientWidth - width) / 2,
        y: (dialog.clientHeight - height - captionSpace) / 2,
      };
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
      gsap.set(controls, { opacity: 0 });
      if (location) gsap.set(location, { top: target.y + target.height + 12 });
      animation = gsap
        .timeline({
          paused: true,
          defaults: {
            duration: reducedMotion ? 0 : 0.5,
            ease: "power2.inOut",
          },
        })
        .to(image, { x: target.x, y: target.y, scale: 1 }, 0)
        .to(backdrop, { opacity: 1 }, 0)
        .to(
          controls,
          { opacity: 1, duration: reducedMotion ? 0 : 0.2 },
          reducedMotion ? 0 : 0.1,
        );
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
        animation = gsap
          .timeline({
            defaults: {
              duration: reducedMotion ? 0 : 0.5,
              ease: "power2.inOut",
            },
            onComplete: () => {
              trigger.style.visibility = previousVisibility;
              dialog.close();
            },
          })
          .to(
            image,
            reducedMotion
              ? { opacity: 0 }
              : {
                  x: destination.left,
                  y: destination.top,
                  scale: destination.width / imageWidth,
                },
            0,
          )
          .to(backdrop, { opacity: 0 }, 0)
          .to(controls, { opacity: 0, duration: reducedMotion ? 0 : 0.15 }, 0);
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
      context.add(() => {
        const target = fit();
        gsap.set(image, { ...target, scale: 1 });
        if (location)
          gsap.set(location, { top: target.y + target.height + 12 });
      });
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

  const openPhoto = (photo: ViewerPhotograph, trigger: HTMLButtonElement) => {
    viewerTrigger.current = trigger;
    setSelectedPhoto(photo);
  };

  const photoViewer = (
    <dialog
      ref={viewer}
      id="photography-viewer"
      aria-label="Fullscreen photograph"
      aria-describedby={
        selectedPhoto?.location.trim()
          ? "photography-viewer-location"
          : undefined
      }
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden overscroll-contain border-0 bg-transparent p-0 text-white backdrop:bg-transparent"
      onClick={(event) => {
        if (
          event.target === event.currentTarget ||
          event.target === viewerBackdrop.current
        ) {
          closeAnimation.current?.();
        }
      }}
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
      <div
        ref={viewerBackdrop}
        aria-hidden="true"
        className="absolute inset-0 bg-black/30 opacity-0 backdrop-blur-[6px]"
      />
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
      {selectedPhoto?.location.trim() && (
        <p
          ref={viewerLocation}
          id="photography-viewer-location"
          className="absolute left-1/2 w-max max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-full bg-bg-light px-5 py-2 text-center text-small leading-snug wrap-break-word text-text-dark opacity-0"
        >
          <span className="sr-only">Location: </span>
          {selectedPhoto.location}
        </p>
      )}
      <button
        ref={closeButton}
        type="button"
        aria-label="Close photograph"
        onClick={() => closeAnimation.current?.()}
        className="absolute top-(--navigation-top) right-(--navigation-right) grid size-12 cursor-pointer place-items-center rounded-full bg-bg-light text-text-dark hover:bg-sun focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white sm:size-14"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="m6 6 12 12M6 18 18 6" />
        </svg>
      </button>
    </dialog>
  );

  return { openPhoto, photoViewer };
}
