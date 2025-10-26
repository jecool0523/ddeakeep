export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-warm-bg pb-20">
      <div className="animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-warm-border">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 bg-warm-cream rounded" />
            <div className="h-6 w-24 bg-warm-cream rounded" />
          </div>
          <div className="h-8 w-24 bg-warm-cream rounded" />
        </div>

        {/* Search Bar Skeleton */}
        <div className="px-4 pt-4 pb-2">
          <div className="h-12 bg-warm-cream rounded-full" />
        </div>

        {/* Banner Skeleton */}
        <div className="px-4 pt-4 pb-2">
          <div className="h-16 bg-warm-cream rounded-2xl" />
        </div>

        {/* Products Skeleton */}
        <div className="px-4 pt-4 pb-4 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-4">
              <div className="flex gap-4 mb-4">
                <div className="w-24 h-24 bg-warm-cream rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-warm-cream rounded w-3/4" />
                  <div className="h-4 bg-warm-cream rounded w-1/2" />
                  <div className="h-6 bg-warm-cream rounded w-1/3" />
                </div>
              </div>
              <div className="h-10 bg-warm-cream rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
