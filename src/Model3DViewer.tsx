import { Canvas } from "@react-three/fiber";
import Sun from "./Sun";
import ModelGlb from "./ModelGlbControllable";
import "./Model3DViewer.css";

function Model3DViewer() {
  return (
    <div
      style={{
        width: "90vw",
        height: "90vh",
        textAlign: "left",
        position: "absolute",
        left: "0px",
      }}
    >
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <ModelGlb position={[0, 0, 0]} scale={[0.25, 0.25, 0.25]} />
        <Sun position={[0, 2, 0]} />
      </Canvas>
    </div>
  );
}

export default Model3DViewer;
