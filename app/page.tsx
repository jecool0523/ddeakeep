import HomeContent from "@/components/home-content"
import MobileFooterNav from "@/components/mobile-footer-nav"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-warm-bg pb-16">
      <HomeContent />
      <MobileFooterNav />
    </div>
  )
}
