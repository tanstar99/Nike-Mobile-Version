"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const timelineData = [
    {
      year: "1964",
      title: "Blue Ribbon Sports",
      description: "Phil Knight and Bill Bowerman founded Blue Ribbon Sports, which would later become Nike, Inc.",
      image: "/brs.png?height=400&width=600",
    },
    {
      year: "1971",
      title: "The Swoosh",
      description: "The iconic Nike Swoosh logo was designed by Carolyn Davidson for just $35.",
      image: "/swoosh.png?height=400&width=600",
    },
    {
      year: "1978",
      title: "First Air Technology",
      description: "Nike introduced the first shoe with Air technology, the Nike Tailwind.",
      image: "/tailwind.jpg?height=400&width=600",
    },
    {
      year: "1985",
      title: "Air Jordan",
      description: "The first Air Jordan shoe was created for Michael Jordan, revolutionizing basketball footwear.",
      image: "/jordans.jpg?height=400&width=600",
    },
    {
      year: "1988",
      title: "Just Do It",
      description: "Nike launched the iconic 'Just Do It' slogan that would define the brand for decades.",
      image: "/justdoit.jpg?height=400&width=600",
    },
    {
      year: "2017",
      title: "Breaking2",
      description: "Nike's Breaking2 project aimed to break the 2-hour marathon barrier with innovative footwear.",
      image: "/breaking2.jpg?height=400&width=600",
    },
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo(
      ".timeline-title",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      },
    )

    if (timelineRef.current) {
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
          },
        },
      )

      gsap.utils.toArray(".timeline-item").forEach((item: any, i) => {
        const direction = i % 2 === 0 ? -1 : 1

        gsap.fromTo(
          item,
          {
            x: 50 * direction,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          },
        )
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="timeline-title text-4xl font-extrabold mb-4 text-white">The Nike Journey</h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            From humble beginnings to global icon, explore the key moments that shaped Nike's legendary history.
          </p>
        </div>

        <div ref={timelineRef} className="relative">
          <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-red-600 to-red-900 h-full origin-top"></div>

          <div className="relative z-10 space-y-20">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`timeline-item flex flex-col md:flex-row items-center gap-12 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="relative w-full max-w-md overflow-hidden rounded-2xl shadow-[0_0_20px_rgba(255,0,0,0.2)] transition-all duration-500 hover:scale-[1.05]">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-block bg-red-600 text-white text-lg font-bold px-4 py-1 rounded-lg shadow-lg">
                        {item.year}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="bg-gray-900 p-8 rounded-2xl max-w-lg text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-300 text-lg">{item.description}</p>
                  </div>
                </div>

                <div className="absolute left-1/2 top-[50%] transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-red-600 rounded-full border-4 border-black shadow-md"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg shadow-lg">
            Explore Our Full History
          </Button>
        </div>
      </div>
    </section>
  )
}
