"use client"

import MobileFooterNav from "@/components/mobile-footer-nav"
import NeighborCard from "@/components/neighbor-card"
import { useFavoritesStore } from "@/lib/favorites-store"
import { Heart } from "lucide-react"

export default function FavoritesPage() {
  const { favorites } = useFavoritesStore()

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center justify-center max-w-2xl mx-auto">
          <h1 className="text-xl font-bold text-foreground">페이버릿</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <Heart className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">페이버릿</h2>
            <p className="text-muted-foreground">즐겨찾는 이웃이 여기에 표시됩니다</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-foreground">즐겨찾기 {favorites.length}</span>
            </div>
            <div className="space-y-3">
              {favorites.map((neighbor) => (
                <NeighborCard key={neighbor.id} neighbor={neighbor} />
              ))}
            </div>
          </div>
        )}
      </main>
      <MobileFooterNav />
    </div>
  )
}
