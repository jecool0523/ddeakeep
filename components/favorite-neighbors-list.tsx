import Image from "next/image"

const favoriteNeighbors = [
  {
    id: "1",
    name: "이규원",
    address: "10동 501호",
    phone: "010-xxxx-7579",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "2",
    name: "나기찬",
    address: "10동 302호",
    phone: "010-xxxx-8234",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "3",
    name: "박근우",
    address: "8동 105호",
    phone: "010-xxxx-9156",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default function FavoriteNeighborsList() {
  return (
    <div className="space-y-4">
      {favoriteNeighbors.map((neighbor) => (
        <div key={neighbor.id} className="bg-warm-brown rounded-2xl p-4 flex items-center gap-4 shadow-md">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
            <Image src={neighbor.avatar || "/placeholder.svg"} alt={neighbor.name} fill className="object-cover" />
          </div>

          <div className="flex-1 text-white">
            <div className="bg-warm-cream text-warm-brown px-3 py-1 rounded-lg inline-block mb-2 text-sm font-medium">
              {neighbor.name}
            </div>
            <p className="text-sm">{neighbor.address}</p>
            <p className="text-sm">{neighbor.phone}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
