import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import useMediaQuery from "./useMediaQuery";

type TiltAccess = "unavailable" | "prompt" | "pending" | "granted" | "denied";

// Safari exposes this optional extension ahead of some TypeScript DOM versions.
type OrientationConstructor = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

function orientationAPI(): OrientationConstructor | undefined {
  if (
    !window.isSecureContext ||
    typeof DeviceOrientationEvent === "undefined"
  ) {
    return undefined;
  }
  return DeviceOrientationEvent;
}

export default function useHeroTilt(active: boolean, hero: RefObject<HTMLElement | null>) {
  const touch = useMediaQuery("(pointer: coarse)");
  const [access, setAccess] = useState<TiltAccess>(() => {
    const api = orientationAPI();
    return !api ? "unavailable" : api.requestPermission ? "prompt" : "granted";
  });
  const input = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const element = hero.current;
    const api = orientationAPI();
    if (!element || !active || !touch || !api?.requestPermission || access !== "prompt") return;
    const request = async (event: MouseEvent) => {
      if (!event.isTrusted || !api.requestPermission) return;
      element.removeEventListener("click", request);
      setAccess("pending");
      try {
        // Browsers requiring consent need a real gesture; never prompt on load.
        const permission = await api.requestPermission();
        setAccess(permission === "granted" ? "granted" : "denied");
      } catch {
        setAccess("denied");
      }
    };
    element.addEventListener("click", request);
    return () => element.removeEventListener("click", request);
  }, [active, touch, access, hero]);

  useEffect(() => {
    const value = input.current;
    value.x = 0;
    value.y = 0;
    if (!active || !touch || access !== "granted") return;

    let neutral: { x: number; y: number } | undefined;
    let focused = document.hasFocus();
    const reset = () => {
      neutral = undefined;
      value.x = 0;
      value.y = 0;
    };
    const blur = () => {
      focused = false;
      reset();
    };
    const focus = () => {
      focused = true;
      reset();
    };
    const move = (event: DeviceOrientationEvent) => {
      if (!focused || document.hidden) return;
      const { beta, gamma } = event;
      if (
        beta === null ||
        gamma === null ||
        !Number.isFinite(beta) ||
        !Number.isFinite(gamma)
      )
        return;

      // Project gravity into screen axes, avoiding Euler-angle wrap jumps.
      const radians = Math.PI / 180;
      const angle =
        (window.screen.orientation?.angle ?? window.orientation ?? 0) * radians;
      const gx = -Math.cos(beta * radians) * Math.sin(gamma * radians);
      const gy = Math.sin(beta * radians);
      const x = gx * Math.cos(angle) + gy * Math.sin(angle);
      const y = gy * Math.cos(angle) - gx * Math.sin(angle);
      if (!neutral) neutral = { x, y };
      value.x = Math.max(-1, Math.min(1, (x - neutral.x) / 0.34));
      value.y = Math.max(-1, Math.min(1, (neutral.y - y) / 0.34));
    };

    window.addEventListener("deviceorientation", move, { passive: true });
    window.screen.orientation?.addEventListener("change", reset);
    window.addEventListener("orientationchange", reset);
    window.addEventListener("blur", blur);
    window.addEventListener("focus", focus);
    return () => {
      window.removeEventListener("deviceorientation", move);
      window.screen.orientation?.removeEventListener("change", reset);
      window.removeEventListener("orientationchange", reset);
      window.removeEventListener("blur", blur);
      window.removeEventListener("focus", focus);
      reset();
    };
  }, [active, touch, access]);

  return { input };
}
