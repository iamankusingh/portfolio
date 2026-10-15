import type { LoadingManager } from "three";

type HeroModel = "island" | "mountain" | "boat" | "cloud";
export type HeroReadiness = "pending" | "ready" | "fallback";

const progress: Record<HeroModel, number> = {
  island: 0,
  mountain: 0,
  boat: 0,
  cloud: 0,
};
const listeners = new Set<() => void>();
let snapshot = { completed: 0, failed: false };

export function subscribeHeroLoading(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getHeroLoading() {
  return snapshot;
}

// Observe the existing private managers, including their buffers and textures.
// Keep this state alongside useLoader's cache across homepage remounts.
export function trackHeroLoading(manager: LoadingManager, model: HeroModel) {
  function update(value: number, failed = false) {
    progress[model] = Math.max(progress[model], value);
    snapshot = {
      completed: Object.values(progress).reduce((sum, item) => sum + item, 0),
      failed: snapshot.failed || failed,
    };
    for (const listener of listeners) listener();
  }

  manager.onProgress = (_url, loaded, total) => {
    // Discovery can increase the denominator; never move the indicator backward.
    update(Math.min(0.95, loaded / Math.max(total, 1)));
  };
  manager.onLoad = () => update(1);
  manager.onError = (url) => {
    console.warn(
      `Hero ${model} resource failed; using the static landscape.`,
      url,
    );
    update(1, true);
  };
}
