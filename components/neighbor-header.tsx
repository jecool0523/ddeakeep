"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export default function NeighborHeader() {
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
    <header className="sticky top-0 z-50 bg-background border-b border-border px-4 py-3">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        <Link href="/" className="flex items-center">
          <Image src="/images/design-mode/ddeakeep.png" alt="떡 잎" width={60} height={30} className="object-contain" />
        </Link>

        {!loading && (
          <>
            {user ? (
              <Link href="/profile">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{user.email?.split("@")[0] || "user"}님</span>
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    로그인
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-lime-500 hover:bg-lime-600 text-white">
                    회원가입
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  )
}
