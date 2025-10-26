import NeighborHeader from "@/components/neighbor-header"
import NeighborList from "@/components/neighbor-list"
import MobileFooterNav from "@/components/mobile-footer-nav"

export default function NeighborPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <NeighborHeader />
      <main className="container mx-auto px-4 py-4 max-w-2xl">
        <NeighborList />
      </main>
      <MobileFooterNav />
    </div>
  )
}
