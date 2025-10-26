"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"
import { useRouter, useSearchParams } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = getSupabaseBrowserClient()

  const redirectTo = searchParams.get("redirect") || "/"

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      window.location.href = redirectTo
    } catch (err: any) {
      console.error("[v0] Login error:", err)
      setError(err.message || "로그인에 실패했습니다")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
      <Link href="/" className="absolute top-4 left-4 flex items-center text-foreground hover:text-lime-600">
        <ArrowLeft className="h-4 w-4 mr-1" />
        <span>홈으로 돌아가기</span>
      </Link>

      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex flex-col items-center gap-2 mb-4">
            <Image src="/images/LOGO.png" alt="Logo" width={80} height={80} className="h-20 w-auto" />
            <Image src="/images/ddeakeep.png" alt="떡 잎" width={100} height={40} className="h-10 w-auto" />
          </div>
          <p className="text-muted-foreground mt-1">커뮤니티와 함께하세요</p>
        </div>

        <Tabs defaultValue="citizen" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="citizen" className="data-[state=active]:bg-lime-500 data-[state=active]:text-white">
              시민
            </TabsTrigger>
            <TabsTrigger value="official" className="data-[state=active]:bg-lime-500 data-[state=active]:text-white">
              관리자
            </TabsTrigger>
          </TabsList>

          <TabsContent value="citizen">
            <Card className="border-border shadow-lg">
              <form onSubmit={handleLogin}>
                <CardHeader>
                  <CardTitle>시민 로그인</CardTitle>
                  <CardDescription>계정 정보를 입력하여 로그인하세요</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">{error}</div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">이메일 또는 휴대폰 번호</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="이메일을 입력하세요"
                      className="border-input text-foreground placeholder:text-muted-foreground"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">비밀번호</Label>
                      <Link href="/forgot-password" className="text-xs text-lime-600 hover:text-lime-700">
                        비밀번호를 잊으셨나요?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="비밀번호를 입력하세요"
                      className="border-input text-foreground placeholder:text-muted-foreground"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm font-normal">
                      30일 동안 로그인 유지
                    </Label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full bg-lime-500 hover:bg-lime-600 text-white" disabled={loading}>
                    {loading ? "로그인 중..." : "로그인"}
                  </Button>
                  <div className="text-center text-sm">
                    계정이 없으신가요?{" "}
                    <Link href="/signup" className="text-lime-600 hover:text-lime-700 font-medium">
                      회원가입
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="official">
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle>공무원 로그인</CardTitle>
                <CardDescription>인증된 공무원을 위한 보안 로그인</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="official-id">공무원 ID</Label>
                  <Input
                    id="official-id"
                    type="text"
                    placeholder="공무원 ID를 입력하세요"
                    className="border-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="official-password">비밀번호</Label>
                    <Link href="/forgot-password" className="text-xs text-lime-600 hover:text-lime-700">
                      비밀번호를 잊으셨나요?
                    </Link>
                  </div>
                  <Input
                    id="official-password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    className="border-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="official-remember" />
                  <Label htmlFor="official-remember" className="text-sm font-normal">
                    30일 동안 로그인 유지
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full bg-lime-500 hover:bg-lime-600 text-white">DigiLocker로 로그인</Button>
                <div className="text-center text-sm">
                  인증이 필요하신가요?{" "}
                  <Link href="/official-verification" className="text-lime-600 hover:text-lime-700 font-medium">
                    인증 받기
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
