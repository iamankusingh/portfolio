// Hero scene (water, island, sun, and camera motion)
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ACESFilmicToneMapping,
  MathUtils,
  SRGBColorSpace,
  Vector3,
} from "three";
import type { DirectionalLight, Fog, Mesh } from "three";
import IslandModel from "./IslandModel";
import Water from "./Water";
import Clouds from "./Clouds";
import MountainRange from "./MountainRange";

type SceneProps = { host: RefObject<HTMLElement | null>; active: boolean };

function SceneMotion({
  host,
  active,
  onReady,
  onLost,
}: SceneProps & {
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
    renderedFrames: 0,
  });

  const camera = useThree((state) => state.camera);
  useEffect(() => {
    camera.position.set(0, 2 + 12 * framing, -8 + 36 * framing);
    camera.lookAt(0, 4, -8);
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
    return () => {
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
    };
  }, [host, active]);

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
    camera.lookAt(0, 4 - state.scroll * 0.5, -8);
    if (state.shade !== state.scroll) {
      host.current?.style.setProperty(
        "--hero-shade",
        String(state.scroll * 0.85),
      );
      state.shade = state.scroll;
    }
  });
  return null;
}

function DawnReveal({
  active,
  sunPosition,
}: {
  active: boolean;
  sunPosition: Vector3;
}) {
  const sun = useRef<Mesh>(null);
  const light = useRef<DirectionalLight>(null);
  const fog = useRef<Fog>(null);
  const elapsed = useRef(0);
  useFrame((_, delta) => {
    if (!active || elapsed.current >= 1.6) return;
    elapsed.current = Math.min(1.6, elapsed.current + Math.min(delta, 0.05));
    const progress = elapsed.current / 1.6;
    const eased = 1 - Math.pow(1 - progress, 3);
    if (sun.current) {
      sun.current.position.set(sunPosition.x, 16 + eased * 10, sunPosition.z);
    }
    if (light.current) light.current.intensity = 0.45 + eased * 0.9;
    if (fog.current) {
      fog.current.near = 25 + eased * 95;
      fog.current.far = 200 + eased * 1200;
    }
  });
  return (
    <>
      <fog ref={fog} attach="fog" args={["#91a6ac", 25, 200]} />
      <directionalLight
        ref={light}
        position={[-12, 22, 12]}
        color="#fff0d5"
        intensity={0.45}
      />
      <ambientLight color="#fff0d5" intensity={0.45} />
      <mesh ref={sun} position={[0, 16, -700]}>
        <sphereGeometry args={[32, 32, 16]} />
        <meshBasicMaterial color="#f3d8a0" toneMapped={false} fog={false} />
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
  const [ready, setReady] = useState(false);
  const sunPosition = useMemo(() => new Vector3(0, 26, -700), []);

  const onReady = useCallback(() => {
    setReady(true);
    onPresented();
  }, [onPresented]);
  const onLost = onUnavailable;

  return (
    <div
      className="absolute inset-0 transition-opacity duration-1100ms motion-reduce:transition-none"
      style={{ opacity: ready ? 1 : 0 }}
      data-scene-quality="high"
    >
      <Canvas
        dpr={[1, 1.75]}
        frameloop={active ? "always" : "demand"}
        camera={{ position: [0, 14, 28], fov: 45, near: 0.5, far: 1100 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "default",
          toneMapping: ACESFilmicToneMapping,
          outputColorSpace: SRGBColorSpace,
        }}
        fallback={null}
        onCreated={({ camera, gl }) => {
          camera.lookAt(0, 4, -8);
          gl.debug.onShaderError = () => {
            console.error(
              "Hero shader compilation failed; retaining the static landscape.",
            );
            onUnavailable();
          };
        }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#91a6ac"]} />

          <hemisphereLight args={["#dce6e5", "#485951", 0.85]} />
          <directionalLight
            position={[18, 10, -28]}
            color="#bdd5e2"
            intensity={0.35}
          />
          <DawnReveal active={active} sunPosition={sunPosition} />
          <IslandModel />
          <MountainRange />
          <Clouds active={active} />
          <Water active={active} sunPosition={sunPosition} />
          <SceneMotion
            host={host}
            active={active}
            onReady={onReady}
            onLost={onLost}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
