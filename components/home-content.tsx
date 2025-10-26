"use client"
import { useState, useEffect } from "react"
import { Search, User, Pencil, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export default function HomeContent() {
  const [isEditingName, setIsEditingName] = useState(false)
  const [name, setName] = useState("시리떡")
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
    <div className="h-screen flex flex-col pb-20 overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 flex items-center justify-between bg-warm-bg border-b border-warm-border px-4 py-3">
        <Link href="/" className="flex items-center">
          <Image src="/images/design-mode/ddeakeep.png" alt="떡 잎" width={60} height={30} className="object-contain" />
        </Link>

        {!loading && (
          <>
            {user ? (
              <Link href="/profile">
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-warm-brown">
                  <User className="h-5 w-5" />
                  <span>{user.email?.split("@")[0] || "user"}님</span>
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-warm-brown">
                    로그인
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-lime-600 hover:bg-lime-700 text-white">
                    회원가입
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </header>

      {/* Search Bar */}
      <div className="flex-shrink-0 px-4 pt-4 pb-2">
        <div className="relative">
          <input
            type="text"
            placeholder="검색..."
            className="w-full h-12 rounded-full bg-white border border-warm-border px-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-warm-accent"
          />
          <Search className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="flex-1 px-4 pt-2 pb-4 flex flex-col justify-center min-h-0">
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-48 h-48 mb-4">
            <Image
              src="/images/design-mode/LOGO.png"
              alt="떡 로고"
              width={192}
              height={192}
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        <div className="bg-warm-cream rounded-3xl p-5 space-y-4">
          {/* Editable Name */}
          <div className="flex items-center gap-2">
            {isEditingName ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setIsEditingName(false)}
                className="text-2xl font-bold text-warm-brown bg-transparent border-b-2 border-warm-brown focus:outline-none flex-1"
                autoFocus
              />
            ) : (
              <>
                <h2 className="text-2xl font-bold text-warm-brown flex-1">{name}</h2>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="p-2 hover:bg-warm-bg rounded-full transition-colors"
                >
                  <Pencil className="h-5 w-5 text-warm-brown" />
                </button>
              </>
            )}
          </div>

          {/* Level Progress */}
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-warm-brown">Lv.2</span>
            <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-warm-brown rounded-full" style={{ width: "65%" }} />
            </div>
          </div>

          {/* Shortcut Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Link href="/neighbor" className="block">
              <div className="bg-white rounded-2xl p-4 space-y-3 hover:shadow-md transition-shadow">
                <h3 className="text-base font-bold text-warm-brown">떡 만들러 가기</h3>
                <Button className="w-full bg-warm-brown hover:bg-warm-brown/90 text-white rounded-full flex items-center justify-center gap-2">
                  바로가기
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Link>

            <Link href="/mill" className="block">
              <div className="bg-white rounded-2xl p-4 space-y-3 hover:shadow-md transition-shadow">
                <h3 className="text-base font-bold text-warm-brown">팔 시러 가기</h3>
                <Button className="w-full bg-warm-brown hover:bg-warm-brown/90 text-white rounded-full flex items-center justify-center gap-2">
                  바로가기
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Link>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center pt-2">
            <div className="w-32 h-2 bg-warm-brown rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
