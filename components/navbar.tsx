"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Search, ShoppingBag, User } from "lucide-react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navRef = useRef(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true })

    tl.current.fromTo(
      ".nav-item",
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      },
    )

    tl.current.play()

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      ref={navRef}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-xl shadow-[0_0_15px_rgba(255,0,0,0.3)]" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center nav-item">
         <img
      
          src="/nikeLogo.png"
          alt="Nike Logo"
          id="main-logo"
           className="w-14 h-14 object-contain bg-transparent transition-transform duration-300 hover:scale-110 filter "
           />   
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#" className="text-sm font-medium text-white hover:text-red-500 transition-colors nav-item">
              New Releases
            </Link>
            <Link href="#" className="text-sm font-medium text-white hover:text-red-500 transition-colors nav-item">
              Men
            </Link>
            <Link href="#" className="text-sm font-medium text-white hover:text-red-500 transition-colors nav-item">
              Women
            </Link>
            <Link href="#" className="text-sm font-medium text-white hover:text-red-500 transition-colors nav-item">
              Kids
            </Link>
            <Link href="#" className="text-sm font-medium text-white hover:text-red-500 transition-colors nav-item">
              Collections
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex text-white hover:text-red-500 nav-item">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex text-white hover:text-red-500 nav-item">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-red-500 nav-item">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:text-red-500 nav-item"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
