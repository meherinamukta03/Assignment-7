import React from 'react';
import ProductCard, { type Product } from "../components/ProductCard";
interface Props {
    products: Product[];
}

const PriceDecresed = ({ products }: Props) => {
    const increasedProducts = products
            .filter((product) => product.change.dir === "down")
           .sort((a, b) => a.change.pct - b.change.pct)
            .slice(0, 6);
    
        return (
           <div className="mt-3 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {increasedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        );
};

export default PriceDecresed;