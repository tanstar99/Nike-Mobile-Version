"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Facebook, Instagram, Twitter, Youtube, MapPin } from "lucide-react"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
      },
    })

    tl.fromTo(
      ".footer-column",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      },
    ).fromTo(
      ".footer-bottom",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4",
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <footer ref={footerRef} className="bg-black text-white pt-16 pb-8 border-t border-red-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="footer-column">
            <h3 className="font-bold text-lg mb-4 text-red-500">PRODUCTS</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Shoes
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  New Releases
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="font-bold text-lg mb-4 text-red-500">SPORTS</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Running
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Basketball
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Soccer
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Training
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Tennis
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="font-bold text-lg mb-4 text-red-500">SUPPORT</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Help
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Order Status
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="font-bold text-lg mb-4 text-red-500">ABOUT NIKE</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Investors
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Sustainability
                </Link>
              </li>
            </ul>

            <div className="mt-6">
              <h3 className="font-bold text-lg mb-4 text-red-500">FIND A STORE</h3>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-red-500" />
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Store Locator
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom flex flex-col md:flex-row justify-between items-center pt-8 border-t border-red-900">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
              <Facebook className="w-6 h-6" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
              <Twitter className="w-6 h-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
              <Instagram className="w-6 h-6" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
              <Youtube className="w-6 h-6" />
              <span className="sr-only">YouTube</span>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
            <Link href="#" className="hover:text-red-500 transition-colors">
              Terms of Sale
            </Link>
            <Link href="#" className="hover:text-red-500 transition-colors">
              Terms of Use
            </Link>
            <Link href="#" className="hover:text-red-500 transition-colors">
              Privacy Policy
            </Link>
            <p>&copy; {new Date().getFullYear()} Nike, Inc. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

