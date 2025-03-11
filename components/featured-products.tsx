"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Plus, Heart } from "lucide-react"

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("Featured")
  const sectionRef = useRef<HTMLElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)

  const categories = ["Featured", "Running", "Basketball", "Lifestyle", "Training"]

  const products = [
    {
      id: 1,
      name: "Nike Air Max 270",
      category: "Lifestyle",
      price: 150,
      image: "/max270.png?height=600&width=600",
      colors: 5,
      isNew: true,
    },
    {
      id: 2,
      name: "Nike ZoomX Vaporfly",
      category: "Running",
      price: 250,
      image: "/zoomx.jpg?height=600&width=600",
      colors: 3,
      isNew: true,
    },
    {
      id: 3,
      name: "Nike Air Force 1",
      category: "Lifestyle",
      price: 100,
      image: "/force1.png?height=600&width=600",
      colors: 8,
      isNew: false,
    },
  ]

  const filteredProducts =
    activeCategory === "Featured" ? products : products.filter((product) => product.category === activeCategory)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    })

    tl.fromTo(".section-title", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
      .fromTo(
        ".section-description",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6",
      )
      .fromTo(
        ".category-button",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" },
        "-=0.6",
      )

    // Product cards animation
    if (productsRef.current) {
      gsap.fromTo(
        ".product-card",
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
            trigger: productsRef.current,
            start: "top 80%",
          },
        },
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  // Animation when changing categories
  useEffect(() => {
    if (productsRef.current) {
      gsap.fromTo(
        ".product-card",
        {
          scale: 0.9,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out",
        },
      )
    }
  }, [activeCategory])

  return (
    <section ref={sectionRef} className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="section-title text-3xl md:text-4xl font-bold mb-2 text-white">Featured Products</h2>
            <p className="section-description text-gray-400 max-w-2xl">
              Explore our collection of iconic Nike footwear designed for performance and style.
            </p>
          </div>

          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide">
          <div className="flex space-x-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={`category-button rounded-full ${
                  activeCategory === category
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products grid */}
        <div ref={productsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card group relative bg-gray-900 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(255,0,0,0.1)] hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] transition-all duration-500"
            >
              <div className="relative h-64 bg-gray-800 overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
                {product.isNew && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
                    New Release
                  </div>
                )}

                {/* Quick actions */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-red-600 hover:text-white"
                  >
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Add to Wishlist</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-red-600 hover:text-white"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Quick Add</span>
                  </Button>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-1 text-white">{product.name}</h3>
                <p className="text-red-500 mb-3">{product.category}</p>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-white">${product.price}</span>
                  <span className="text-sm text-gray-400">{product.colors} Colors</span>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm">
                <Button className="transform translate-y-4 group-hover:translate-y-0 transition-transform bg-red-600 hover:bg-red-700 text-white">
                  View Product
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}

