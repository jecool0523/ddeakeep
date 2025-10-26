import { notFound } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Heart, MessageCircle, Phone, Mail, MapPin, Calendar, Briefcase } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import MobileFooterNav from "@/components/mobile-footer-nav"

// Mock neighbor data - in a real app, this would come from a database
const neighbors = [
  {
    id: "1",
    name: "권재헌",
    avatar: "/placeholder.svg?height=200&width=200",
    description: "스파크 팀장 권재헌입니다",
    status: "offline" as const,
    bio: "안녕하세요! 스파크 팀을 이끌고 있는 권재헌입니다. 지역 사회 발전에 관심이 많고, 이웃들과 함께 더 나은 커뮤니티를 만들어가고 싶습니다.",
    location: "서울시 강남구",
    joinDate: "2023년 3월",
    occupation: "프로젝트 매니저",
    interests: ["커뮤니티 활동", "봉사", "독서"],
    phone: "010-1234-5678",
    email: "kwon@example.com",
  },
  {
    id: "2",
    name: "나기찬",
    avatar: "/placeholder.svg?height=200&width=200",
    description: "스파크 기획 나기찬입니다",
    status: "online" as const,
    bio: "기획자로 일하고 있습니다. 창의적인 아이디어로 우리 동네를 더 살기 좋은 곳으로 만들고 싶어요!",
    location: "서울시 서초구",
    joinDate: "2023년 5월",
    occupation: "서비스 기획자",
    interests: ["디자인", "UX", "여행"],
    phone: "010-2345-6789",
    email: "na@example.com",
  },
  {
    id: "3",
    name: "박근우",
    avatar: "/placeholder.svg?height=200&width=200",
    description: "스파크 개발 박근우입니다",
    status: "online" as const,
    bio: "개발자입니다. 기술로 사회 문제를 해결하는 것에 관심이 많습니다.",
    location: "서울시 송파구",
    joinDate: "2023년 4월",
    occupation: "소프트웨어 개발자",
    interests: ["코딩", "오픈소스", "게임"],
    phone: "010-3456-7890",
    email: "park@example.com",
  },
  {
    id: "4",
    name: "이규원",
    avatar: "/placeholder.svg?height=200&width=200",
    description: "스파크 발표 이규원입니다",
    status: "offline" as const,
    bio: "발표와 커뮤니케이션을 담당하고 있습니다. 사람들과 소통하는 것을 좋아합니다!",
    location: "서울시 마포구",
    joinDate: "2023년 6월",
    occupation: "마케팅 전문가",
    interests: ["발표", "글쓰기", "사진"],
    phone: "010-4567-8901",
    email: "lee@example.com",
  },
  {
    id: "5",
    name: "DC즈",
    avatar: "/placeholder.svg?height=200&width=200",
    description: "디자인은 디컨",
    status: "online" as const,
    bio: "디자이너입니다. 아름다운 디자인으로 세상을 더 나은 곳으로 만들고 싶습니다.",
    location: "서울시 용산구",
    joinDate: "2023년 7월",
    occupation: "UI/UX 디자이너",
    interests: ["디자인", "예술", "음악"],
    phone: "010-5678-9012",
    email: "dc@example.com",
  },
  {
    id: "6",
    name: "김민수",
    avatar: "/placeholder.svg?height=200&width=200",
    description: "스파크 백엔드 개발자입니다",
    status: "online" as const,
    bio: "백엔드 개발을 담당하고 있습니다. 안정적인 시스템 구축에 열정을 가지고 있습니다.",
    location: "서울시 강동구",
    joinDate: "2023년 8월",
    occupation: "백엔드 개발자",
    interests: ["서버", "데이터베이스", "클라우드"],
    phone: "010-6789-0123",
    email: "kim@example.com",
  },
  {
    id: "7",
    name: "이서연",
    avatar: "/placeholder.svg?height=200&width=200",
    description: "스파크 프론트 엔드 개발자입니다",
    status: "offline" as const,
    bio: "프론트엔드 개발자로 사용자 경험을 최우선으로 생각합니다.",
    location: "서울시 성북구",
    joinDate: "2023년 9월",
    occupation: "프론트엔드 개발자",
    interests: ["React", "디자인", "애니메이션"],
    phone: "010-7890-1234",
    email: "seoyeon@example.com",
  },
  {
    id: "8",
    name: "박지훈",
    avatar: "/placeholder.svg?height=200&width=200",
    description: "스파크 UI/UX 디자이너입니다",
    status: "online" as const,
    bio: "사용자 중심의 디자인을 추구합니다. 모두가 쉽게 사용할 수 있는 서비스를 만들고 싶어요.",
    location: "서울시 광진구",
    joinDate: "2023년 10월",
    occupation: "UI/UX 디자이너",
    interests: ["사용자 경험", "프로토타이핑", "리서치"],
    phone: "010-8901-2345",
    email: "jihoon@example.com",
  },
  {
    id: "9",
    name: "뿡빵이",
    avatar: "/placeholder.svg?height=200&width=200",
    description: "찰지구나",
    status: "offline" as const,
    bio: "찰떡같은 이웃이 되고 싶습니다! 언제든 편하게 연락주세요~",
    location: "서울시 동작구",
    joinDate: "2023년 11월",
    occupation: "프리랜서",
    interests: ["요리", "베이킹", "카페"],
    phone: "010-9012-3456",
    email: "bbang@example.com",
  },
  {
    id: "10",
    name: "엘릭",
    avatar: "/placeholder.svg?height=200&width=200",
    description: "정답니다 연금술사!",
    status: "online" as const,
    bio: "연금술처럼 창의적인 아이디어로 가치를 만들어냅니다.",
    location: "서울시 관악구",
    joinDate: "2023년 12월",
    occupation: "크리에이터",
    interests: ["창작", "실험", "과학"],
    phone: "010-0123-4567",
    email: "elric@example.com",
  },
  {
    id: "11",
    name: "전읍읍",
    avatar: "/placeholder.svg?height=200&width=200",
    description: "#검열된 설명입니다.#",
    status: "offline" as const,
    bio: "미스터리한 이웃입니다. 하지만 친절해요!",
    location: "서울시 은평구",
    joinDate: "2024년 1월",
    occupation: "비밀",
    interests: ["미스터리", "추리", "영화"],
    phone: "010-1234-5670",
    email: "mystery@example.com",
  },
  {
    id: "12",
    name: "아이네",
    avatar: "/placeholder.svg?height=200&width=200",
    description: "어떻게 사람 키가...",
    status: "online" as const,
    bio: "작지만 강한 이웃입니다! 키는 작아도 마음은 큽니다.",
    location: "서울시 노원구",
    joinDate: "2024년 2월",
    occupation: "스트리머",
    interests: ["게임", "방송", "엔터테인먼트"],
    phone: "010-2345-6701",
    email: "ine@example.com",
  },
  {
    id: "13",
    name: "제시원",
    avatar: "/placeholder.svg?height=200&width=200",
    description: "siwon is free",
    status: "offline" as const,
    bio: "자유로운 영혼입니다. 여행과 새로운 경험을 사랑합니다.",
    location: "서울시 중랑구",
    joinDate: "2024년 3월",
    occupation: "여행 작가",
    interests: ["여행", "사진", "글쓰기"],
    phone: "010-3456-7012",
    email: "siwon@example.com",
  },
]

