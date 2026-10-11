"use client";

import { useState } from "react";
import ProductCard, { type Product } from "./ProductCard";

type ProductGridProps = {
    products: Product[];
};

const ProductGrid = ({ products }: ProductGridProps) => {
    const [sort, setSort] = useState("default");

    const sortedProducts = [...products].sort((a, b) => {
        if (sort === "low-high") {
            return Number(a.today) - Number(b.today);
        }

        if (sort === "high-low") {
            return Number(b.today) - Number(a.today);
        }

        return 0;
    });

    return (
        <div className="space-y-4">
            {/* SORT BAR */}
            <div className="flex items-center justify-end rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm sm:px-6">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-600 sm:text-sm">
                        সাজান
                    </span>

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="cursor-pointer rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="low-high">
                            দাম: কম থেকে বেশি
                        </option>
                        <option value="high-low">
                            দাম: বেশি থেকে কম
                        </option>
                    </select>
                </div>
            </div>

            {/* PRODUCT COUNT */}
            <p className="px-1 text-xs font-medium text-gray-500 sm:text-sm">
                মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
            </p>

           
           
            {/* RESPONSIVE PRODUCT GRID */}
            {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                    {sortedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            ) : (
                <p className="rounded-xl bg-white p-8 text-center text-gray-500">
                    এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
                </p>
            )}
            
        </div>
    );
};

export default ProductGrid;