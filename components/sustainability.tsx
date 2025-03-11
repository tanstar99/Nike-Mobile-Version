"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Leaf, Recycle, Wind } from "lucide-react"

export default function Sustainability() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1])
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])
  const contentY = useTransform(scrollYProgress, [0.1, 0.3], [50, 0])

  return (
    <section ref={containerRef} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div style={{ scale: imageScale }} className="h-full w-full">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Sustainability"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div style={{ opacity: contentOpacity, y: contentY }} className="text-white">
            <h2 className="text-sm font-medium uppercase tracking-wider mb-3">Move to Zero</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">SUSTAINABLE BY DESIGN</h3>
            <p className="text-lg text-gray-200 mb-8 max-w-xl">
              Nike's journey toward zero carbon and zero waste has a singular aim: helping protect the future of sport.
              We're working toward a future where our business, planet, and people can thrive together.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                  <Leaf className="w-6 h-6 text-green-400" />
                </div>
                <h4 className="font-medium mb-1">Sustainable Materials</h4>
                <p className="text-sm text-gray-300">
                  Using recycled materials in our products to reduce environmental impact.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                  <Recycle className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="font-medium mb-1">Circular Economy</h4>
                <p className="text-sm text-gray-300">Designing products for longevity and end-of-life recycling.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                  <Wind className="w-6 h-6 text-yellow-400" />
                </div>
                <h4 className="font-medium mb-1">Renewable Energy</h4>
                <p className="text-sm text-gray-300">Powering our facilities with clean, renewable energy sources.</p>
              </div>
            </div>

            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              Learn About Our Commitment
            </Button>
          </motion.div>

          <div className="hidden md:block">{/* This space intentionally left empty for layout purposes */}</div>
        </div>
      </div>
    </section>
  )
}

