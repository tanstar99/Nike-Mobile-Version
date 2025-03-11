"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"

export default function Innovation() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Parallax background effect
    gsap.to(".innovation-bg", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })

    // Title reveal animation without SplitText
    gsap.fromTo(
      ".title-word",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      },
    )

    // Cards animation
    if (cardsRef.current) {
      gsap.fromTo(
        ".innovation-card",
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
        },
      )
    }

    // Hover animations for cards
    gsap.utils.toArray(".innovation-card").forEach((card: any) => {
      const cardBg = card.querySelector(".card-bg")
      const cardContent = card.querySelector(".card-content")

      const tl = gsap.timeline({ paused: true })

      tl.to(cardBg, {
        scale: 1.1,
        duration: 0.5,
        ease: "power2.out",
      }).to(
        cardContent,
        {
          y: -10,
          duration: 0.4,
          ease: "power2.out",
        },
        0,
      )

      card.addEventListener("mouseenter", () => tl.play())
      card.addEventListener("mouseleave", () => tl.reverse())
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-black text-white">
      <div className="innovation-bg absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Innovation background"
          fill
          className="object-cover object-center opacity-30"
        />
        {/* Red overlay with blend mode */}
        <div className="absolute inset-0 bg-red-900 mix-blend-multiply opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-sm font-medium uppercase tracking-wider mb-3 text-red-500">Nike Innovation</h2>
          <h3 ref={titleRef} className="text-4xl md:text-6xl font-bold mb-6">
            <span className="title-word inline-block">REVOLUTIONIZING</span>{" "}
            <span className="title-word inline-block">PERFORMANCE</span>
          </h3>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Our relentless drive to create the best products for athletes has led to groundbreaking technologies that
            continue to push the boundaries of what's possible.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="innovation-card relative bg-black/40 backdrop-blur-sm p-6 rounded-xl overflow-hidden group cursor-pointer">
            <div className="card-bg absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 to-black/80"></div>
            </div>
            <div className="card-content relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.5 13.75C9.5 14.72 10.25 15.5 11.17 15.5H13.05C13.85 15.5 14.5 14.82 14.5 13.97C14.5 13.06 14.1 12.73 13.51 12.52L10.5 11.47C9.91 11.26 9.51001 10.94 9.51001 10.02C9.51001 9.18 10.16 8.49001 10.96 8.49001H12.84C13.76 8.49001 14.51 9.27001 14.51 10.24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 7.5V16.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 3V7H21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 2L17 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2 text-center text-white">Nike ZoomX</h4>
              <p className="text-gray-300 text-center">
                Our lightest, most responsive foam ever, delivering incredible energy return with every step.
              </p>

              <div className="mt-6 pt-4 border-t border-red-900/30">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Weight</span>
                  <span className="text-white">Ultra Light</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1 mb-3">
                  <div className="bg-red-600 h-1.5 rounded-full" style={{ width: "90%" }}></div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Energy Return</span>
                  <span className="text-white">Maximum</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                  <div className="bg-red-600 h-1.5 rounded-full" style={{ width: "95%" }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="innovation-card relative bg-black/40 backdrop-blur-sm p-6 rounded-xl overflow-hidden group cursor-pointer">
            <div className="card-bg absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 to-black/80"></div>
            </div>
            <div className="card-content relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.9965 11H16.0054"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.9955 11H12.0045"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.99451 11H8.00349"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2 text-center text-white">Flyknit</h4>
              <p className="text-gray-300 text-center">
                Precision-engineered yarn creates a lightweight, form-fitting, and virtually seamless upper.
              </p>

              <div className="mt-6 pt-4 border-t border-red-900/30">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Breathability</span>
                  <span className="text-white">High</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1 mb-3">
                  <div className="bg-red-600 h-1.5 rounded-full" style={{ width: "85%" }}></div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Flexibility</span>
                  <span className="text-white">Maximum</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                  <div className="bg-red-600 h-1.5 rounded-full" style={{ width: "95%" }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="innovation-card relative bg-black/40 backdrop-blur-sm p-6 rounded-xl overflow-hidden group cursor-pointer">
            <div className="card-bg absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 to-black/80"></div>
            </div>
            <div className="card-content relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 18V15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.07 2.82L3.14 8.37C2.36 8.99 1.86 10.3 2.03 11.28L3.36 19.24C3.6 20.66 4.96 21.81 6.4 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.99 20.86 8.37L13.93 2.83C12.86 1.97 11.13 1.97 10.07 2.82Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2 text-center text-white">Nike Air</h4>
              <p className="text-gray-300 text-center">
                Pressurized air inside a tough, flexible membrane provides lightweight cushioning.
              </p>

              <div className="mt-6 pt-4 border-t border-red-900/30">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Cushioning</span>
                  <span className="text-white">Maximum</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1 mb-3">
                  <div className="bg-red-600 h-1.5 rounded-full" style={{ width: "95%" }}></div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Durability</span>
                  <span className="text-white">High</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                  <div className="bg-red-600 h-1.5 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
            Explore Nike Innovation
          </Button>
        </div>
      </div>
    </section>
  )
}

