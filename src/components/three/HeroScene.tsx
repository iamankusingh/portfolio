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
  CatmullRomCurve3,
  MathUtils,
  SRGBColorSpace,
  Vector3,
} from "three";
import type { DirectionalLight, Fog, Mesh } from "three";
import IslandModel from "./IslandModel";
import Water from "./Water";
import Clouds from "./Clouds";
import MountainRange from "./MountainRange";
import ShoreBoat from "./ShoreBoat";

type SceneProps = { progress: RefObject<number>; active: boolean };

// Center of the house body (Object_4), after IslandModel's normalization and yaw.
const HOUSE = new Vector3(2.65, 3.16, -8.8);

function SceneMotion({
  progress,
  active,
  onReady,
  onLost,
}: SceneProps & {
  onReady: () => void;
  onLost: () => void;
}) {
  const { gl, invalidate, size } = useThree();
  const framing = Math.max(1, 0.95 / (size.width / size.height));
  const portrait = size.width < size.height;
  const motion = useRef({
    x: 0,
    y: 0,
    pointerX: 0,
    pointerY: 0,
    renderedFrames: 0,
  });
  const travel = useMemo(() => {
    const distance = Math.max(1, Math.min(framing, 1.55));
    return {
      path: new CatmullRomCurve3([
        new Vector3(0, 2 + 12 * framing, -8 + 36 * framing),
        new Vector3(-3.5, 10 * distance, 15 * distance),
        new Vector3(
          HOUSE.x - 7 * distance,
          HOUSE.y + 3.8 * distance,
          HOUSE.z + 14 * distance,
        ),
      ]),
      openingTarget: new Vector3(0, 4, -8),
      // Leave room beside the house on wide screens, below it on portrait screens.
      closingTarget: new Vector3(
        HOUSE.x - (portrait ? 0 : 4),
        HOUSE.y - (portrait ? 2.6 : 0.2),
        HOUSE.z,
      ),
      position: new Vector3(),
      target: new Vector3(),
    };
  }, [framing, portrait]);

  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => {
      event.preventDefault();
      onLost();
    };
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, onLost]);

  useEffect(() => {
    const state = motion.current;
    state.x = 0;
    state.y = 0;
    if (!active) return;
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const move = (event: PointerEvent) => {
      if (!pointer.matches || event.pointerType !== "mouse") return;
      state.x = (event.clientX / window.innerWidth - 0.5) * 2;
      state.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    const reset = () => {
      state.x = 0;
      state.y = 0;
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
    };
  }, [active]);

  useFrame(({ camera }, delta) => {
    const state = motion.current;
    if (state.renderedFrames < 2) {
      state.renderedFrames++;
      if (state.renderedFrames === 2) onReady();
      else invalidate();
    }
    if (!active) return;
    // Native scroll is the single clock for camera travel and DOM reveal.
    // Settle before the end so the final portion is a calm reading moment.
    const journey = MathUtils.smoothstep(progress.current, 0, 0.85);
    const step = Math.min(delta, 0.05);
    state.pointerX = MathUtils.damp(state.pointerX, state.x * 0.45, 3, step);
    state.pointerY = MathUtils.damp(state.pointerY, state.y * 0.18, 3, step);
    travel.path.getPoint(journey, travel.position);
    camera.position.copy(travel.position);
    camera.position.x += state.pointerX * (1 - journey);
    camera.position.y -= state.pointerY * (1 - journey);
    travel.target.lerpVectors(travel.openingTarget, travel.closingTarget, journey);
    camera.lookAt(travel.target);
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
  progress,
  active,
  onUnavailable,
}: SceneProps & {
  onUnavailable: () => void;
}) {
  const [ready, setReady] = useState(false);
  const sunPosition = useMemo(() => new Vector3(0, 26, -700), []);

  const onReady = useCallback(() => {
    setReady(true);
  }, []);
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
          <ShoreBoat />
          <MountainRange />
          <Clouds active={active} />
          <Water active={active} sunPosition={sunPosition} />
          <SceneMotion
            progress={progress}
            active={active}
            onReady={onReady}
            onLost={onLost}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

