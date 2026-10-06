import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import {
  Box3,
  LoadingManager,
  Mesh,
  MeshStandardMaterial,
  Vector3,
} from "three";
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
  { position: [-17, 10, -22], width: 11, yaw: -0.2 },
  { position: [14, 11, -28], width: 9, yaw: 0.35 },
  { position: [-8, 12, -42], width: 13, yaw: 0.15 },
  { position: [23, 9, -46], width: 8, yaw: -0.4 },
];

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

export default function Clouds() {
  const model = useLoader(CloudLoader, modelUrl);
  const { clouds, center, width } = useMemo(() => {
    model.scene.updateMatrixWorld(true);
    model.scene.traverse((object) => {
      if (!(object instanceof Mesh)) return;
      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];
      for (const material of materials) {
        if (!(material instanceof MeshStandardMaterial)) continue;
        // Layered translucent cloud surfaces must not occlude one another in depth.
        // These idempotent settings belong to the single cached cloud resource set.
        material.depthWrite = false;
        material.opacity = 0.14;
        material.emissiveIntensity = 0.35;
      }
    });
    const bounds = new Box3().setFromObject(model.scene);
    const center = bounds.getCenter(new Vector3());
    const size = bounds.getSize(new Vector3());
    return {
      clouds: placements.map(() => model.scene.clone(true)),
      center,
      width: Math.max(size.x, size.z, 0.001),
    };
  }, [model]);

  return placements.map((placement, index) => {
    const scale = placement.width / width;
    return (
      <group
        key={index}
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
