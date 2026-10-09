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
        <nav className="h-[40px] px-3 sm:px-4 flex items-center justify-start gap-4 sm:gap-6 lg:gap-[30px] overflow-x-auto whitespace-nowrap scrollbar-hide">
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
        </nav>
    );
};

export default CategoryLinks;