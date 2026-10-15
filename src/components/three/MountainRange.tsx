import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { Box3, LoadingManager, Vector3 } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { trackHeroLoading } from "./heroLoading";
import modelUrl from "../../assets/3Dmodel/mountain/scene.gltf?url";
import bufferUrl from "../../assets/3Dmodel/mountain/scene.bin?url";

type MountainPlacement = {
  position: [number, number, number];
  width: number;
  yaw: number;
};

// Overlapping bases form one short range, separated from the foreground island.
const placements: MountainPlacement[] = [
  { position: [-210, -2, -445], width: 140, yaw: -0.65 },
  { position: [-150, -2, -430], width: 165, yaw: 0.4 },
  { position: [-90, -2, -455], width: 150, yaw: 1.7 },
  { position: [-30, -2, -420], width: 190, yaw: -1.1 },
  { position: [30, -2, -450], width: 175, yaw: 2.6 },
  { position: [90, -2, -425], width: 160, yaw: 0.85 },
  { position: [150, -2, -455], width: 145, yaw: -2.1 },
  { position: [210, -2, -440], width: 135, yaw: 1.25 },
];

class MountainLoader extends GLTFLoader {
  constructor() {
    const manager = new LoadingManager();
    trackHeroLoading(manager, "mountain");
    manager.setURLModifier((url) =>
      url.endsWith("/scene.bin") || url === "scene.bin" ? bufferUrl : url,
    );
    super(manager);
  }
}

export default function MountainRange() {
  const model = useLoader(MountainLoader, modelUrl);
  const { mountains, center, bottom, width } = useMemo(() => {
    model.scene.updateMatrixWorld(true);
    const bounds = new Box3().setFromObject(model.scene);
    const size = bounds.getSize(new Vector3());
    return {
      mountains: placements.map(() => model.scene.clone(true)),
      center: bounds.getCenter(new Vector3()),
      bottom: bounds.min.y,
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
          object={mountains[index]}
          scale={scale}
          position={[-center.x * scale, -bottom * scale, -center.z * scale]}
          dispose={null}
        />
      </group>
    );
  });
}
