
import Image from "next/image";
import Link from "next/link";
import CategoryLinks from "./CategoryLinks";
import Marquee from "./Marquee";

type Category = {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
};

const getCategory = async (): Promise<Category[]> => {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/categories"
    );

    if (!res.ok) {
        throw new Error("Category data fetch failed");
    }

    const data: Category[] = await res.json();

    return data;
};

const Navbar = async () => {
    const categories = await getCategory();

   

    const today = new Date();

    const date = today.toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <nav className="mt-2 w-full border-b border-gray-200 bg-white">

            {/* TOP NAVBAR */}

            <div className="mx-auto max-w-7xl">
                <div className="mx-auto flex h-[66px] max-w-[1020px] items-center justify-between px-3 sm:h-[70px] sm:px-4">

                    {/* LOGO + NAME + DATE */}

                    <Link
                        href="/"
                        className="flex items-center gap-2 sm:gap-3"
                    >
                        <Image
                            src="/logo-icon.png"
                            width={45}
                            height={45}
                            alt="বাজার দর"
                            className="h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11"
                        />

                        <div className="flex h-9 flex-col justify-center sm:h-10 md:h-11">

                            <h1 className="text-[15px] leading-none font-bold text-gray-900 sm:text-[17px] md:text-[18px]">
                                বাজার দর
                            </h1>

                            <p className="mt-[5px] whitespace-nowrap text-[7px] leading-none text-gray-500 sm:text-[8px] md:text-[9px]">
                                {date}
                            </p>

                        </div>
                    </Link>

                    {/* AUTH BUTTONS */}

                    <div className="flex items-center gap-2 sm:gap-4 md:gap-5">

                        <Link
                            href="/sign-in"
                            className="text-[10px] font-medium text-gray-800 hover:text-green-600 sm:text-[11px] md:text-[12px]"
                        >
                            সাইন ইন
                        </Link>

                        <Link
                            href="/sign-up"
                            className="flex h-[30px] items-center rounded-[7px] bg-green-600 px-3 text-[10px] font-medium text-white shadow-sm hover:bg-green-700 sm:h-[32px] sm:px-4 sm:text-[11px] md:h-[34px] md:text-[12px]"
                        >
                            সাইন আপ
                        </Link>

                    </div>
                </div>
            </div>

            {/* CATEGORY BAR */}
            {/* CATEGORY BAR */}

            <div className="mt-2 w-full border-b border-gray-200 bg-white">
                <div className="w-full border-t border-gray-200">
                    <div className="mx-auto max-w-[1020px]">
                        <CategoryLinks categories={categories} />
                    </div>
                </div>
            </div>

            {/* PRODUCT MARQUEE */}

            <Marquee />

        </nav>
    );
};

export default Navbar;

