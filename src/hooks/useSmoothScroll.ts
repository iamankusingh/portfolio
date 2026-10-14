import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import useMediaQuery from "./useMediaQuery";

gsap.registerPlugin(ScrollToPlugin);

const SCROLL_RESPONSE = 10;
const BRAKING_RESPONSE = 22;
const MAX_PENDING_VIEWPORTS = 1.5;

// Animate the real scroll position so sticky content, hero measurements, and
// React Router restoration all retain the same coordinate system.
export default function useSmoothScroll(locationKey: string) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useLayoutEffect(() => {
    if (reducedMotion) return;

    let running = false;
    let position = window.scrollY;
    let lastWrittenPosition = position;
    let velocity = 0;
    let destination = window.scrollY;
    let direction = 0;
    const menu = document.getElementById("site-navigation");

    function stop() {
      gsap.ticker.remove(update);
      running = false;
      velocity = 0;
      position = window.scrollY;
      lastWrittenPosition = position;
      destination = window.scrollY;
      direction = 0;
    }

    function update(_time: number, deltaMilliseconds: number) {
      // Yield to restoration, anchors, or any scroll performed outside this loop.
      if (Math.abs(window.scrollY - lastWrittenPosition) > 2) {
        stop();
        return;
      }

      const maximum = ScrollToPlugin.max(window);
      destination = gsap.utils.clamp(0, maximum, destination);
      const step = Math.min(deltaMilliseconds / 1000, 0.05);
      const offset = position - destination;
      // A softer response gives released input a longer coast. Brake faster
      // when the destination moves behind us so reversals remain responsive.
      const response =
        velocity * offset > 0 ? BRAKING_RESPONSE : SCROLL_RESPONSE;
      const momentum = velocity + response * offset;
      const decay = Math.exp(-response * step);

      // Exact critically damped spring: preserve velocity between input events
      // and ease acceleration/deceleration without a fresh tween for each tick.
      const nextPosition = destination + (offset + momentum * step) * decay;
      velocity = (velocity - response * momentum * step) * decay;
      position = gsap.utils.clamp(0, maximum, nextPosition);
      if (position !== nextPosition) velocity = 0;

      const settled =
        Math.abs(destination - position) < 0.5 && Math.abs(velocity) < 5;
      if (settled) position = destination;
      window.scrollTo({
        top: position,
        left: window.scrollX,
        behavior: "instant",
      });
      lastWrittenPosition = window.scrollY;
      if (settled) stop();
    }

    function onWheel(event: WheelEvent) {
      if (
        event.defaultPrevented ||
        !event.cancelable ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.shiftKey ||
        !event.deltaY ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        document.hidden ||
        menu?.hasAttribute("open") ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        usesLocalScrolling(event.target)
      ) {
        stop();
        return;
      }

      const rootStyle = getComputedStyle(document.documentElement);
      if (rootStyle.overflowY === "hidden" || rootStyle.overflowY === "clip") {
        stop();
        return;
      }

      const unit =
        event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? window.innerHeight
          : event.deltaMode === WheelEvent.DOM_DELTA_LINE
            ? parseFloat(rootStyle.lineHeight) || 24
            : 1;
      const delta = event.deltaY * unit;
      const nextDirection = Math.sign(delta);

      if (!running) {
        position = window.scrollY;
        lastWrittenPosition = position;
        destination = position;
      }
      // Discard queued travel on reversal while retaining velocity for braking.
      if (direction !== nextDirection) destination = position;
      direction = nextDirection;
      // Bound the backlog during rapid wheel bursts; do not multiply trackpad
      // deltas, which already include the device's own momentum.
      const maximum = ScrollToPlugin.max(window);
      const pendingLimit = window.innerHeight * MAX_PENDING_VIEWPORTS;
      destination = gsap.utils.clamp(
        Math.max(0, position - pendingLimit),
        Math.min(maximum, position + pendingLimit),
        destination + delta,
      );

      if (Math.abs(destination - position) < 0.5 && Math.abs(velocity) < 5) {
        stop();
        return;
      }

      event.preventDefault();
      if (!running) {
        running = true;
        gsap.ticker.add(update);
      }
    }

    const menuObserver = new MutationObserver(stop);
    if (menu)
      menuObserver.observe(menu, {
        attributes: true,
        attributeFilter: ["open"],
      });

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", stop, true);
    window.addEventListener("pointerdown", stop, true);
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("resize", stop);
    window.addEventListener("hashchange", stop);
    window.addEventListener("popstate", stop);
    window.addEventListener("pagehide", stop);
    document.addEventListener("focusin", stop);
    document.addEventListener("visibilitychange", stop);

    return () => {
      stop();
      menuObserver.disconnect();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", stop, true);
      window.removeEventListener("pointerdown", stop, true);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("resize", stop);
      window.removeEventListener("hashchange", stop);
      window.removeEventListener("popstate", stop);
      window.removeEventListener("pagehide", stop);
      document.removeEventListener("focusin", stop);
      document.removeEventListener("visibilitychange", stop);
    };
  }, [locationKey, reducedMotion]);
}

function usesLocalScrolling(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  if (
    target.closest(
      "input, textarea, select, [contenteditable]:not([contenteditable='false']), dialog, [data-native-scroll]",
    )
  )
    return true;

  for (
    let element: Element | null = target;
    element && element !== document.body;
    element = element.parentElement
  ) {
    const style = getComputedStyle(element);
    if (
      /(auto|scroll)/.test(style.overflowY) &&
      element.scrollHeight > element.clientHeight
    )
      return true;
  }
  return false;
}
