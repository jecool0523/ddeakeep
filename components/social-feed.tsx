"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  MessageCircle,
  Share2,
  ImageIcon,
  Smile,
  MapPin,
  CheckCircle,
  UserPlus,
  UserCheck,
  MoreHorizontal,
  Bookmark,
  Flag,
  UserX,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"
import { useRouter } from "next/navigation"

interface Post {
  id: string
  user_id: string
  content: string
  image_url?: string
  likes_count: number
  comments_count: number
  shares_count: number
  created_at: string
  users?: {
    name: string
    email: string
    avatar_url?: string
    role: string
    is_verified: boolean
  }
}

export default function SocialFeed() {
  const [activeTab, setActiveTab] = useState("all")
  const [postContent, setPostContent] = useState("")
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const supabase = getSupabaseBrowserClient()
  const router = useRouter()

  useEffect(() => {
    checkUser()
    fetchPosts()
  }, [])

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      router.push("/login")
    } else {
      setUser(user)
      await ensureUserExists(user)
    }
  }

  const ensureUserExists = async (authUser: any) => {
    try {
      const { data: existingUser, error: checkError } = await supabase
        .from("users")
        .select("id")
        .eq("id", authUser.id)
        .single()

      if (checkError && checkError.code === "PGRST116") {
        const { error: insertError } = await supabase.from("users").insert({
          id: authUser.id,
          email: authUser.email,
          name: authUser.user_metadata?.name || authUser.email?.split("@")[0] || "사용자",
          role: authUser.user_metadata?.role || "citizen",
          avatar_url: authUser.user_metadata?.avatar_url || null,
          is_verified: false,
        })

        if (insertError) {
          console.error("사용자 프로필 생성 실패:", insertError.message)
          alert("사용자 프로필 생성에 실패했습니다. 페이지를 새로고침해주세요.")
        }
      }
    } catch (error: any) {
      console.error("사용자 확인 중 오류:", error.message)
    }
  }

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          *,
          users (
            name,
            email,
            avatar_url,
            role,
            is_verified
          )
        `)
        .order("created_at", { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error("게시물 불러오기 실패:", error)
    }
  }

  const handleCreatePost = async () => {
    if (!postContent.trim() || !user) return

    setLoading(true)
    try {
      await ensureUserExists(user)

      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            user_id: user.id,
            content: postContent,
            likes_count: 0,
            comments_count: 0,
            shares_count: 0,
          },
        ])
        .select()

      if (error) throw error

      setPostContent("")
      fetchPosts()
    } catch (error: any) {
      console.error("게시물 작성 실패:", error.message)
      alert("게시물 작성에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Card className="border-border shadow-md bg-card">
        <CardContent className="pt-4 px-3 md:px-6">
          <div className="flex gap-2 md:gap-3">
            <Avatar className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
              <AvatarImage
                src={user?.user_metadata?.avatar_url || "/placeholder.svg?height=40&width=40"}
                alt="사용자"
              />
              <AvatarFallback className="bg-lime-500 text-white">
                {user?.user_metadata?.name?.[0] || "나"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <Textarea
                placeholder="소식을 공유하거나 질문해보세요..."
                className="resize-none border-border focus-visible:ring-lime-500 text-foreground placeholder:text-muted-foreground min-h-[80px] md:min-h-[100px]"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-2">
                <div className="flex gap-1 flex-wrap">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:bg-secondary h-8 px-2">
                          <ImageIcon className="h-4 w-4 mr-1" />
                          <span className="text-xs hidden sm:inline">사진</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>게시물에 사진 추가</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:bg-secondary h-8 px-2">
                          <Smile className="h-4 w-4 mr-1" />
                          <span className="text-xs hidden sm:inline">이모지</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>이모지 추가</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:bg-secondary h-8 px-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-xs hidden sm:inline">위치</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>위치 추가</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Button
                  size="sm"
                  disabled={!postContent.trim() || loading}
                  onClick={handleCreatePost}
                  className="bg-lime-500 hover:bg-lime-600 text-white w-full sm:w-auto"
                >
                  {loading ? "게시 중..." : "게시"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4 bg-secondary p-1 w-full">
          <TabsTrigger
            value="all"
            onClick={() => setActiveTab("all")}
            className="data-[state=active]:bg-background data-[state=active]:text-foreground text-xs md:text-sm"
          >
            전체
          </TabsTrigger>
          <TabsTrigger
            value="official"
            onClick={() => setActiveTab("official")}
            className="data-[state=active]:bg-background data-[state=active]:text-foreground text-xs md:text-sm"
          >
            공식
          </TabsTrigger>
          <TabsTrigger
            value="community"
            onClick={() => setActiveTab("community")}
            className="data-[state=active]:bg-background data-[state=active]:text-foreground text-xs md:text-sm"
          >
            커뮤니티
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </TabsContent>

        <TabsContent value="official" className="space-y-4">
          {posts
            .filter((post) => post.users?.role === "official")
            .map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
        </TabsContent>

        <TabsContent value="community" className="space-y-4">
          {posts
            .filter((post) => post.users?.role === "citizen")
            .map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface PostCardProps {
  post: Post
}

function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false)
  const [following, setFollowing] = useState(false)
  const [saved, setSaved] = useState(false)

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (hours < 1) return "방금 전"
    if (hours < 24) return `${hours}시간 전`
    return `${Math.floor(hours / 24)}일 전`
  }

  return (
    <Card className="border-border shadow-sm hover:shadow-md transition-shadow bg-card">
      <CardHeader className="pb-2 px-3 md:px-6 pt-3 md:pt-6">
        <div className="flex items-start gap-2 md:gap-3">
          <Avatar className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
            <AvatarImage src={post.users?.avatar_url || "/placeholder.svg"} alt={post.users?.name} />
            <AvatarFallback
              className={post.users?.role === "official" ? "bg-lime-500 text-white" : "bg-secondary text-foreground"}
            >
              {post.users?.name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 flex-wrap">
              <span className="font-semibold text-sm md:text-base truncate">{post.users?.name || "Unknown"}</span>
              {post.users?.is_verified && (
                <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-blue-500 fill-blue-500 flex-shrink-0" />
              )}
              {post.users?.role === "official" && (
                <Badge variant="outline" className="text-xs bg-lime-50 text-lime-700 border-lime-200 ml-1">
                  공식
                </Badge>
              )}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground flex items-center gap-2">
              <span className="truncate">@{post.users?.email?.split("@")[0]}</span>
              <span>•</span>
              <span className="whitespace-nowrap">{formatTimestamp(post.created_at)}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            {post.users?.role !== "official" && (
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-full px-2 md:px-3 h-7 md:h-8 ${
                  following
                    ? "bg-secondary text-foreground hover:bg-secondary/80"
                    : "border border-border hover:bg-secondary"
                }`}
                onClick={() => setFollowing(!following)}
              >
                {following ? (
                  <>
                    <UserCheck className="h-3 w-3 md:h-4 md:w-4 md:mr-1" />
                    <span className="text-xs hidden md:inline">팔로잉</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="h-3 w-3 md:h-4 md:w-4 md:mr-1" />
                    <span className="text-xs hidden md:inline">팔로우</span>
                  </>
                )}
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8 rounded-full hover:bg-secondary">
                  <MoreHorizontal className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSaved(!saved)}>
                  <Bookmark className={`h-4 w-4 mr-2 ${saved ? "fill-foreground text-foreground" : ""}`} />
                  {saved ? "저장 취소" : "게시물 저장"}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Flag className="h-4 w-4 mr-2" />
                  게시물 신고
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserX className="h-4 w-4 mr-2" />이 사용자 숨기기
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-2 px-3 md:px-6">
        <p className="text-foreground text-sm md:text-base">{post.content}</p>
        {post.image_url && (
          <div className="mt-3 rounded-lg overflow-hidden">
            <img src={post.image_url || "/placeholder.svg"} alt="게시물 이미지" className="w-full h-auto" />
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 pb-2 px-3 md:px-6">
        <div className="flex justify-between w-full text-muted-foreground">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1 h-8 px-2 md:px-3 ${liked ? "text-red-500" : ""} hover:bg-red-50 hover:text-red-500`}
            onClick={() => setLiked(!liked)}
          >
            <Heart className={`h-3 w-3 md:h-4 md:w-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
            <span className="text-xs md:text-sm">{liked ? post.likes_count + 1 : post.likes_count}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 h-8 px-2 md:px-3 hover:bg-blue-50 hover:text-blue-600"
          >
            <MessageCircle className="h-3 w-3 md:h-4 md:w-4" />
            <span className="text-xs md:text-sm">{post.comments_count}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 h-8 px-2 md:px-3 hover:bg-green-50 hover:text-green-600"
          >
            <Share2 className="h-3 w-3 md:h-4 md:w-4" />
            <span className="text-xs md:text-sm">{post.shares_count}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
