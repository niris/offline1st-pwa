import { useEffect, useRef, useState } from "react";
import { GLTF } from "three-stdlib";
import { OrbitControls, Loader } from "@react-three/drei";
import { Suspense } from "react";
import { GLTFLoader } from "three-stdlib";
import { AnimationMixer, Group, LoopRepeat } from "three";

export function ModelGlbAutoplay(props: JSX.IntrinsicElements["group"]) {
  const [model, setModel] = useState<GLTF | null>(null);
  const group = useRef<Group>(null);
  const mixer = useRef<AnimationMixer | null>(null);

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
      mixer.current = new AnimationMixer(model.scene);
      console.log("model", model);
      model.animations.forEach((clip) => {
        console.log("animation", clip.name);
        const action = mixer.current!.clipAction(clip);
        action.loop = LoopRepeat; // Set the loop mode to LoopRepeat for continuous looping
        action.play();
      });
    }
  }, [model]);

  useEffect(() => {
    const animate = () => {
      if (mixer.current) {
        mixer.current.update(0.001); // Update the mixer with the time delta (in seconds)
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      {model && (
        <group ref={group} {...props}>
          {model && <primitive object={model.scene} />}
        </group>
      )}
      <OrbitControls makeDefault />
    </Suspense>
  );
}

export default ModelGlbAutoplay;
