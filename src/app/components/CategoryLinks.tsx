"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Category = {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
};

type CategoryLinksProps = {
    categories: Category[];
};

const CategoryLinks = ({ categories }: CategoryLinksProps) => {
    const pathname = usePathname();

    return (
        <section className="w-full border-t border-gray-200 bg-white">
<nav className="mx-auto flex h-[40px] w-full items-center justify-start gap-4 overflow-x-auto whitespace-nowrap px-3 sm:gap-6 sm:px-4 lg:gap-[30px] scrollbar-hide">
            {categories.map((category) => {
                const isActive = pathname === `/category/${category.slug}`;

                return (
                    <Link key={category.id} href={`/category/${category.slug}`} className={`flex items-center gap-[4px] shrink-0 text-[10px] sm:text-[11px] transition-colors px-2 py-1 rounded-md ${isActive ? "bg-green-600 border border-green-600 text-white" : "border border-transparent text-gray-700 hover:text-white hover:bg-green-600 hover:border-green-600"}`}>
                        <span className="text-[11px] sm:text-[12px]">
                            {category.icon}
                        </span>

                        <span>
                            {category.nameBn}
                        </span>
                    </Link>
                );
            })}
        </nav></section>
    );
};

export default CategoryLinks;