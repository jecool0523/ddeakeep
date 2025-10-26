"use client"

import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export default function MobileNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
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

  const handleLogout = async () => {
    const supabase = getSupabaseBrowserClient()
    await supabase.auth.signOut()
    setOpen(false)
    router.push("/")
    router.refresh()
  }

  const routes = [
    {
      href: "/",
      label: "홈",
      active: pathname === "/",
    },
    {
      href: "/profile",
      label: "프로필",
      active: pathname === "/profile",
    },
    {
      href: "/notifications",
      label: "알림",
      active: pathname === "/notifications",
    },
    {
      href: "/messages",
      label: "메시지",
      active: pathname === "/messages",
    },
    {
      href: "/schemes",
      label: "정부 지원 제도",
      active: pathname === "/schemes",
    },
    {
      href: "/jobs",
      label: "일자리 & 기회",
      active: pathname === "/jobs",
    },
    {
      href: "/events",
      label: "이벤트",
      active: pathname === "/events",
    },
    {
      href: "/community",
      label: "커뮤니티",
      active: pathname === "/community",
    },
    {
      href: "/help",
      label: "도움말 & 지원",
      active: pathname === "/help",
    },
    {
      href: "/settings",
      label: "설정",
      active: pathname === "/settings",
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">메뉴 열기</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85%] sm:w-[350px] pt-10 border-l-border">
        <SheetHeader className="text-left mb-6">
          <SheetTitle className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-lime-500 flex items-center justify-center">
              <span className="text-white font-bold">떡</span>
            </div>
            <span className="text-xl font-bold text-lime-600">떡잎</span>
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block py-3 px-2 text-sm rounded-md",
                route.active
                  ? "bg-lime-100 text-lime-700 dark:bg-lime-900/50 dark:text-lime-400 font-medium"
                  : "text-foreground hover:bg-secondary",
              )}
            >
              {route.label}
            </Link>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-border space-y-2">
          {!loading && !user && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-lime-200 text-lime-700 dark:border-lime-800 dark:text-lime-400 hover:bg-lime-50 dark:hover:bg-lime-950 bg-transparent"
                onClick={() => {
                  setOpen(false)
                  router.push("/login")
                }}
              >
                로그인
              </Button>

              <Button
                size="sm"
                className="w-full bg-lime-500 hover:bg-lime-600 text-white"
                onClick={() => {
                  setOpen(false)
                  router.push("/signup")
                }}
              >
                회원가입
              </Button>
            </>
          )}

          {!loading && user && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              로그아웃
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
