
import { Skeleton } from "@heroui/react";

export default function CategoryLoading() {
    return (
        <main className="min-h-screen bg-[#f3f6f3] px-3 py-6 sm:px-4 lg:px-6">
            <div className="mx-auto max-w-[1020px] space-y-5">

                {/* Category Header Skeleton */}
                <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
                    <Skeleton className="h-12 w-12 shrink-0 rounded-full sm:h-16 sm:w-16" />

                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-6 w-40 rounded-lg" />
                        <Skeleton className="h-4 w-64 max-w-full rounded-lg" />
                    </div>
                </div>

                {/* Sort Bar Skeleton */}
                <div className="flex justify-end rounded-2xl border border-gray-100 bg-white px-4 py-3">
                    <Skeleton className="h-8 w-36 rounded-lg" />
                </div>

                {/* Product Count Skeleton */}
                <Skeleton className="h-4 w-48 rounded-lg" />

                {/* Product Cards Skeleton */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Skeleton className="h-40 rounded-2xl" />
                    <Skeleton className="h-40 rounded-2xl" />
                    <Skeleton className="h-40 rounded-2xl" />
                    <Skeleton className="h-40 rounded-2xl" />
                    <Skeleton className="h-40 rounded-2xl" />
                    <Skeleton className="h-40 rounded-2xl" />
                </div>

            </div>
        </main>
    );
}