
import Hero from "./home/Hero";
import ProductCard from "./components/ProductCard";

import PriceIncreased from "./home/PriceIncreased";
// import { FiArrowUp, } from "react-icons/fi";
// import { FiArrowDown } from "react-icons/fi";
import PriceDecresed from "./home/PriceDecresed";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

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
    slug: string;
}

async function getProducts(): Promise<Product[]> {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/products"
    );

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }
    const data = await res.json()
    return data
}


export default async function Home() {
    const products = await getProducts();
    return (
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">

            <Hero />

            {/* দাম বেড়েছে */}
            <section id="দাম বেড়েছে" className="scroll-mt-20 mt-8">
                <div className="mb-4 flex items-center gap-2">
                    <FaCaretUp className="text-red-500
                    shrink-0 text-2xl size={30} "/>

                    <h2 className="text-2xl font-bold leading-tight tracking-tight text-[#1A1A1A]">
                        আজ দাম বেড়েছে
                    </h2>
                </div>

                <PriceIncreased products={products} />
            </section>

            <section id="দাম-কমেছে" className="scroll-mt-20 mt-8">
                <div className="mb-4 flex items-center gap-2">
                    <FaCaretDown className="text-green-500 text-3xl shrink-0 size={40}" />

                    <h2 className="text-2xl font-bold leading-tight tracking-tight text-[#1A1A1A]">
                        আজ দাম কমেছে
                    </h2>
                </div>

                <PriceDecresed products={products} />
            </section>






            {/* সব পণ্য */}
            <section id="সব-পণ্য" className="scroll-mt-20 mt-8 w-full">
                <h2 className="text-2xl font-bold leading-tight tracking-tight text-[#1A1A1A]">
                    সব পণ্য
                </h2>

                <p className="mt-3 leading-relaxed text-gray-600 sm:text-base md:text-lg">
                    মোট {products.length} পণ্য দেখানো হচ্ছে
                </p>

               <div className="mt-3 grid w-full grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </section>

        </div>
    );
}
