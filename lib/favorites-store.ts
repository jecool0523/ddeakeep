"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Neighbor {
  id: string
  name: string
  avatar: string
  description: string
  status: "online" | "offline"
}

interface FavoritesStore {
  favorites: Neighbor[]
  addFavorite: (neighbor: Neighbor) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (neighbor) => {
        set((state) => ({
          favorites: [...state.favorites, neighbor],
        }))
      },
      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((n) => n.id !== id),
        }))
      },
      isFavorite: (id) => {
        return get().favorites.some((n) => n.id === id)
      },
    }),
    {
      name: "favorites-storage",
    },
  ),
)
