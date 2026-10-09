import Image from "next/image";
import Link from "next/link";
import React from "react";
import CategoryLinks from "./CategoryLinks";


type Category = {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
};

const getCategory = async (): Promise<Category[]> => {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories");

    if (!res.ok) {
        throw new Error("Category data fetch failed");
    }

    const data: Category[] = await res.json();

    return data;
};

const Navbar = async () => {
    const categories = await getCategory();

    console.log(categories);

    const today = new Date();

    const date = today.toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <nav className="w-full bg-white border-b border-gray-200">

            {/* TOP NAVBAR */}
            <div className="max-w-7xl mx-auto">

                <div className="max-w-[1020px] mx-auto h-[66px] sm:h-[70px] px-3 sm:px-4 flex items-center justify-between">

                    {/* LOGO + NAME + DATE */}
                    <Link href="/" className="flex items-center gap-2 sm:gap-3">

                        <Image src="/logo-icon.png" width={45} height={45} alt="বাজার দর" className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11" />

                        <div className="h-9 sm:h-10 md:h-11 flex flex-col justify-center">

                            <h1 className="text-[15px] sm:text-[17px] md:text-[18px] font-bold text-gray-900 leading-none">
                                বাজার দর
                            </h1>

                            <p className="text-[7px] sm:text-[8px] md:text-[9px] text-gray-500 mt-[5px] leading-none whitespace-nowrap">
                                {date}
                            </p>

                        </div>

                    </Link>

                    {/* AUTH BUTTONS */}
                    <div className="flex items-center gap-2 sm:gap-4 md:gap-5">

                        <Link href="/sign-in" className="text-[10px] sm:text-[11px] md:text-[12px] font-medium text-gray-800 hover:text-green-600">
                            সাইন ইন
                        </Link>

                        <Link href="/sign-up" className="h-[30px] sm:h-[32px] md:h-[34px] px-3 sm:px-4 flex items-center rounded-[7px] bg-green-600 hover:bg-green-700 text-white text-[10px] sm:text-[11px] md:text-[12px] font-medium shadow-sm">
                            সাইন আপ
                        </Link>

                    </div>

                </div>

            </div>

            {/* CATEGORY BAR */}
            <div className="border-t border-gray-200">

                <div className="max-w-[1020px] mx-auto">

                    <CategoryLinks categories={categories} />

                </div>

            </div>

        </nav>
    );
};

export default Navbar;