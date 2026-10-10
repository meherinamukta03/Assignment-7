import React from "react";
import Link from "next/link";
import {

    FiMinus,
} from "react-icons/fi";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
export type Product = {
    id: string | number;
    slug: string;
    nameBn: string;
    unit: string;
    today: number;
    image?: string;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
};

interface ProductCardProps {
    product: Product;
}

function getUnitText(unit: string) {
    switch (unit) {
        case "kg":
            return "কেজি";
        case "litre":
            return "লিটার";
        case "dozen":
            return "ডজন";
        case "pcs":
            return "পিস";
        default:
            return unit;
    }
}

export default function ProductCard({ product }: ProductCardProps) {
    const changeType =
        product.change.dir === "up"
            ? "up"
            : product.change.dir === "down"
                ? "down"
                : "neutral";

    return (
        <Link
            href={`/products/${product?.slug}`}
            className="block rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-green-500 hover:shadow-md sm:p-5"
        >
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg">
                    <span>{product.image}</span>
                </div>

                <div>
                    <h2 className="text-sm font-bold leading-snug text-gray-900 sm:text-base">
                        {product.nameBn}
                    </h2>

                    <p className="mt-0.5 text-[11px] text-gray-500 sm:text-xs">
                        প্রতি {getUnitText(product.unit)}
                    </p>
                </div>
            </div>

            <div className="mt-5 flex items-end justify-between">
                <div>
                    <span className="mb-0.5 block text-[10px] text-gray-500 sm:text-[11px]">
                        আজকের দাম
                    </span>

                    <div className="flex items-baseline gap-1">
                        <span className="text-lg font-extrabold text-gray-900 sm:text-xl">
                            {product.today.toLocaleString("bn-BD")}
                        </span>

                        <span className="text-xs font-semibold text-gray-800 sm:text-sm">
                            টাকা
                        </span>
                    </div>
                </div>

                {changeType === "up" && (
                    <div className="flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-[10px] font-bold text-red-600 sm:text-xs">
                        <FaCaretUp className="text-red-500" />
                        <span>
                            {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                        </span>
                    </div>
                )}

                {changeType === "down" && (
                    <div className="flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600 sm:text-xs">
                        <FaCaretDown className="text-green-500" />
                        <span>
                            {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                        </span>
                    </div>
                )}

                {changeType === "neutral" && (
                    <div className="flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-[10px] font-bold text-gray-600 sm:text-xs">
                        <FiMinus />
                        <span>
                            {Math.abs(product.change.pct).toLocaleString("bn-BD", {
                                minimumFractionDigits: 1,
                                maximumFractionDigits: 1,
                            })}%
                        </span>
                    </div>
                )}
            </div>
        </Link>
    );
}