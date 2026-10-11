import Image from "next/image";
import Link from "next/link";
import CategoryLinks from "./CategoryLinks";
import Marquee from "./Marquee";
import UserMenu from "../home/UserMenu";


type Category = {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
};

// API theke category ana
async function getCategory(): Promise<Category[]> {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/categories"
    );

    if (!res.ok) {
        throw new Error("Category data fetch failed");
    }

    return res.json();
}

export default async function Navbar() {
    const categories = await getCategory();

    // Ajker Bangla date
    const date = new Date().toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <nav className="mt-2 w-full border-b border-gray-200 bg-white">
            {/* Top navbar */}
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto flex h-[66px] max-w-[1020px] items-center justify-between px-3 sm:h-[70px] sm:px-4">
                    {/* Logo, name and date */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-white sm:gap-3 sm:px-4"
                    >
                        <Image
                            src="/logo-icon.png"
                            width={45}
                            height={45}
                            alt="বাজার দর"
                            className="h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11"
                        />

                        <div className="flex flex-col justify-center">
                            <h1 className="text-[15px] leading-none font-bold sm:text-[17px] md:text-[18px]">
                                বাজার দর
                            </h1>

                            <p className="mt-[5px] whitespace-nowrap text-[7px] leading-none text-white sm:text-[8px] md:text-[9px]">
                                {date}
                            </p>
                        </div>
                    </Link>
                    {/* Login or user profile */}
                    <UserMenu />
                </div>
            </div>

            {/* Category links */}
            <div className="mt-2 w-full border-b border-gray-200 bg-white">
                <div className="w-full border-t border-gray-200">
                    <div className="mx-auto max-w-[1020px]">
                        <CategoryLinks categories={categories} />
                    </div>
                </div>
            </div>

            {/* Product price marquee */}
            <Marquee />
        </nav>
    );
}