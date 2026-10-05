// Hero scene (water, island, sun, and camera motion)
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ACESFilmicToneMapping, MathUtils, SRGBColorSpace } from "three";
import type { DirectionalLight, Fog, Mesh } from "three";
import IslandModel from "./IslandModel";
import Water from "./Water";

type Quality = "high" | "medium" | "low";
type SceneProps = { host: RefObject<HTMLElement | null>; active: boolean };
const qualitySettings = {
  high: { dpr: 1.75 },
  medium: { dpr: 1.25 },
  low: { dpr: 1 },
};

function initialQuality(): Quality {
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const cores = navigator.hardwareConcurrency || 4;
  if (coarse || cores <= 4) return "low";
  return cores >= 8 ? "high" : "medium";
}

function SceneMotion({
  host,
  active,
  quality,
  onSlow,
  onReady,
  onLost,
}: SceneProps & {
  quality: Quality;
  onSlow: () => void;
  onReady: () => void;
  onLost: () => void;
}) {
  const { gl, invalidate, size } = useThree();
  const framing = Math.max(1, 0.95 / (size.width / size.height));
  const motion = useRef({
    x: 0,
    y: 0,
    scroll: 0,
    shade: -1,
    frames: 0,
    elapsed: 0,
    warmup: 0,
    renderedFrames: 0,
  });

  const camera = useThree((state) => state.camera);
  useEffect(() => {
    camera.position.set(0, 2 + 12 * framing, -8 + 36 * framing);
    camera.lookAt(0, 2, -8);
    invalidate();
  }, [camera, framing, invalidate]);

  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => {
      event.preventDefault();
      onLost();
    };
    const element = host.current;
    canvas.addEventListener("webglcontextlost", lost);
    return () => {
      canvas.removeEventListener("webglcontextlost", lost);
      element?.style.removeProperty("--hero-shade");
    };
  }, [gl, host, onLost]);

  useEffect(() => {
    const element = host.current;
    if (!element || !active) return;
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const move = (event: PointerEvent) => {
      if (!pointer.matches || event.pointerType !== "mouse") return;
      motion.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      motion.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    const reset = () => {
      motion.current.x = 0;
      motion.current.y = 0;
    };
    // Scroll only records input; the renderer applies the camera update once per frame.
    const scroll = () => {
      motion.current.scroll = MathUtils.clamp(
        -element.getBoundingClientRect().top / window.innerHeight,
        0,
        1,
      );
    };
    scroll();
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerleave", reset);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    motion.current.frames = 0;
    motion.current.elapsed = 0;
    motion.current.warmup = 0;
    return () => {
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
    };
  }, [host, active, quality]);

  useEffect(() => {
    if (!active || quality !== "low") return;
    // The low tier renders at up to 30fps, with no continuous loop while inactive.
    const timer = window.setInterval(invalidate, 1000 / 30);
    return () => window.clearInterval(timer);
  }, [active, quality, invalidate]);

  useFrame(({ camera }, delta) => {
    const state = motion.current;
    // useFrame precedes drawing: wait until a previous frame has actually rendered.
    if (state.renderedFrames < 2) {
      state.renderedFrames++;
      if (state.renderedFrames === 2) onReady();
      else invalidate();
    }
    if (!active) return;
    const step = Math.min(delta, 0.05);
    camera.position.x = MathUtils.damp(
      camera.position.x,
      state.x * 0.45,
      3,
      step,
    );
    camera.position.y = MathUtils.damp(
      camera.position.y,
      2 + 12 * framing - state.scroll * 0.65 - state.y * 0.18,
      3,
      step,
    );
    camera.position.z = MathUtils.damp(
      camera.position.z,
      -8 + 36 * framing - state.scroll * 2.5,
      3,
      step,
    );
    camera.lookAt(0, 2 - state.scroll * 0.5, -8);
    if (state.shade !== state.scroll) {
      host.current?.style.setProperty(
        "--hero-shade",
        String(state.scroll * 0.85),
      );
      state.shade = state.scroll;
    }
    state.warmup += step;
    if (state.warmup < 2) return;
    state.frames++;
    state.elapsed += Math.min(delta, 0.25);
    if (state.frames >= 120) {
      if (state.elapsed / state.frames > (quality === "low" ? 0.055 : 0.028))
        onSlow();
      state.frames = 0;
      state.elapsed = 0;
    }
  });
  return null;
}

function DawnReveal({ active }: { active: boolean }) {
  const sun = useRef<Mesh>(null);
  const light = useRef<DirectionalLight>(null);
  const fog = useRef<Fog>(null);
  const elapsed = useRef(0);
  useFrame((_, delta) => {
    if (!active || elapsed.current >= 1.6) return;
    elapsed.current = Math.min(1.6, elapsed.current + Math.min(delta, 0.05));
    const progress = elapsed.current / 1.6;
    const eased = 1 - Math.pow(1 - progress, 3);
    if (sun.current) sun.current.position.y = 20 + eased * 10;
    if (light.current) light.current.intensity = 0.6 + eased * 1.4;
    if (fog.current) {
      fog.current.near = 25 + eased * 40;
      fog.current.far = 70 + eased * 130;
    }
  });
  return (
    <>
      <fog ref={fog} attach="fog" args={["#748e96", 25, 70]} />
      <directionalLight
        ref={light}
        position={[0, 25, -8]}
        color="#ffe0a0"
        intensity={0.6}
      />
      <mesh ref={sun} position={[0, 20, -52]}>
        <sphereGeometry args={[3.8, 32, 16]} />
        <meshBasicMaterial color="#f5c84b" toneMapped={false} fog={false} />
      </mesh>
    </>
  );
}

export default function HeroScene({
  host,
  active,
  onPresented,
  onUnavailable,
}: SceneProps & {
  onPresented: () => void;
  onUnavailable: () => void;
}) {
  const [quality, setQuality] = useState<Quality>(initialQuality);
  const [ready, setReady] = useState(false);

  const onReady = useCallback(() => {
    setReady(true);
    onPresented();
  }, [onPresented]);
  const onLost = onUnavailable;
  const onSlow = useCallback(() => {
    if (quality === "low") onUnavailable();
    else setQuality(quality === "high" ? "medium" : "low");
  }, [quality, onUnavailable]);
  const settings = qualitySettings[quality];

  return (
    <div
      className="absolute inset-0 transition-opacity duration-1100ms motion-reduce:transition-none"
      style={{ opacity: ready ? 1 : 0 }}
      data-scene-quality={quality}
    >
      <Canvas
        dpr={[1, settings.dpr]}
        frameloop={active && quality !== "low" ? "always" : "demand"}
        camera={{ position: [0, 14, 28], fov: 45, near: 0.5, far: 260 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "default",
          toneMapping: ACESFilmicToneMapping,
          outputColorSpace: SRGBColorSpace,
        }}
        fallback={null}
        onCreated={({ camera, gl }) => {
          camera.lookAt(0, 2, -8);
          gl.debug.onShaderError = () => {
            console.error(
              "Hero shader compilation failed; retaining the static landscape.",
            );
            onUnavailable();
          };
        }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#748e96"]} />

          <hemisphereLight args={["#d6e2d5", "#263e3b", 1.1]} />
          <DawnReveal active={active} />
          <IslandModel />
          <Water active={active} detailed={quality !== "low"} />
          <SceneMotion
            host={host}
            active={active}
            quality={quality}
            onReady={onReady}
            onLost={onLost}
            onSlow={onSlow}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
