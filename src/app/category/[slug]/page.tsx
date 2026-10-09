



import ProductGrid from "@/app/components/ProductGrid";
import React from "react";

type Category = {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
};

async function getCategory(slug: string): Promise<Category | null> {
    try {
        const res = await fetch(
            `https://api.abcz.workers.dev/api/bazardor/categories/${slug}`,
            {
                cache: "no-store",
            }
        );

        if (!res.ok) return null;

        return await res.json();
    } catch (error) {
        return null;
    }
}

async function getProductsByCategory(slug: string): Promise<Product[]> {
    try {
        const res = await fetch(
            `https://api.abcz.workers.dev/api/bazardor/products?category=${slug}`,
            {
                cache: "no-store",
            }
        );

        if (!res.ok) return [];

        return await res.json();
    } catch (error) {
        return [];
    }
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const [category, products] = await Promise.all([
        getCategory(slug),
        getProductsByCategory(slug),
    ]);

    if (!category) {
        return (
            <div className="min-h-screen bg-[#f3f6f3] flex items-center justify-center">
                <p className="text-gray-500 font-medium">
                    ক্যাটাগরি পাওয়া যায়নি!
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f3f6f3] py-6 px-3 sm:px-4 lg:px-6">
            <div className="max-w-[1020px] mx-auto space-y-4 sm:space-y-5">

                {/* CATEGORY HEADER CARD */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm flex items-center gap-3.5 sm:gap-4">

                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl sm:text-3xl shrink-0">
                        <span>{category.icon}</span>
                    </div>

                    <div>
                        <h1 className="text-lg sm:text-2xl font-bold text-gray-900 leading-tight">
                            {category.nameBn}
                        </h1>

                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
                        </p>
                    </div>

                </div>

                {/* PRODUCT SORT + GRID */}
                <ProductGrid products={products} />

            </div>
        </div>
    );
}