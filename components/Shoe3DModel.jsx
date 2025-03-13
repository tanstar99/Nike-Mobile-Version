"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";

export default function Shoe3DModel() {
  const { scene } = useGLTF("/shoe_model.glb"); // Ensure this model exists in your public folder
  const [scale, setScale] = useState([1.7, 1.7, 1.7]); // Default scale for desktop

  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth < 1024) {
        setScale([1, 1, 1]); // Smaller scale on mobile
      } else {
        setScale([3, 3, 3]); // Larger scale on desktop
      }
    };

    updateScale(); // Set initial scale
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="w-full h-full md:h-[400px] lg:h-[600px] flex items-center justify-center">
      <Canvas camera={{ position: [0, 1, 4] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <Suspense fallback={null}>
          <primitive object={scene} scale={scale} position={[0, 0, 0]} />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
}
