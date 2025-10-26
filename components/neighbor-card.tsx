"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useFavoritesStore } from "@/lib/favorites-store"

interface NeighborCardProps {
  neighbor: {
    id: string
    name: string
    avatar: string
    description: string
    status: "online" | "offline"
  }
}

export default function NeighborCard({ neighbor }: NeighborCardProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore()
  const isCurrentlyFavorite = isFavorite(neighbor.id)

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isCurrentlyFavorite) {
      removeFavorite(neighbor.id)
    } else {
      addFavorite(neighbor)
    }
  }

  return (
    <Link href={`/neighbor/${neighbor.id}`} className="block">
      <div className="bg-card rounded-2xl p-4 flex items-center gap-4 relative hover:bg-card/80 transition-colors cursor-pointer">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <Image
            src={neighbor.avatar || "/placeholder.svg"}
            alt={neighbor.name}
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
        </div>

        {/* Name and Description */}
        <div className="flex-1 min-w-0">
          <div className="bg-secondary rounded-full px-4 py-1 w-fit mb-2">
            <span className="text-sm font-medium text-secondary-foreground">{neighbor.name}</span>
          </div>
          <p className="text-sm text-card-foreground">{neighbor.description}</p>
        </div>

        {/* Status Indicator */}
        <div className="absolute top-4 right-4">
          <div
            className={cn(
              "w-3 h-3 rounded-full",
              neighbor.status === "online" ? "bg-[hsl(var(--status-online))]" : "bg-[hsl(var(--status-offline))]",
            )}
          />
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleFavorite}
          className="absolute top-4 right-12 hover:bg-transparent"
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors",
              isCurrentlyFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground",
            )}
          />
        </Button>
      </div>
    </Link>
  )
}
