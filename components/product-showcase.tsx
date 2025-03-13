"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Model({ modelPath }) {
  const gltf = useGLTF(modelPath);
  return <primitive object={gltf.scene} scale={2} />;
}

export default function ProductShowcase() {
  const [activeColor, setActiveColor] = useState(0);
  const [rotationDegree, setRotationDegree] = useState(0);
  const showcaseRef = useRef(null);
  const productRef = useRef(null);

  const colors = [
    { name: "Blue", hex: "#4287f5", model: "/blue_shoe.glb" },
    { name: "Black and white", hex: "#FFFFFF", model: "/bw_shoe.glb" },
    { name: "Green", hex: "#3dcc21", model: "/green_shoe.glb" },
    { name: "White and Pink", hex: "#f291d7", model: "/pink_shoe.glb" },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Draggable);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: showcaseRef.current,
        start: "top 80%",
      },
    });

    tl.fromTo(
      ".showcase-title",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        ".showcase-description",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        ".product-container",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        ".product-details",
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.8"
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleRotate = (direction) => {
    setRotationDegree((prev) => (direction === "left" ? prev - 90 : prev + 90));
  };

  return (
    <section ref={showcaseRef} className="py-16 md:py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="showcase-title text-2xl md:text-4xl font-bold text-white">Interactive Product View</h2>
          <p className="showcase-description text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Explore our flagship Nike Air Max in 360° detail. Click colors to change models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="product-container relative bg-gradient-to-b from-gray-900 to-black p-6 md:p-8 rounded-xl shadow-lg">
            <div className="h-[250px] sm:h-[300px] md:h-[400px] w-full">
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                  <group ref={productRef} rotation={[0, rotationDegree * (Math.PI / 180), 0]}>
                    <Model modelPath={colors[activeColor].model} />
                  </group>
                </Suspense>
                <OrbitControls enableZoom={false} />
              </Canvas>
            </div>

            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-3">
              <Button variant="outline" size="icon" className="rounded-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white" onClick={() => handleRotate("left")}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white" onClick={() => handleRotate("right")}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="product-details space-y-6 md:space-y-8">
            <h3 className="text-xl md:text-2xl font-bold text-white">Nike Air Max 270</h3>
            <p className="text-lg text-red-500">$150.00</p>
            <p className="text-gray-400 text-sm md:text-base">
              The Nike Air Max 270 delivers visible cushioning under the foot and sophisticated design lines that nod to the iconic Air Max shoes of the past.
            </p>

            <div>
              <h4 className="text-white text-sm md:text-base font-medium">Select Color: {colors[activeColor].name}</h4>
              <div className="flex space-x-3 mt-2">
                {colors.map((color, index) => (
                  <button key={index} className={`w-6 h-6 md:w-8 md:h-8 rounded-full transition-transform ${activeColor === index ? "ring-2 ring-red-500 scale-110" : ""}`} style={{ backgroundColor: color.hex }} onClick={() => setActiveColor(index)} />
                ))}
              </div>
            </div>

            <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white">Add to Cart</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
