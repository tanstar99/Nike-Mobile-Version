"use client"

import { useEffect, useRef, useState, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Draggable } from "gsap/Draggable"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Component to Load GLB Models Dynamically
function Model({ modelPath }: { modelPath: string }) {
  const gltf = useGLTF(modelPath) // Load the selected model
  return <primitive object={gltf.scene} scale={2} />
}

export default function ProductShowcase() {
  const [activeColor, setActiveColor] = useState(0)
  const [rotationDegree, setRotationDegree] = useState(0)
  const showcaseRef = useRef<HTMLDivElement>(null)
  const productRef = useRef<any>(null)

  // Define color options and corresponding GLB models
  const colors = [
    { name: "Blue", hex: "#4287f5", model: "/blue_shoe.glb" },
    { name: "Black and white", hex: "#FFFFFF", model: "/bw_shoe.glb" },
    { name: "Green", hex: "#3dcc21", model: "/green_shoe.glb" },
    { name: "White and Pink", hex: "#f291d7", model: "/pink_shoe.glb" },
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Draggable)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: showcaseRef.current,
        start: "top 80%",
      },
    })

    tl.fromTo(".showcase-title", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
      .fromTo(".showcase-description", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .fromTo(".product-container", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.6")
      .fromTo(".product-details", { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.8")

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const handleRotate = (direction: "left" | "right") => {
    setRotationDegree((prev) => (direction === "left" ? prev - 90 : prev + 90))
  }

  return (
    <section ref={showcaseRef} className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="showcase-title text-3xl md:text-4xl font-bold mb-2 text-white">Interactive Product View</h2>
          <p className="showcase-description text-gray-400 max-w-2xl mx-auto">
            Explore our flagship Nike Air Max in 360° detail. Click colors to change models.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 3D Model Viewer */}
          <div className="product-container relative bg-gradient-to-b from-gray-900 to-black p-8 rounded-xl shadow-[0_0_30px_rgba(255,0,0,0.2)]">
            <div className="h-[300px] md:h-[400px] w-full">
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

            {/* Rotation Buttons */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                onClick={() => handleRotate("left")}
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Rotate Left</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                onClick={() => handleRotate("right")}
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Rotate Right</span>
              </Button>
            </div>

            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-sm">Drag to rotate</div>
          </div>

          {/* Product Details */}
          <div className="product-details space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Nike Air Max 270</h3>
              <p className="text-xl text-red-500 mb-4">$150.00</p>
              <p className="text-gray-400">
                The Nike Air Max 270 delivers visible cushioning under the foot and sophisticated design lines that nod to the iconic Air Max shoes of the past.
              </p>
            </div>

            {/* Color Selection (Switch Models) */}
            <div>
              <h4 className="text-white font-medium mb-3">Select Color: {colors[activeColor].name}</h4>
              <div className="flex space-x-3">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-full transition-transform ${
                      activeColor === index ? "ring-2 ring-red-500 ring-offset-2 ring-offset-gray-900 scale-110" : ""
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setActiveColor(index)}
                    aria-label={`Select ${color.name} color`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h4 className="text-white font-medium mb-3">Select Size</h4>
              <div className="grid grid-cols-5 gap-2">
                {["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"].map((size) => (
                  <button key={size} className="h-10 border border-gray-700 rounded-md text-white hover:border-red-500 hover:bg-red-500/10 transition-colors">
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