export default async function NeighborProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const neighbor = neighbors.find((n) => n.id === id)

  if (!neighbor) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4 max-w-2xl">
          <Link href="/neighbor">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">이웃 프로필</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Profile Header */}
        <div className="bg-card rounded-3xl p-6 mb-4">
          <div className="flex items-start gap-4 mb-6">
            <div className="relative">
              <Image
                src={neighbor.avatar || "/placeholder.svg"}
                alt={neighbor.name}
                width={100}
                height={100}
                className="rounded-full object-cover"
              />
              <div
                className={cn(
                  "absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-card",
                  neighbor.status === "online" ? "bg-[hsl(var(--status-online))]" : "bg-[hsl(var(--status-offline))]",
                )}
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-card-foreground mb-2">{neighbor.name}</h2>
              <p className="text-sm text-muted-foreground mb-3">{neighbor.description}</p>
              <div className="flex gap-2">
                <Button size="sm" className="rounded-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  메시지
                </Button>
                <Button size="sm" variant="outline" className="rounded-full bg-transparent">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-card-foreground mb-2">소개</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{neighbor.bio}</p>
          </div>

          {/* Info Grid */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-card-foreground">{neighbor.location}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span className="text-card-foreground">{neighbor.occupation}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-card-foreground">{neighbor.joinDate} 가입</span>
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="bg-card rounded-3xl p-6 mb-4">
          <h3 className="text-sm font-semibold text-card-foreground mb-3">관심사</h3>
          <div className="flex flex-wrap gap-2">
            {neighbor.interests.map((interest, index) => (
              <span
                key={index}
                className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-card rounded-3xl p-6">
          <h3 className="text-sm font-semibold text-card-foreground mb-3">연락처</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-card-foreground">{neighbor.phone}</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-card-foreground">{neighbor.email}</span>
            </button>
          </div>
        </div>
      </main>

      <MobileFooterNav />
    </div>
  )
}
