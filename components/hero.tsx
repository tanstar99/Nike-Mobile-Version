"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Shoe3DModel from "@/components/Shoe3DModel"

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline()

    // Initial animation
    tl.fromTo(".hero-title", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
      .fromTo(".hero-subtitle", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .fromTo(
        ".hero-description",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6",
      )
      .fromTo(".hero-button", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .fromTo(
        ".hero-image",
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=1",
      )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-black flex flex-col lg:flex-row items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black z-10" />

      <div ref={imageRef} className="absolute inset-0 hero-parallax">
        <div className="hero-image absolute inset-0 opacity-0">
          <Image
            src="/nikeback.jpg"
            alt="Nike Hero"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-red-600 mix-blend-multiply opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between w-full h-full">
        {/* Text Section */}
        <div className="w-full lg:w-1/3 text-center lg:text-left flex flex-col justify-center">
          <h2 className="text-sm md:text-base font-medium mb-2 text-red-500 tracking-widest">
            BREAK BOUNDARIES
          </h2>
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-white">
            <div>JUST</div>
            <div className="text-9xl"><span className="text-red-600">DO</span> IT</div>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-md mx-auto lg:mx-0">
            Push your limits with the latest Nike innovations designed for peak performance and unmatched style.
          </p>
          <Button size="lg" className="group bg-red-600 hover:bg-red-700 text-white mx-auto lg:mx-0">
            Explore Collection
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* 3D Shoe Model Section */}
        <div className="w-full lg:w-2/3 flex justify-center items-center mt-10 lg:mt-0">
          <Shoe3DModel />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full animate-bounce mt-2"></div>
        </div>
      </div>
    </section>
  )
}
