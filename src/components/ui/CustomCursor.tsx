import { useEffect } from "react";
import { gsap } from "gsap";
import useMediaQuery from "../../hooks/useMediaQuery";

type CursorLabel = "" | "View";

export default function CustomCursor() {
  const enabled = useMediaQuery(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) and (forced-colors: none)",
  );

  useEffect(() => {
    if (!enabled) return;

    // This effect owns the decorative DOM so it can move into native dialogs
    // (above their backdrops) without moving nodes owned by React.
    const cursor = document.createElement("div");
    cursor.setAttribute("aria-hidden", "true");
    cursor.className =
      "custom-cursor pointer-events-none fixed top-0 left-0 z-[100] h-0 w-0 invisible";
    const circle = document.createElement("div");
    circle.className =
      "absolute -top-12 -left-12 size-24 rounded-full bg-black shadow-[0_0_12px_4px_rgba(255,255,255,0.65)]";
    const label = document.createElement("span");
    label.textContent = "View";
    label.className =
      "absolute -top-12 -left-12 grid size-24 place-items-center font-sans text-base leading-none font-medium tracking-wide text-white opacity-0";
    cursor.append(circle, label);
    document.body.append(cursor);
    gsap.set(circle, { scale: 10 / 96 });
    const setX = gsap.quickSetter(cursor, "x", "px");
    const setY = gsap.quickSetter(cursor, "y", "px");
    let x = 0;
    let y = 0;
    let tracking = false;
    let frame = 0;
    let currentLabel: CursorLabel = "";

    const setLabel = (next: CursorLabel) => {
      if (next === currentLabel) return;
      currentLabel = next;
      gsap.to(circle, {
        scale: next ? 1 : 10 / 96,
        duration: 0.28,
        ease: "power3.out",
        overwrite: true,
      });
      gsap.to(label, {
        opacity: next ? 1 : 0,
        scale: next ? 1 : 0.85,
        duration: next ? 0.2 : 0.12,
        ease: "power2.out",
        overwrite: true,
      });
    };
    const hide = () => {
      cursor.style.visibility = "hidden";
      document.documentElement.classList.remove("custom-cursor-active");
      setLabel("");
    };
    const suspend = () => {
      tracking = false;
      hide();
    };
    const refresh = () => {
      frame = 0;
      const dialogs =
        document.querySelectorAll<HTMLDialogElement>("dialog[open]");
      const host = dialogs.item(dialogs.length - 1) ?? document.body;
      if (cursor.parentElement !== host) host.append(cursor);
      if (!tracking) return;

      const target = document.elementFromPoint(x, y);
      // Keep native text, resize, and select cursors in form controls.
      if (
        !target ||
        target.closest(
          'input, textarea, select, [contenteditable]:not([contenteditable="false"]), iframe',
        )
      ) {
        hide();
        return;
      }
      const disabled = target.closest(
        '[disabled], [aria-disabled="true"], [inert]',
      );
      const next: CursorLabel = disabled
        ? ""
        : target.closest('[data-cursor="view"]')
          ? "View"
          : "";
      setLabel(next);
      cursor.style.visibility = "visible";
      document.documentElement.classList.toggle(
        "custom-cursor-active",
        next !== "",
      );
    };
    const scheduleRefresh = () => {
      if (!frame) frame = requestAnimationFrame(refresh);
    };
    const track = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        suspend();
        return;
      }
      x = event.clientX;
      y = event.clientY;
      tracking = true;
      // Position stays at the actual pointer tip; only the shape and label ease.
      setX(x);
      setY(y);
      scheduleRefresh();
    };
    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) suspend();
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Tab") suspend();
    };
    const observer = new MutationObserver(scheduleRefresh);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["open"],
    });
    refresh();
    document.addEventListener("pointermove", track, true);
    document.addEventListener("pointerover", track, true);
    document.addEventListener("pointerdown", track, true);
    document.addEventListener("pointerout", leave, true);
    document.addEventListener("pointercancel", suspend, true);
    document.addEventListener("dragstart", suspend, true);
    document.addEventListener("keydown", handleKey, true);
    document.addEventListener("visibilitychange", suspend);
    document.addEventListener("scroll", scheduleRefresh, true);
    window.addEventListener("resize", scheduleRefresh);
    window.addEventListener("blur", suspend);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", track, true);
      document.removeEventListener("pointerover", track, true);
      document.removeEventListener("pointerdown", track, true);
      document.removeEventListener("pointerout", leave, true);
      document.removeEventListener("pointercancel", suspend, true);
      document.removeEventListener("dragstart", suspend, true);
      document.removeEventListener("keydown", handleKey, true);
      document.removeEventListener("visibilitychange", suspend);
      document.removeEventListener("scroll", scheduleRefresh, true);
      window.removeEventListener("resize", scheduleRefresh);
      window.removeEventListener("blur", suspend);
      gsap.killTweensOf([circle, label]);
      document.documentElement.classList.remove("custom-cursor-active");
      cursor.remove();
    };
  }, [enabled]);

  return null;
}
