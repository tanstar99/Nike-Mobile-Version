"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setHidden(false)
    }

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    const handleMouseEnter = () => setHidden(false)
    const handleMouseLeave = () => setHidden(true)

    const handleLinkHoverStart = () => setLinkHovered(true)
    const handleLinkHoverEnd = () => setLinkHovered(false)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseenter", handleMouseEnter)
    window.addEventListener("mouseleave", handleMouseLeave)

    const links = document.querySelectorAll("a, button")
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHoverStart)
      link.addEventListener("mouseleave", handleLinkHoverEnd)
    })

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("mouseleave", handleMouseLeave)

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHoverStart)
        link.removeEventListener("mouseleave", handleLinkHoverEnd)
      })
    }
  }, [])

  useEffect(() => {
    gsap.to(".cursor", {
      duration: 0.15,
      x: position.x,
      y: position.y,
      ease: "power3.out",
    })

    gsap.to(".cursor-follower", {
      duration: 0.5,
      x: position.x,
      y: position.y,
      ease: "power3.out",
    })
  }, [position])

  return (
    <>
      <div
        className={`cursor fixed top-0 left-0 w-4 h-4 bg-red-600 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference ${
          hidden ? "opacity-0" : "opacity-100"
        } ${clicked ? "scale-75" : "scale-100"} ${
          linkHovered ? "scale-150" : "scale-100"
        } transition-opacity duration-300`}
      ></div>
      <div
        className={`cursor-follower fixed top-0 left-0 w-8 h-8 border border-red-600 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 ${
          hidden ? "opacity-0" : "opacity-100"
        } ${clicked ? "scale-75" : "scale-100"} ${
          linkHovered ? "scale-150" : "scale-100"
        } transition-opacity duration-300`}
      ></div>
    </>
  )
}

