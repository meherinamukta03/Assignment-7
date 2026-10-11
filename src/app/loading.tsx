
import { Skeleton } from "@heroui/react";

export default function Loading() {
    return (
        <main className="mx-auto min-h-screen w-full max-w-6xl space-y-5 px-4 py-6">
            <Skeleton className="h-8 w-48 rounded-lg" />

            <Skeleton className="h-48 w-full rounded-2xl" />

            <Skeleton className="h-6 w-40 rounded-lg" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Skeleton className="h-48 rounded-xl" />
                <Skeleton className="h-48 rounded-xl" />
                <Skeleton className="h-48 rounded-xl" />
            </div>
        </main>
    );
}
