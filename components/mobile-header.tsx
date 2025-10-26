"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import LanguageSwitcher from "@/components/language-switcher"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

export default function MobileHeader() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

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

  const handleLogout = async () => {
    const supabase = getSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-40 flex md:hidden items-center justify-between bg-background border-b border-border px-4 py-2 shadow-sm">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/images/LOGO.png" alt="Logo" width={32} height={32} className="h-8 w-auto" />
        <Image src="/images/ddeakeep.png" alt="떡 잎" width={60} height={24} className="h-6 w-auto" />
      </Link>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        {!loading && user && (
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">프로필</span>
            </Button>
          </Link>
        )}

        {!loading && !user && (
          <>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-sm">
                로그인
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-lime-600 hover:bg-lime-700 text-white text-sm">
                회원가입
              </Button>
            </Link>
          </>
        )}

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">메뉴 열기</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85%] sm:w-[350px] pt-10 border-l-border">
            <SheetHeader className="text-left mb-6">
              <SheetTitle className="flex items-center gap-2">
                <Image src="/images/LOGO.png" alt="Logo" width={32} height={32} className="h-8 w-auto" />
                <Image src="/images/ddeakeep.png" alt="떡 잎" width={80} height={32} className="h-8 w-auto" />
              </SheetTitle>
            </SheetHeader>

            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">설정</h3>
                <div className="space-y-1">
                  <LanguageSwitcher />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium">더보기</h3>
                <div className="space-y-1">
                  <Link href="/schemes" className="block text-sm py-2 text-lime-600 hover:text-lime-700">
                    정부 지원 제도
                  </Link>
                  <Link href="/jobs" className="block text-sm py-2 text-lime-600 hover:text-lime-700">
                    일자리 & 기회
                  </Link>
                  <Link href="/events" className="block text-sm py-2 text-lime-600 hover:text-lime-700">
                    이벤트
                  </Link>
                  <Link href="/community" className="block text-sm py-2 text-lime-600 hover:text-lime-700">
                    커뮤니티
                  </Link>
                  <Link href="/help" className="block text-sm py-2 text-lime-600 hover:text-lime-700">
                    도움말 & 지원
                  </Link>
                </div>
              </div>

              {user && (
                <div className="pt-4 border-t border-border space-y-2">
                  <Link href="/settings" className="block text-sm py-2 text-lime-600 hover:text-lime-700">
                    계정 설정
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm py-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    로그아웃
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
