import MobileFooterNav from "@/components/mobile-footer-nav"
import { UserCheck } from "lucide-react"

export default function VisitorsPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center justify-center max-w-2xl mx-auto">
          <h1 className="text-xl font-bold text-foreground">방문단</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <UserCheck className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">방문단</h2>
          <p className="text-muted-foreground">최근 방문자가 여기에 표시됩니다</p>
        </div>
      </main>
      <MobileFooterNav />
    </div>
  )
}
