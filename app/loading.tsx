import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Navbar Skeleton */}
      <nav className="border-b bg-white px-4 py-3 shadow-sm">
        <div className="container mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      </nav>

      <main className="container mx-auto max-w-5xl px-4 py-12 relative z-10">
        <div className="mb-12 text-center">
          <Skeleton className="h-12 w-64 mx-auto mb-3" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        <div className="mb-16">
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/60 dashed">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-32 rounded-xl bg-white border border-slate-100 shadow-sm p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="flex gap-1">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </div>
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
