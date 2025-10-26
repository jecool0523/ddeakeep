"use client"

import { useState, useEffect } from "react"
import MobileFooterNav from "@/components/mobile-footer-nav"
import { Search, User, ArrowLeft, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { motion } from "framer-motion"

interface Product {
  id: number
  name: string
  description: string
  regularPrice: number
  groupPrice: number
  currentParticipants: number
  maxParticipants: number
  timeLeft: string
  image: string
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "유기농 쌀 10kg",
    description: "100% 국내산 유기농 쌀",
    regularPrice: 45000,
    groupPrice: 35000,
    currentParticipants: 8,
    maxParticipants: 10,
    timeLeft: "2일 남음",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "제주 감귤 5kg",
    description: "달콤한 제주 감귤",
    regularPrice: 30000,
    groupPrice: 22000,
    currentParticipants: 15,
    maxParticipants: 20,
    timeLeft: "1일 남음",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "한우 정육 세트",
    description: "1등급 한우 모듬",
    regularPrice: 120000,
    groupPrice: 95000,
    currentParticipants: 5,
    maxParticipants: 10,
    timeLeft: "3일 남음",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "친환경 세제 세트",
    description: "가족 건강을 위한 친환경 세제",
    regularPrice: 35000,
    groupPrice: 25000,
    currentParticipants: 12,
    maxParticipants: 15,
    timeLeft: "5시간 남음",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "국산 김치 5kg",
    description: "전통 방식으로 담근 김치",
    regularPrice: 40000,
    groupPrice: 32000,
    currentParticipants: 18,
    maxParticipants: 20,
    timeLeft: "12시간 남음",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "생수 2L x 12병",
    description: "깨끗한 천연 생수",
    regularPrice: 15000,
    groupPrice: 11000,
    currentParticipants: 25,
    maxParticipants: 30,
    timeLeft: "6시간 남음",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function ShopPage() {
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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-warm-bg pb-20"
    >
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between bg-warm-bg border-b border-warm-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/mill">
            <Button variant="ghost" size="sm" className="p-0">
              <ArrowLeft className="h-6 w-6 text-warm-brown" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-warm-brown">떡 마켓</h1>
        </div>

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
            placeholder="상품 검색..."
            className="w-full h-12 rounded-full bg-white border border-warm-border px-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-warm-accent"
          />
          <Search className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Info Banner */}
      <div className="px-4 pt-4 pb-2">
        <div className="bg-warm-accent/10 border border-warm-accent/20 rounded-2xl p-4">
          <p className="text-sm text-warm-brown font-medium">🎉 이웃과 함께 구매하면 최대 30% 할인!</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 pt-4 pb-4">
        <div className="grid grid-cols-1 gap-4">
          {mockProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-warm-border"
            >
              <div className="flex gap-4 p-4">
                {/* Product Image */}
                <div className="w-24 h-24 flex-shrink-0 bg-warm-cream rounded-xl overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-warm-brown mb-1 truncate">{product.name}</h3>
                  <p className="text-xs text-warm-brown/60 mb-2 line-clamp-1">{product.description}</p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-xs text-warm-brown/40 line-through">
                      {product.regularPrice.toLocaleString()}원
                    </span>
                    <span className="text-lg font-bold text-warm-accent">{product.groupPrice.toLocaleString()}원</span>
                  </div>

                  {/* Progress and Time */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-warm-brown/60">
                        <Users className="h-3 w-3" />
                        <span>
                          {product.currentParticipants}/{product.maxParticipants}명
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-warm-accent">
                        <Clock className="h-3 w-3" />
                        <span>{product.timeLeft}</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-warm-cream rounded-full overflow-hidden">
                      <div
                        className="h-full bg-warm-accent rounded-full transition-all"
                        style={{
                          width: `${(product.currentParticipants / product.maxParticipants) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Join Button */}
              <div className="px-4 pb-4">
                <Button className="w-full bg-warm-brown hover:bg-warm-brown/90 text-white rounded-xl">
                  공동구매 참여하기
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <MobileFooterNav />
    </motion.div>
  )
}
