import * as THREE from "three";
import { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { OrbitControls, Loader } from "@react-three/drei";
import { Group } from "three";
import { Suspense } from "react";
import { GLTFLoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";

/** 
The elmeents representing the model (group, mesh, nodes, materials, actions...) were auto-generated using: https://gltf.pmnd.rs 
*/

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
    Cube001: THREE.Mesh;
    Cube002: THREE.Mesh;
    Cube003: THREE.Mesh;
    Plane: THREE.Mesh;
    Plane001: THREE.Mesh;
    Cube005: THREE.Mesh;
    Cube007: THREE.Mesh;
    Cube004: THREE.Mesh;
    Cube006: THREE.Mesh;
    Cube008: THREE.Mesh;
    Cube009: THREE.Mesh;
    Cube010: THREE.Mesh;
    Cube011: THREE.Mesh;
    Cube012: THREE.Mesh;
    Plane002: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
    ["Material.002"]: THREE.MeshPhysicalMaterial;
  };
  animations: GLTFAction[];
};

type ActionName = "Cube.002Action" | "Cube.003Action" | "Cube.005Action";

// This type is a bit of a hack, but it's the easiest way to get the correct type for the actions Cf: https://github.com/pmndrs/gltfjsx/issues/101
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}
export function Model3DViewer(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<Group>(null);
  const { nodes, materials, animations } = useLoader(
    GLTFLoader,
    "blob:http://localhost:4173/6a7a5cda-0fd1-4714-9b46-59a13e6c7913"
  ) as GLTFResult;

  console.log("Nodes", nodes);
  console.log("Materials", materials);
  console.log("Animations", animations);

  const nodes_result = nodes;
  const materials_results = materials;
  const animations_result = animations;

  const { actions } = useAnimations(animations_result, group);
  console.log("actions", actions);
  var isActionPlaying = false;

  function playAction(name: ActionName) {
    const action = actions[name];
    if (!action) return;
    action.play();
    isActionPlaying = true;
  }

  function stopAction(name: ActionName) {
    const action = actions[name];
    if (!action) return;
    action.stop();
    isActionPlaying = false;
  }

  function handleClick(name: ActionName) {
    if (isActionPlaying) {
      stopAction(name);
    } else {
      playAction(name);
    }
  }

  return (
    <Suspense fallback={<Loader />}>
      <OrbitControls makeDefault />
      <group ref={group} {...props} dispose={null}>
        {nodes_result && materials_results && (
          <group name="Scene">
            <mesh
              name="Cube"
              castShadow
              receiveShadow
              geometry={nodes_result.Cube?.geometry}
              material={materials_results.Material}
              position={[-0.176, 0.869, 2.082]}
            />
            <mesh
              name="Cube001"
              castShadow
              receiveShadow
              geometry={nodes_result.Cube001.geometry}
              material={materials_results.Material}
              position={[0.939, 0.524, 0.016]}
            />
            <mesh
              name="Cube002"
              castShadow
              receiveShadow
              geometry={nodes_result.Cube002.geometry}
              material={materials_results.Material}
              position={[1.302, 0.927, 0.32]}
              rotation={[0, 0.006, 0]}
              onClick={() => handleClick("Cube.002Action")}
            />
            <mesh
              name="Cube003"
              castShadow
              receiveShadow
              geometry={nodes_result.Cube003.geometry}
              material={materials_results.Material}
              position={[1.19, 1.203, -3.023]}
              rotation={[0, 0, 1.694]}
              onClick={() => handleClick("Cube.003Action")}
            />
            <mesh
              name="Plane"
              castShadow
              receiveShadow
              geometry={nodes_result.Plane.geometry}
              material={materials_results["Material.002"]}
              position={[1.294, 0.792, 1.501]}
              rotation={[0, 0, -Math.PI / 2]}
              scale={[0.211, 0.319, 0.384]}
            />
            <mesh
              name="Plane001"
              castShadow
              receiveShadow
              geometry={nodes_result.Plane001.geometry}
              material={materials_results["Material.002"]}
              position={[1.304, 0.792, -1.492]}
              rotation={[0, 0, -Math.PI / 2]}
              scale={[0.211, 0.319, 0.384]}
            />
            <mesh
              name="Cube005"
              castShadow
              receiveShadow
              geometry={nodes_result.Cube005.geometry}
              material={materials_results.Material}
              position={[0.011, 0.831, 3.839]}
              rotation={[Math.PI, -1.409, Math.PI]}
              onClick={() => handleClick("Cube.005Action")}
            />
            <mesh
              name="Cube007"
              castShadow
              receiveShadow
              geometry={nodes_result.Cube007.geometry}
              material={materials_results.Material}
              position={[0.605, -0.029, 1.899]}
              rotation={[-0.044, 0.701, -1.506]}
              scale={[0.032, 0.101, 0.101]}
            />
            <mesh
              name="Cube004"
              castShadow
              receiveShadow
              geometry={nodes_result.Cube004.geometry}
              material={materials_results.Material}
              position={[-0.594, -0.029, 1.899]}
              rotation={[-0.044, 0.701, -1.506]}
              scale={[0.032, 0.101, 0.101]}
            />
            <mesh
              name="Cube006"
              castShadow
              receiveShadow
              geometry={nodes_result.Cube006.geometry}
              material={materials_results.Material}
              position={[-1.21, -0.029, 0.422]}
              rotation={[-0.052, -0.865, -1.574]}
              scale={[0.032, 0.101, 0.101]}
            />
            <mesh
              name="Cube008"
              castShadow
              receiveShadow
              geometry={nodes_result.Cube008.geometry}
              material={materials_results.Material}
              position={[0.018, 0.228, 0.431]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.795}
            />
            <mesh
              name="Cube009"
              castShadow
              receiveShadow
              geometry={nodes_result.Cube009.geometry}
              material={materials_results.Material}
              position={[-0.015, 0.274, 0.329]}
              rotation={[Math.PI, -1.502, Math.PI]}
              scale={0.49}
            />
            <mesh
              name="Cube010"
              castShadow
              receiveShadow
              geometry={nodes_result.Cube010.geometry}
              material={materials_results.Material}
              position={[-0.015, 0.274, 0.329]}
              scale={0.49}
            />
            <mesh
              name="Cube011"
              castShadow
              receiveShadow
              geometry={nodes_result.Cube011.geometry}
              material={materials_results.Material}
              position={[0.28, 0.274, 0.329]}
              rotation={[Math.PI, -1.502, Math.PI]}
              scale={0.49}
            />
            <mesh
              name="Cube012"
              castShadow
              receiveShadow
              geometry={nodes_result.Cube012.geometry}
              material={materials_results.Material}
              position={[0.28, 0.274, 0.329]}
              scale={0.49}
            />
            <mesh
              name="Plane002"
              castShadow
              receiveShadow
              geometry={nodes_result.Plane002.geometry}
              material={materials_results.Material}
              position={[3.018, 0.015, 0.102]}
              scale={[5.927, 3.244, 6.06]}
            />
          </group>
        )}
      </group>
    </Suspense>
  );
}

useGLTF.preload("http://localhost/models/house_animated.glb");
export default Model3DViewer;
