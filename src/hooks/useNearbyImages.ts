import { useEffect } from "react";
import type { RefObject } from "react";

// Start nearby section images before they enter the screen, without asking the
// browser to decode the entire collage at once. Native lazy loading remains the
// fallback and can still prioritize an image that becomes visible first.
export default function useNearbyImages(
  container: RefObject<HTMLElement | null>,
  layoutKey = false,
) {
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    let disposed = false;
    const pending: HTMLImageElement[] = [];
    let active = 0;
    const pump = () => {
      if (disposed) return;
      while (active < 2 && pending.length) {
        const image = pending.shift();
        if (!image) break;
        active++;
        image.loading = "eager";
        const settled = () => {
          active--;
          pump();
        };
        // A failed image must not block the remaining queue.
        void image.decode().then(settled, settled);
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        pending.push(...element.querySelectorAll<HTMLImageElement>("img"));
        pump();
      },
      { rootMargin: "1600px 0px" },
    );
    observer.observe(element);
    return () => {
      disposed = true;
      pending.length = 0;
      observer.disconnect();
    };
  }, [container, layoutKey]);
}
