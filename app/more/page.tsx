import MobileFooterNav from "@/components/mobile-footer-nav"
import { Settings } from "lucide-react"

export default function MorePage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center justify-center max-w-2xl mx-auto">
          <h1 className="text-xl font-bold text-foreground">더보기</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <Settings className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">더보기</h2>
          <p className="text-muted-foreground">설정 및 추가 옵션</p>
        </div>
      </main>
      <MobileFooterNav />
    </div>
  )
}
