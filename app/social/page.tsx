"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import EmergencyAlert from "@/components/emergency-alert"
import SocialFeed from "@/components/social-feed"
import MobileFooterNav from "@/components/mobile-footer-nav"
import { Bell, User } from "lucide-react"
import Image from "next/image"
import LanguageSwitcher from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import MobileHeader from "@/components/mobile-header"
import MobileTabs from "@/components/mobile-tabs"
import Sidebar from "@/components/sidebar"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export default function SocialPage() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="min-h-screen bg-warm-bg pb-16 md:pb-0">
      {/* Desktop Header - Updated to show logged-in user */}
      <header className="sticky top-0 z-50 hidden md:flex items-center justify-between bg-background border-b border-warm-border px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/LOGO.png" alt="Logo" width={40} height={40} className="h-10 w-auto" />
            <Image src="/images/ddeakeep.png" alt="떡 잎" width={80} height={32} className="h-8 w-auto" />
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/notifications">
              <Button variant="ghost" size="icon" className="relative text-foreground">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
                  3
                </span>
              </Button>
            </Link>

            {!loading && (
              <>
                {user ? (
                  <Link href="/profile">
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 text-foreground">
                      <User className="h-5 w-5" />
                      <span>{user.email?.split("@")[0] || "user"}님</span>
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-input text-foreground hover:bg-secondary bg-transparent"
                    >
                      <Link href="/login">로그인</Link>
                    </Button>
                    <Button size="sm" className="bg-lime-500 hover:bg-lime-600 text-white">
                      <Link href="/signup">회원가입</Link>
                    </Button>
                  </>
                )}
              </>
            )}

            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <MobileHeader />

      <main className="container mx-auto px-3 md:px-4 py-4 max-w-4xl">
        {/* Emergency Alert */}
        <EmergencyAlert
          title="엘레베이터 점검 예정"
          message="11/3일 13:00~16:00경에 엘레베이터 점검이 예정되어있습니다.
          점검 시간동안 엘레베이터 사용이 불가하니 유의해주세요"
          authority="관리실"
          timestamp="2시간 전"
        />

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full mt-4">
          {/* Mobile Tabs - Only visible on mobile */}
          <MobileTabs />

          {/* Main Content - Social Feed */}
          <div className="flex-1 order-2 md:order-1 mt-4 md:mt-0">
            <SocialFeed />
          </div>

          {/* Desktop Sidebar - Only visible on desktop */}
          <div className="md:w-80 w-full order-1 md:order-2 hidden md:block">
            <div className="space-y-6 md:sticky md:top-20">
              <Sidebar />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Footer Navigation */}
      <MobileFooterNav />
    </div>
  )
}
