"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
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

  const mobileMenuTimeline = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    mobileMenuTimeline.current = gsap.timeline({ paused: true })

    mobileMenuTimeline.current
      .fromTo(".mobile-menu", { x: "100%" }, { x: "0%", duration: 0.5, ease: "power3.out" })
      .fromTo(
        ".mobile-nav-item",
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.4,
          ease: "power3.out",
        },
        "-=0.2",
      )
  }, [])

  useEffect(() => {
    if (mobileMenuTimeline.current) {
      if (isMobileMenuOpen) {
        mobileMenuTimeline.current.play()
      } else {
        mobileMenuTimeline.current.reverse()
      }
    }
  }, [isMobileMenuOpen])

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
          <Link href="#" className="flex items-center nav-item">
            <svg
              className="w-12 h-12 text-red-600 transition-transform hover:scale-110"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21.07 7.57L5.9 15.77C4.23 16.74 3.4 16.37 3.94 14.38L6.84 6.46C7.38 4.47 8.91 4.47 9.83 6.46L11.42 10.15L21.07 7.57Z" />
            </svg>
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

      {/* Mobile Menu */}
      <div className={`mobile-menu fixed inset-0 bg-black z-50 flex flex-col transform translate-x-full`}>
        <div className="flex justify-between items-center p-4 border-b border-red-900">
          <Link href="/" className="flex items-center">
            <svg className="w-12 h-12 text-red-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.07 7.57L5.9 15.77C4.23 16.74 3.4 16.37 3.94 14.38L6.84 6.46C7.38 4.47 8.91 4.47 9.83 6.46L11.42 10.15L21.07 7.57Z" />
            </svg>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-red-500"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <Link
            href="#"
            className="mobile-nav-item text-lg font-medium py-2 border-b border-red-900 text-white hover:text-red-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            New Releases
          </Link>
          <Link
            href="#"
            className="mobile-nav-item text-lg font-medium py-2 border-b border-red-900 text-white hover:text-red-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Men
          </Link>
          <Link
            href="#"
            className="mobile-nav-item text-lg font-medium py-2 border-b border-red-900 text-white hover:text-red-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Women
          </Link>
          <Link
            href="#"
            className="mobile-nav-item text-lg font-medium py-2 border-b border-red-900 text-white hover:text-red-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Kids
          </Link>
          <Link
            href="#"
            className="mobile-nav-item text-lg font-medium py-2 border-b border-red-900 text-white hover:text-red-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Collections
          </Link>
        </nav>
        <div className="mt-auto p-4 flex items-center justify-between border-t border-red-900">
          <Button variant="ghost" size="icon" className="text-white hover:text-red-500">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:text-red-500">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:text-red-500">
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

