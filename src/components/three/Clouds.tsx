import { useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import {
  Box3,
  LoadingManager,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Vector3,
} from "three";
import type { Group, Material } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import modelUrl from "../../assets/3Dmodel/cloud/scene.gltf?url";
import bufferUrl from "../../assets/3Dmodel/cloud/scene.bin?url";
import colorUrl from "../../assets/3Dmodel/cloud/textures/08_-_Default_baseColor.png?url";
import emissiveUrl from "../../assets/3Dmodel/cloud/textures/08_-_Default_emissive.jpeg?url";

const placements: {
  position: [number, number, number];
  width: number;
  yaw: number;
}[] = [
  { position: [-22, 15, -48], width: 13, yaw: -0.2 },
  { position: [3, 17, -58], width: 10, yaw: 0.65 },
  { position: [26, 16, -54], width: 15, yaw: -0.75 },
  { position: [-48, 19, -90], width: 22, yaw: 1.2 },
  { position: [-20, 20, -100], width: 18, yaw: -1.4 },
  { position: [12, 18, -88], width: 20, yaw: 0.3 },
  { position: [44, 21, -106], width: 24, yaw: 2.1 },
  { position: [-76, 24, -155], width: 30, yaw: -2.3 },
  { position: [-45, 25, -170], width: 27, yaw: 0.95 },
  { position: [-12, 23, -148], width: 25, yaw: -0.5 },
  { position: [24, 26, -178], width: 32, yaw: 2.7 },
  { position: [62, 24, -160], width: 28, yaw: -1.8 },
  { position: [-6, 21, -120], width: 15, yaw: 1.65 },
  { position: [73, 22, -125], width: 20, yaw: -2.8 },
];

// Seed the whole visible sky rather than a fixed strip of world-space coordinates.
const horizontalSlots = [-0.94, -0.65, -0.3, 0, 0.35, 0.72, 0.96,
  -0.82, -0.48, -0.15, 0.2, 0.52, 0.84, 0.98];

class CloudLoader extends GLTFLoader {
  constructor() {
    const manager = new LoadingManager();
    manager.setURLModifier((url) => {
      // Resolve every sidecar through Vite, including both texture maps.
      const path = url.split("?")[0];
      if (path.endsWith("scene.bin")) return bufferUrl;
      if (path.endsWith("08_-_Default_baseColor.png")) return colorUrl;
      if (path.endsWith("08_-_Default_emissive.jpeg")) return emissiveUrl;
      return url;
    });
    super(manager);
  }
}

export default function Clouds({ active }: { active: boolean }) {
  const model = useLoader(CloudLoader, modelUrl);
  const groups = useRef<(Group | null)[]>([]);
  const elapsed = useRef(0);
  const viewDirection = useMemo(() => new Vector3(), []);
  const { clouds, cloudMaterials, center, width } = useMemo(() => {
    model.scene.updateMatrixWorld(true);
    const clouds = placements.map(() => model.scene.clone(true));
    const cloudMaterials = clouds.map((cloud) => {
      const owned: Material[] = [];
      cloud.traverse((object) => {
        if (!(object instanceof Mesh)) return;
        const cloneMaterial = (source: Material) => {
          // Independent opacity lets each cloud fade; maps and geometry remain shared.
          const material = source.clone();
          material.depthWrite = false;
          material.transparent = true;
          material.opacity = 0.14;
          if (material instanceof MeshStandardMaterial)
            material.emissiveIntensity = 0.35;
          owned.push(material);
          return material;
        };
        object.material = Array.isArray(object.material)
          ? object.material.map(cloneMaterial)
          : cloneMaterial(object.material);
      });
      return owned;
    });
    const bounds = new Box3().setFromObject(model.scene);
    const center = bounds.getCenter(new Vector3());
    const size = bounds.getSize(new Vector3());
    return {
      clouds,
      cloudMaterials,
      center,
      width: Math.max(size.x, size.z, 0.001),
    };
  }, [model]);

  useEffect(() => () => {
    for (const materials of cloudMaterials)
      for (const material of materials) material.dispose();
  }, [cloudMaterials]);

  useFrame(({ camera, size }, delta) => {
    if (!(camera instanceof PerspectiveCamera)) return;
    if (active) elapsed.current += Math.min(delta, 0.05);
    camera.getWorldDirection(viewDirection);
    const halfFov = Math.tan(MathUtils.degToRad(camera.getEffectiveFOV()) / 2);
    const aspect = size.width / Math.max(size.height, 1);
    for (let index = 0; index < placements.length; index++) {
      const group = groups.current[index];
      if (!group) continue;
      const placement = placements[index];
      const depth = -camera.position.x * viewDirection.x
        + (placement.position[1] - camera.position.y) * viewDirection.y
        + (placement.position[2] - camera.position.z) * viewDirection.z;
      const halfWidth = Math.max(depth, 1) * halfFov * aspect;
      // Keep the fade/recycling zone beyond the viewport, including the cloud's width.
      const limit = halfWidth + placement.width * 0.75 + 20;
      const span = limit * 2;
      const speed = 1.6 + (index % 5) * 0.18;
      const travel = horizontalSlots[index] * halfWidth + limit - elapsed.current * speed;
      const cycle = Math.max(0, -Math.floor(travel / span));
      const x = ((travel % span) + span) % span - limit;
      group.position.x = x;
      // Recycle the fixed pool at the right edge, while completely faded out.
      group.rotation.y = placement.yaw + cycle * 0.63;
      group.scale.setScalar(cycle === 0 ? 1 : 1 + Math.sin(cycle * 2.3 + index) * 0.12);
      const fade = MathUtils.smoothstep(limit - Math.abs(x), 0, 20);
      for (const material of cloudMaterials[index]) material.opacity = 0.14 * fade;
    }
  });

  return placements.map((placement, index) => {
    const scale = placement.width / width;
    return (
      <group
        key={index}
        ref={(group) => { groups.current[index] = group; }}
        position={placement.position}
        rotation={[0, placement.yaw, 0]}
      >
        <primitive
          object={clouds[index]}
          scale={scale}
          position={[-center.x * scale, -center.y * scale, -center.z * scale]}
          dispose={null}
        />
      </group>
    );
  });
}
