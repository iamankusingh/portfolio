import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import {
  getHeroLoading,
  subscribeHeroLoading,
} from "../components/three/heroLoading";
import type { HeroReadiness } from "../components/three/heroLoading";

const MAX_WAIT_MS = 15000;
const FONTS = [
  '400 16px "Manrope"',
  '400 16px "Instrument Serif"',
  'italic 400 16px "Instrument Serif"',
];
// Reset on document load, but survive route remounts. Entering Home from another
// initial route is navigation, so it must not introduce a loading screen.
let loaderClaimed = window.location.pathname !== "/";

export default function useHomepageLoading() {
  const [visible, setVisible] = useState(() => !loaderClaimed);
  const [domCompleted, setDomCompleted] = useState(0);
  const [scene, setScene] = useState<HeroReadiness>("pending");
  const [expired, setExpired] = useState(false);
  const models = useSyncExternalStore(subscribeHeroLoading, getHeroLoading);

  const onHeroReady = useCallback((readiness: HeroReadiness) => {
    setScene(readiness);
  }, []);
  const skip = useCallback(() => setExpired(true), []);
  const complete = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible) return;
    // Claim after commit, keeping the state initializer safe under StrictMode.
    // An interrupted loader must not replay on a later route change either.
    loaderClaimed = true;
    let cancelled = false;
    let completed = 0;
    const settle = () => {
      if (!cancelled) setDomCompleted(++completed);
    };
    // Explicit font requests exclude unrelated FontFaceSet activity and lazy media.
    for (const font of FONTS) {
      document.fonts.load(font).then(settle, (error: unknown) => {
        console.warn(`Homepage font unavailable: ${font}`, error);
        settle();
      });
    }
    const logo = new Image();
    logo.src = "/logo.svg";
    logo.decode().then(settle, (error: unknown) => {
      console.warn("Homepage logo unavailable.", error);
      settle();
    });
    return () => {
      cancelled = true;
    };
  }, [visible]);

  const ready =
    scene !== "pending" &&
    (scene === "fallback" || models.completed === 4) &&
    (domCompleted === 4 || expired);
  useEffect(() => {
    if (!visible || ready) return;
    const timeout = window.setTimeout(() => {
      console.warn(
        "Homepage loading timed out; revealing the static landscape.",
      );
      setExpired(true);
    }, MAX_WAIT_MS);
    return () => window.clearTimeout(timeout);
  }, [visible, ready]);

  // Equal resource groups, not estimated bytes or timer-driven progress. The
  // final group resolves only after the scene (or its fallback) has committed.
  const completed =
    (expired ? 4 : domCompleted) +
    (scene === "fallback" ? 4 : models.completed) +
    (scene !== "pending" ? 1 : 0);
  const progress = Math.min(ready ? 100 : 99, (completed / 9) * 100);

  return {
    visible,
    progress,
    forceStatic: expired || models.failed,
    onHeroReady,
    complete,
    skip,
  };
}
