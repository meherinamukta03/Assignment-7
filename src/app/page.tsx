import Image from "next/image";
import Hero from "./home/Hero";
import ProductCard from "./components/ProductCard";


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
const data=await res.json()
return data
}


export default async function Home() {
     const products = await getProducts();
  return (
   <div>

    <Hero></Hero>







    <section id="সব-পণ্য" className="scroll-mt-20 mx-auto w-full max-w-[1020px]">
    <h2 className="text-2xl font-bold leading-tight tracking-tight text-[#1A1A1A] sm:text-1xl lg:text-2xl">সব পণ্য</h2>
    <p className=" mt-3 leading-relaxed text-gray-600 sm:text-base md:text-lg"> মোট {products.length} পণ্য দেখানো হচ্ছে</p>
    <div className="mt-3 mx-auto w-full max-w-[1020px] grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">


      {products.map(product=><ProductCard key={product.id} product={product}></ProductCard>)}
    </div>
</section>
   </div>
  );
}
