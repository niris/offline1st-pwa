import { useRef, useState } from "react";
import { useFrame, ThreeElements } from "@react-three/fiber";
import * as THREE from "three";

function Sun(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useFrame((_state, delta) => (ref.current.rotation.x += delta)); //R3F hook

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 0.5 : 0.25}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <sphereGeometry args={[1, 30, 30]} />
      <meshStandardMaterial color={hovered ? "red" : "orange"} />
    </mesh>
  );
}

export default Sun;
