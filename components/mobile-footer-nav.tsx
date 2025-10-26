"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Heart, Users, Calendar } from "lucide-react"

export default function MobileFooterNav() {
  const pathname = usePathname()
  const [isScrollingUp, setIsScrollingUp] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 10) {
        setIsScrollingUp(true)
      } else {
        setIsScrollingUp(currentScrollY < lastScrollY)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const navItems = [
    {
      icon: Home,
      label: "홈",
      href: "/",
      active: pathname === "/",
    },
    {
      icon: () => (
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      label: "방앗간",
      href: "/mill",
      active: pathname === "/mill" || pathname === "/shop",
    },
    {
      icon: Users,
      label: "이웃",
      href: "/neighbor",
      active: pathname === "/neighbor",
    },
    {
      icon: Heart,
      label: "소셜",
      href: "/social",
      active: pathname === "/social",
    },
    {
      icon: Calendar,
      label: "캘린더",
      href: "/calendar",
      active: pathname === "/calendar",
    },
  ]

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t border-border transition-transform duration-300 bg-background",
        !isScrollingUp && "translate-y-full",
      )}
    >
      <div className="flex items-center justify-around h-16 max-w-2xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center w-full h-full bg-popover"
            >
              <div className="relative">
                <Icon className={cn("h-6 w-6", item.active ? "text-black" : "text-black/60")} />
              </div>
              <span className={cn("text-xs mt-1", item.active ? "text-black font-medium" : "text-black/60")}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
