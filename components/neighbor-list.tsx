"use client"

import { Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import NeighborCard from "@/components/neighbor-card"

// Mock neighbor data
const neighbors = [
  {
    id: "1",
    name: "권재헌",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qXo1Y1b0lcSZDBgj5W680zlaEDlQ2G.png",
    description: "스파크 팀장 권재헌입니다",
    status: "offline" as const,
  },
  {
    id: "2",
    name: "나기찬",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-eF6w1chIjHmpYzMiKT6uwejDWValUU.jpeg",
    description: "스파크 기획 나기찬입니다",
    status: "online" as const,
  },
  {
    id: "3",
    name: "박근우",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-e8QyesLG6DnNG0vhyphZw7Sj8XHvFp.png",
    description: "스파크 개발 박근우입니다",
    status: "online" as const,
  },
  {
    id: "4",
    name: "이규원",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WRaYPsJjrRicFhrmj9bHYb1ZEg7Txg.png",
    description: "스파크 발표 이규원입니다",
    status: "offline" as const,
  },
  {
    id: "5",
    name: "DC즈",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oVu3beycnMexY7mZfhGe2WSH9VJG3p.png",
    description: "디자인은 디컨",
    status: "online" as const,
  },
  {
    id: "6",
    name: "김민수",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EV11iawQpEJ8fmXrbs64PGEeaq3LHu.png",
    description: "스파크 백엔드 개발자입니다",
    status: "online" as const,
  },
  {
    id: "7",
    name: "이서연",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iwoLY8efESIdaNveWWWOCwVs6AcCWF.png",
    description: "스파크 프론트 엔드 개발자입니다",
    status: "offline" as const,
  },
  {
    id: "8",
    name: "박지훈",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Ns1QUUIHAGosp5MkeyDZTR8ehlvggq.png",
    description: "스파크 UI/UX 디자이너입니다",
    status: "online" as const,
  },
  {
    id: "9",
    name: "뿡빵이",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XucrI7N8uLA2q9CZte1OAlFLZQU25I.png",
    description: "찰지구나",
    status: "offline" as const,
  },
  {
    id: "10",
    name: "엘릭",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qXo1Y1b0lcSZDBgj5W680zlaEDlQ2G.png",
    description: "정답니다 연금술사!",
    status: "online" as const,
  },
  {
    id: "11",
    name: "전읍읍",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-eF6w1chIjHmpYzMiKT6uwejDWValUU.jpeg",
    description: "#검열된 설명입니다.#",
    status: "offline" as const,
  },
  {
    id: "12",
    name: "아이네",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-e8QyesLG6DnNG0vhyphZw7Sj8XHvFp.png",
    description: "어떻게 사람 키가...",
    status: "online" as const,
  },
  {
    id: "13",
    name: "제시원",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WRaYPsJjrRicFhrmj9bHYb1ZEg7Txg.png",
    description: "siwon is free",
    status: "offline" as const,
  },
]

const birthdayNeighbors = neighbors.filter((_, index) => index < 3)

export default function NeighborList() {
  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          내 이웃
          <Users className="h-6 w-6" />
        </h2>
      </div>

      {/* Birthday Banner */}
      <Button
        variant="secondary"
        className="w-fit bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-2 mb-4"
      >
        생일인 이웃 {birthdayNeighbors.length} →
      </Button>

      {/* Neighbor Count and Sort */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-semibold text-foreground">이웃 {neighbors.length}</span>
        <span className="text-sm text-muted-foreground">가나다순 정렬중</span>
      </div>

      {/* Neighbor Cards */}
      <div className="space-y-3">
        {neighbors.map((neighbor) => (
          <NeighborCard key={neighbor.id} neighbor={neighbor} />
        ))}
      </div>
    </div>
  )
}
