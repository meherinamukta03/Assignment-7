import { Skeleton } from "@heroui/react";

export default function ProductDetailsLoading() {
    return (
        <main className="mx-auto min-h-screen max-w-7xl space-y-4 bg-[#f0f5f0] px-4 py-6">
            <Skeleton className="h-6 w-40 rounded-lg" />
            <Skeleton className="h-24 w-full rounded-2xl" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Skeleton className="h-28 rounded-xl" />
                <Skeleton className="h-28 rounded-xl" />
                <Skeleton className="h-28 rounded-xl" />
            </div>

            <Skeleton className="h-64 w-full rounded-2xl" />
        </main>
    );
}