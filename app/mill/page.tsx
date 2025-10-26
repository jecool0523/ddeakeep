"use client"

import { useState, useEffect } from "react"
import MobileFooterNav from "@/components/mobile-footer-nav"
import { Search, User, Store, Handshake, Car, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { motion } from "framer-motion"

export default function MillPage() {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-warm-bg pb-20"
    >
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between bg-warm-bg border-b border-warm-border px-4 py-3">
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-warm-brown">떡왓</h1>
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
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-warm-brown">
                  로그인
                </Button>
              </Link>
            )}
          </>
        )}
      </header>

      {/* Search Bar */}
      <div className="px-4 pt-4 pb-2">
        <div className="relative">
          <input
            type="text"
            placeholder="검색..."
            className="w-full h-12 rounded-full bg-warm-cream border border-warm-border px-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-warm-accent"
          />
          <Search className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pt-6">
        {/* Title with Icon */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-warm-brown rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-warm-cream"
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
          </div>
          <h2 className="text-2xl font-bold text-warm-brown">방앗간</h2>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-warm-cream rounded-2xl p-4 flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-warm-brown rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-warm-cream" viewBox="0 0 24 24" fill="currentColor">
                <rect x="4" y="4" width="16" height="16" rx="2" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-warm-brown/60 mb-0.5">보유</p>
              <p className="text-lg font-bold text-warm-brown">1000떡</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-warm-cream rounded-2xl p-4 flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-warm-brown rounded-xl flex items-center justify-center flex-shrink-0">
              <Handshake className="w-6 h-6 text-warm-cream" />
            </div>
            <div>
              <p className="text-xs text-warm-brown/60 mb-0.5">공동 구매 건수</p>
              <p className="text-lg font-bold text-warm-brown">3건</p>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/shop">
              <div className="bg-warm-cream rounded-3xl p-8 flex flex-col items-center justify-center gap-4 hover:bg-warm-cream/80 transition-colors aspect-square">
                <div className="w-16 h-16 bg-warm-brown rounded-2xl flex items-center justify-center">
                  <Store className="w-9 h-9 text-warm-cream" />
                </div>
                <p className="text-lg font-bold text-warm-brown">떡 마켓</p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/group-purchase">
              <div className="bg-warm-cream rounded-3xl p-8 flex flex-col items-center justify-center gap-4 hover:bg-warm-cream/80 transition-colors aspect-square">
                <div className="w-16 h-16 bg-warm-brown rounded-2xl flex items-center justify-center">
                  <Handshake className="w-9 h-9 text-warm-cream" />
                </div>
                <p className="text-lg font-bold text-warm-brown">공동 구매</p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/transportation">
              <div className="bg-warm-cream rounded-3xl p-8 flex flex-col items-center justify-center gap-4 hover:bg-warm-cream/80 transition-colors aspect-square">
                <div className="w-16 h-16 bg-warm-brown rounded-2xl flex items-center justify-center">
                  <Car className="w-9 h-9 text-warm-cream" />
                </div>
                <p className="text-lg font-bold text-warm-brown">이동</p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/moving">
              <div className="bg-warm-cream rounded-3xl p-8 flex flex-col items-center justify-center gap-4 hover:bg-warm-cream/80 transition-colors aspect-square">
                <div className="w-16 h-16 bg-warm-brown rounded-2xl flex items-center justify-center">
                  <Package className="w-9 h-9 text-warm-cream" />
                </div>
                <p className="text-lg font-bold text-warm-brown">이사</p>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>

      <MobileFooterNav />
    </motion.div>
  )
}
