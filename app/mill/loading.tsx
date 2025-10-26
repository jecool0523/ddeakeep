export default function MillLoading() {
  return (
    <div className="min-h-screen bg-warm-bg pb-20">
      <div className="animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-warm-border">
          <div className="h-8 w-16 bg-warm-cream rounded" />
          <div className="h-8 w-24 bg-warm-cream rounded" />
        </div>

        {/* Search Bar Skeleton */}
        <div className="px-4 pt-4 pb-2">
          <div className="h-12 bg-warm-cream rounded-full" />
        </div>

        {/* Content Skeleton */}
        <div className="px-4 pt-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-warm-cream rounded-lg" />
            <div className="h-8 w-24 bg-warm-cream rounded" />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="h-24 bg-warm-cream rounded-2xl" />
            <div className="h-24 bg-warm-cream rounded-2xl" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-warm-cream rounded-3xl" />
            <div className="aspect-square bg-warm-cream rounded-3xl" />
            <div className="aspect-square bg-warm-cream rounded-3xl" />
            <div className="aspect-square bg-warm-cream rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
