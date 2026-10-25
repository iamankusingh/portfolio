// Island model for the hero scene. The model is loaded from a glTF file and scaled/positioned to fit the scene. The water mesh is removed from the model to allow for custom water rendering.
import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { Box3, LoadingManager, Mesh, Vector3 } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { trackHeroLoading } from "./heroLoading";
import modelUrl from "../../assets/3Dmodel/island/scene.gltf?url";
import bufferUrl from "../../assets/3Dmodel/island/scene.bin?url";

const OCEAN_HEIGHT = -0.15;
// Sink the lower geometry beyond the swell height so it meets the moving ocean.
const SUBMERGED_DEPTH = 1.1;
const ISLAND_YAW = Math.PI / 6;

// A private manager resolves the glTF sidecar to Vite's hashed production URL.
class IslandLoader extends GLTFLoader {
  constructor() {
    const manager = new LoadingManager();
    trackHeroLoading(manager, "island");
    manager.setURLModifier((url) =>
      url.endsWith("/scene.bin") || url === "scene.bin" ? bufferUrl : url,
    );
    super(manager);
  }
}

// Start with the lazy scene import, even before a background canvas can render.
useLoader.preload(IslandLoader, modelUrl);

export default function IslandModel() {
  const model = useLoader(IslandLoader, modelUrl);
  const { island, scale, position } = useMemo(() => {
    // Clone only the hierarchy: the loader cache owns the shared geometry/materials.
    const island = model.scene.clone(true);
    island.updateMatrixWorld(true);
    const waterMeshes: Mesh[] = [];
    island.traverse((object) => {
      if (!(object instanceof Mesh)) return;
      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];
      const isNamedWater = materials.some(
        (material) => material.name.toLowerCase() === "water",
      );
      // This export names its large cyan ocean plane Object_2 / Material.
      const isFloatingIslandWater =
        object.name === "Object_2" &&
        materials.some((material) => material.name === "Material");
      if (isNamedWater || isFloatingIslandWater) {
        waterMeshes.push(object);
      }
    });
    for (const water of waterMeshes) water.removeFromParent();
    island.updateMatrixWorld(true);
    const bounds = new Box3().setFromObject(island);
    const size = bounds.getSize(new Vector3());
    const center = bounds.getCenter(new Vector3());
    const scale = 28 / Math.max(size.x, size.z, 0.001);
    const position: [number, number, number] = [
      -center.x * scale,
      -bounds.min.y * scale,
      -center.z * scale,
    ];
    return { island, scale, position };
  }, [model]);

  // Cached model resources survive route remounts; never dispose the shared cache here.
  return (
    <group
      position={[0, OCEAN_HEIGHT - SUBMERGED_DEPTH, -8]}
      rotation={[0, ISLAND_YAW, 0]}
    >
      <primitive
        object={island}
        scale={scale}
        position={position}
        dispose={null}
      />
    </group>
  );
}
