import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { Box3, LoadingManager, Vector3 } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import modelUrl from "../../assets/3Dmodel/boat/scene.gltf?url";
import bufferUrl from "../../assets/3Dmodel/boat/scene.bin?url";
import hullTextureUrl from "../../assets/3Dmodel/boat/textures/Boat_2_baseColor.png?url";
import detailTextureUrl from "../../assets/3Dmodel/boat/textures/Boat_baseColor.png?url";

const BOAT_LENGTH = 8;
const KEEL_HEIGHT = -0.8;

class BoatLoader extends GLTFLoader {
  constructor() {
    const manager = new LoadingManager();
    manager.setURLModifier((url) => {
      const path = url.split("?")[0];
      if (path.endsWith("scene.bin")) return bufferUrl;
      if (path.endsWith("Boat_2_baseColor.png")) return hullTextureUrl;
      if (path.endsWith("Boat_baseColor.png")) return detailTextureUrl;
      return url;
    });
    super(manager);
  }
}

export default function ShoreBoat() {
  const model = useLoader(BoatLoader, modelUrl);
  const { boat, scale, position } = useMemo(() => {
    // Preserve the source materials and share cached GPU resources across visits.
    const boat = model.scene.clone(true);
    boat.updateMatrixWorld(true);
    const bounds = new Box3().setFromObject(boat);
    const size = bounds.getSize(new Vector3());
    const center = bounds.getCenter(new Vector3());
    const scale = BOAT_LENGTH / Math.max(size.x, size.z, 0.001);
    const position: [number, number, number] = [
      -center.x * scale,
      -bounds.min.y * scale,
      -center.z * scale,
    ];
    return { boat, scale, position };
  }, [model]);

  return (
    <group position={[9, KEEL_HEIGHT, 2]} rotation={[0, 0.8, 0]}>
      <primitive
        object={boat}
        scale={scale}
        position={position}
        dispose={null}
      />
    </group>
  );
}
