import { useEffect, useRef, useState } from "react";
import { Mesh, Group, BufferGeometry, Material, Vector3, Euler } from "three";
import { OrbitControls, Loader, useAnimations } from "@react-three/drei";
import { Suspense } from "react";
import { GLTFLoader, GLTF } from "three-stdlib";

interface MeshData {
  key: string;
  name: string;
  geometry: BufferGeometry;
  material: Material;
  position: Vector3;
  rotation: Euler;
  scale: Vector3;
  cashShadow: boolean;
  receiveShadow: boolean;
}

export function ModelGlbControllable(props: JSX.IntrinsicElements["group"]) {
  const [model, setModel] = useState<GLTF | null>(null);
  const group = useRef<Group>(null);
  const [meshData, setMeshData] = useState<MeshData[]>([]);
  const { actions } = useAnimations(model?.animations || [], group);
  const [isActionPlaying, setIsActionPlaying] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    async function fetchModel() {
      const response = await fetch("/media/models/house_animated.glb", {
        headers: { Accept: "application/octet-stream" },
      });
      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();
      const loader = new GLTFLoader();
      loader.parse(arrayBuffer, "", (gltf) => {
        setModel(gltf);
      });
    }
    fetchModel();
  }, []);

  useEffect(() => {
    if (model && group.current) {
      console.log("model", model);
      model.scene.traverse((child: any) => {
        if (child instanceof Mesh) {
          setMeshData((prev) => [
            ...prev,
            {
              key: child.uuid,
              name: child.name,
              geometry: child.geometry,
              material: child.material,
              position: child.position,
              rotation: child.rotation,
              scale: child.scale,
              cashShadow: child.castShadow,
              receiveShadow: child.receiveShadow,
            },
          ]);
        }
      });
    }
  }, [model]);

  // This function is specific to the model being used
  function getActionForMesh(meshName: string): string | undefined {
    const meshIndex = meshName.match(/\d+/)?.[0];
    return meshIndex ? `Cube.${meshIndex.padStart(4, "")}Action` : undefined;
  }

  function playAction(name: string) {
    const action = actions[name];
    if (!action) return;
    action.play();
    setIsActionPlaying((prev) => ({ ...prev, [name]: true }));
  }

  function stopAction(name: string) {
    const action = actions[name];
    if (!action) return;
    action.stop();
    setIsActionPlaying((prev) => ({ ...prev, [name]: false }));
  }

  function handleClick(name: string) {
    isActionPlaying[name] ? stopAction(name) : playAction(name);
  }

  const getOnClickHandler = (meshName: string) => {
    const actionName = getActionForMesh(meshName);
    return actionName ? () => handleClick(actionName) : undefined;
  };

  return (
    <Suspense fallback={<Loader />}>
      {model && meshData && (
        <group ref={group} {...props} dispose={null}>
          <group>
            {meshData.map((el) => (
              <mesh
                key={el.key}
                name={el.name}
                castShadow={el.cashShadow}
                receiveShadow={el.receiveShadow}
                geometry={el.geometry}
                material={el.material}
                position={el.position}
                rotation={el.rotation}
                scale={el.scale}
                onClick={getOnClickHandler(el.name)}
              />
            ))}
          </group>
        </group>
      )}
      <OrbitControls makeDefault />
    </Suspense>
  );
}

export default ModelGlbControllable;
