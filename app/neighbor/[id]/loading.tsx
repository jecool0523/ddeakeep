import { Skeleton } from "@/components/ui/skeleton"

export default function NeighborProfileLoading() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4 max-w-2xl">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-6 w-32" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Profile Header Skeleton */}
        <div className="bg-card rounded-3xl p-6 mb-4">
          <div className="flex items-start gap-4 mb-6">
            <Skeleton className="h-[100px] w-[100px] rounded-full" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-24 rounded-full" />
                <Skeleton className="h-9 w-9 rounded-full" />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>

        {/* Interests Skeleton */}
        <div className="bg-card rounded-3xl p-6 mb-4">
          <Skeleton className="h-4 w-20 mb-3" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-28 rounded-full" />
          </div>
        </div>

        {/* Contact Skeleton */}
        <div className="bg-card rounded-3xl p-6">
          <Skeleton className="h-4 w-16 mb-3" />
          <div className="space-y-3">
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>
      </main>
    </div>
  )
}
