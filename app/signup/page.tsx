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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/social`,
          data: {
            name: `${firstName} ${lastName}`,
            role: "citizen",
          },
        },
      })

      if (error) throw error

      console.log("[v0] Signup successful:", data)
      setSuccess("회원가입이 완료되었습니다! 이메일을 확인해주세요.")

      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err: any) {
      console.error("[v0] Signup error:", err)
      setError(err.message || "회원가입에 실패했습니다")
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
          <p className="text-muted-foreground mt-1">오늘 커뮤니티에 가입하세요</p>
        </div>

        <Tabs defaultValue="citizen" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="citizen" className="data-[state=active]:bg-lime-500 data-[state=active]:text-white">
              시민
            </TabsTrigger>
            <TabsTrigger value="official" className="data-[state=active]:bg-lime-500 data-[state=active]:text-white">
              공무원
            </TabsTrigger>
          </TabsList>

          <TabsContent value="citizen">
            <Card className="border-border shadow-lg">
              <form onSubmit={handleSignup}>
                <CardHeader>
                  <CardTitle>시민 계정 만들기</CardTitle>
                  <CardDescription>정보를 입력하여 계정을 만드세요</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">{error}</div>
                  )}
                  {success && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
                      {success}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">이름</Label>
                      <Input
                        id="first-name"
                        placeholder="이름"
                        className="border-input text-foreground placeholder:text-muted-foreground"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">성</Label>
                      <Input
                        id="last-name"
                        placeholder="성"
                        className="border-input text-foreground placeholder:text-muted-foreground"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
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
                    <Label htmlFor="password">비밀번호</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="비밀번호 만들기 (최소 6자)"
                      className="border-input text-foreground placeholder:text-muted-foreground"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-xs font-normal">
                      <Link href="/terms" className="text-lime-600 hover:text-lime-700">
                        서비스 약관
                      </Link>
                      과{" "}
                      <Link href="/privacy" className="text-lime-600 hover:text-lime-700">
                        개인정보 처리방침
                      </Link>
                      에 동의합니다
                    </Label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full bg-lime-500 hover:bg-lime-600 text-white" disabled={loading}>
                    {loading ? "가입 중..." : "계정 만들기"}
                  </Button>
                  <div className="text-center text-sm">
                    이미 계정이 있으신가요?{" "}
                    <Link href="/login" className="text-lime-600 hover:text-lime-700 font-medium">
                      로그인
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="official">
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle>공무원 등록</CardTitle>
                <CardDescription>공식 인증으로 계정 만들기</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="official-first-name">이름</Label>
                    <Input
                      id="official-first-name"
                      placeholder="이름"
                      className="border-input text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="official-last-name">성</Label>
                    <Input
                      id="official-last-name"
                      placeholder="성"
                      className="border-input text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="official-email">공식 이메일</Label>
                  <Input
                    id="official-email"
                    type="email"
                    placeholder="공식 이메일을 입력하세요"
                    className="border-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">부서</Label>
                  <Select>
                    <SelectTrigger className="border-input text-foreground">
                      <SelectValue placeholder="부서를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agriculture">농업</SelectItem>
                      <SelectItem value="education">교육</SelectItem>
                      <SelectItem value="health">보건</SelectItem>
                      <SelectItem value="home-affairs">행정안전</SelectItem>
                      <SelectItem value="municipal">시청</SelectItem>
                      <SelectItem value="police">경찰</SelectItem>
                      <SelectItem value="revenue">세무</SelectItem>
                      <SelectItem value="rural-development">농촌 개발</SelectItem>
                      <SelectItem value="urban-development">도시 개발</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employee-id">직원 ID</Label>
                  <Input
                    id="employee-id"
                    placeholder="직원 ID를 입력하세요"
                    className="border-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="official-password">비밀번호</Label>
                  <Input
                    id="official-password"
                    type="password"
                    placeholder="비밀번호 만들기"
                    className="border-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="official-terms" />
                  <Label htmlFor="official-terms" className="text-xs font-normal">
                    <Link href="/terms" className="text-lime-600 hover:text-lime-700">
                      서비스 약관
                    </Link>
                    과{" "}
                    <Link href="/privacy" className="text-lime-600 hover:text-lime-700">
                      개인정보 처리방침
                    </Link>
                    에 동의합니다
                  </Label>
                </div>

                <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
                  <p className="text-xs text-blue-700">
                    <strong>참고:</strong> 공무원 계정은 DigiLocker 또는 주민등록을 통한 인증이 필요합니다. 등록 후
                    인증을 완료하라는 메시지가 표시됩니다.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full bg-lime-500 hover:bg-lime-600 text-white">등록 및 인증 진행</Button>
                <div className="text-center text-sm">
                  이미 계정이 있으신가요?{" "}
                  <Link href="/login" className="text-lime-600 hover:text-lime-700 font-medium">
                    로그인
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
