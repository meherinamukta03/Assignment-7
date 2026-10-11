
import {
    FaArrowUp,
    FaArrowDown,
    FaMinus,
} from "react-icons/fa";

import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Product {
    id: number;
    nameBn: string;
    unit: string;
    image: string;
    categoryIcon: string;
    today: number;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
}

async function getProducts(): Promise<Product[]> {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/products"
    );

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    const data = await res.json();

    if (Array.isArray(data)) return data;
    if (Array.isArray(data.products)) return data.products;
    if (Array.isArray(data.data)) return data.data;

    return [];
}

export default async function Marquee() {
    const products = await getProducts();
    const limitedProducts = products.slice(0, 40);

    if (limitedProducts.length === 0) {
        return null;
    }

    // Repeat the list so the next first item follows the last item.
    const repeatedProducts = [
        ...limitedProducts,
        ...limitedProducts,
    ];

    return (
        <div className="w-full overflow-hidden border-y border-gray-300 bg-white">
            <MarqueeText
                className="py-2"
                direction="right"
                duration={15}
            >
                {repeatedProducts.map((product, index) => (
                    <div
                        key={`${product.id}-${index}`}
                        className="mx-4 inline-flex shrink-0 items-center gap-2 whitespace-nowrap"
                    >
                        <span className="shrink-0 text-xl">
                            {product.image || product.categoryIcon}
                        </span>

                        <span className="font-semibold text-gray-900">
                            {product.nameBn}
                        </span>

                        <span className="font-medium text-gray-800">
                            {product.today.toLocaleString("bn-BD")} টাকা/
                            
                            {product.unit === "kg"
                                ? "কেজি"
                                : product.unit === "litre"
                                    ? "লিটার"
                                    : product.unit === "dozen"
                                        ? "ডজন"
                                        : product.unit === "piece"
                                            ? "পিস"
                                            : product.unit}
                            
                        </span>

                        <span
                            className={`inline-flex shrink-0 items-center gap-1 ${product.change?.dir === "up"
                                    ? "text-green-600"
                                    : product.change?.dir === "down"
                                        ? "text-red-600"
                                        : "text-gray-500"
                                }`}
                        >
                            {product.change?.dir === "up" ? (
                                <FaArrowUp />
                            ) : product.change?.dir === "down" ? (
                                <FaArrowDown />
                            ) : (
                                <FaMinus />
                            )}

                            <span>
                                {Math.abs(product.change?.pct ?? 0).toLocaleString("bn-BD")}%
                            </span>
                        </span>

                        <span className="ml-3 h-6 shrink-0 border-r border-gray-300" />
                    </div>
                ))}
            </MarqueeText>
        </div>
    );
}
