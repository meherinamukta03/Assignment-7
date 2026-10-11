
import Link from "next/link";
import Image from "next/image";
import {
    ChevronRightIcon,
    MinusIcon,
    ArrowLeftIcon,
    BanknotesIcon,
    MapPinIcon,
} from "@heroicons/react/24/outline";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
type Market = {
    id?: string | number;
    name?: string;
    market?: string;
    marketName?: string;
    division?: string;
    min: number | string;
    max: number | string;
};

type Product = {
    id: string | number;
    slug: string;
    nameBn: string;
    category?: string;
    categoryNameBn?: string;
    categoryIcon?: string;
    image?: string;
    unit: string;
    today: number | string;
    yesterday: number | string;
    markets?: Market[];
};

type PageProps = {
    params: Promise<{ slug: string }>;
};

async function getProductData(slug: string): Promise<Product | null> {
    try {
        const res = await fetch(
            "https://api.abcz.workers.dev/api/bazardor/products",
            { cache: "no-store" }
        );

        if (!res.ok) return null;

        const data = await res.json();

        const products: Product[] = Array.isArray(data)
            ? data
            : data.products ?? [];

        return products.find((product) => product.slug === slug) ?? null;
    } catch (error) {
        console.error("Product fetch error:", error);
        return null;
    }
}


function getUnitText(unit: string) {
    switch (unit.toLowerCase()) {
        case "kg":
            return "কেজি";
        case "gram":
        case "g":
            return "গ্রাম";
        case "litre":
        case "liter":
        case "l":
            return "লিটার";
        case "ml":
            return "মিলিলিটার";
        case "dozen":
            return "ডজন";
        case "piece":
        case "pcs":
            return "পিস";
        default:
            return unit;
    }
}



function formatPrice(price: number | string) {
    return Number(price).toLocaleString("bn-BD", {
        maximumFractionDigits: 2,
    });
}

export default async function ProductDetailsPage({ params }: PageProps) {
    const { slug } = await params;
    const product = await getProductData(slug);

    if (!product) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center bg-[#f0f5f0] px-4 text-center">
                <h1 className="text-xl font-bold text-[#28352b]">
                    পণ্যটি খুঁজে পাওয়া যায়নি।
                </h1>

                <Link
                    href="/"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm text-white hover:bg-green-800"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    হোমে ফিরে যান
                </Link>
            </main>
        );
    }

    const today = Number(product.today);
    const yesterday = Number(product.yesterday);

    const change = yesterday
        ? ((today - yesterday) / yesterday) * 100
        : 0;

    const markets = product.markets ?? [];

    const minPrice = markets.length
        ? Math.min(...markets.map((market) => Number(market.min)))
        : today;

    const maxPrice = markets.length
        ? Math.max(...markets.map((market) => Number(market.max)))
        : today;

    const avgPrice = markets.length
        ? markets.reduce(
            (sum, market) =>
                sum +
                (Number(market.min) + Number(market.max)) / 2,
            0
        ) / markets.length
        : today;

    const priceCards = [
        {
            title: "সর্বনিম্ন দাম",
            price: minPrice,
            subtitle: "সবচেয়ে কম দামের বাজার",
            color: "text-emerald-600",
        },
        {
            title: "সর্বোচ্চ দাম",
            price: maxPrice,
            subtitle: "সবচেয়ে বেশি দামের বাজার",
            color: "text-red-600",
        },
        {
            title: "গড় দাম",
            price: avgPrice,
            subtitle: `প্রতি ${getUnitText(product.unit)} হিসাবে`,
            color: "text-green-700",
        },
    ];

    return (
        <main className="min-h-screen bg-[#f0f5f0] px-3 pb-8 pt-4 text-[#263229] sm:px-5 lg:px-6">
            <div className="mx-auto max-w-7xl">
                {/* Breadcrumb */}
                <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-gray-500 sm:text-sm">
                    <Link href="/" className="hover:text-green-700">
                        হোম
                    </Link>

                    <ChevronRightIcon className="h-3.5 w-3.5" />

                    <Link
                        href={`/category/${product.category}`}
                        className="hover:text-green-700"
                    >
                        {product.categoryNameBn}
                    </Link>

                    <ChevronRightIcon className="h-3.5 w-3.5" />

                    <span className="font-medium text-gray-700">
                        {product.nameBn}
                    </span>
                </nav>

                {/* Product Header */}
                <section className="rounded-2xl border border-[#e2eae2] bg-[#fbfdfb] p-4 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f0f5f0] text-3xl sm:h-20 sm:w-20">
                                {product.image?.startsWith("http") ? (
                                    <Image
                                        src={product.image}
                                        alt={product.nameBn}
                                        fill
                                        sizes="80px"
                                        className="object-cover"
                                    />
                                ) : (
                                    product.image ||
                                    product.categoryIcon

                                )}
                            </div>

                            <div className="min-w-0">
                                <h1 className="text-xl font-bold sm:text-2xl">
                                    {product.nameBn}
                                </h1>

                                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                                    প্রতি {getUnitText(product.unit)} ·{" "}
                                    {product.categoryNameBn ?? "বাজারদর"}
                                </p>

                                <p className="mt-2 text-xs text-gray-600 sm:text-sm">
                                    গতকালের তুলনায় আজ দাম{" "}
                                    {change > 0
                                        ? "বেড়েছে"
                                        : change < 0
                                            ? "কমেছে"
                                            : "অপরিবর্তিত"}
                                    : ৳ {formatPrice(yesterday)}
                                </p>
                            </div>
                        </div>

                        {/* Current Price */}
                        <div className="flex shrink-0 items-center justify-between gap-4 rounded-xl bg-[#f0f5f0] px-4 py-3 sm:min-w-[140px] sm:flex-col sm:items-center sm:justify-center">
                            <div className="sm:text-center">
                                <p className="text-xs text-gray-500">
                                    আজকের দাম
                                </p>

                                <p className="mt-1 text-2xl font-bold">
                                    ৳ {formatPrice(today)}
                                </p>

                                <p className="text-xs text-gray-500">
                                    টাকা / {getUnitText(product.unit)}
                                </p>
                            </div>

                            <p
                                className={`flex items-center gap-1 text-xs font-semibold ${change > 0? "text-red-600"
                                        : change < 0
                                            ? "text-emerald-600"
                                            : "text-gray-500"
                                    }`}
                            >
                                {change > 0 ? (
                                     
                                    <FaCaretUp  className="h-4 w-4" />
                                ) : change < 0 ? (
                                    <FaCaretDown className="h-4 w-4" />
                                ) : (
                                    <MinusIcon className="h-4 w-4" />
                                )}

                                {Math.abs(change).toFixed(2)}%
                            </p>
                        </div>
                    </div>
                </section>

                {/* Price Summary */}
                <section className="mt-4 rounded-2xl border border-[#e2eae2] bg-[#fbfdfb] p-4 sm:p-5">
                    <h2 className="mb-4 text-base font-bold">
                        দামের সারসংক্ষেপ
                    </h2>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {priceCards.map((card) => (
                            <div
                                key={card.title}
                                className="rounded-xl border border-[#e2eae2] bg-[#fbfdfb] p-4 transition hover:shadow-sm"
                            >
                                <p className="text-xs text-gray-600">
                                    {card.title}
                                </p>

                                <p
                                    className={`mt-1 text-xl font-bold ${card.color}`}
                                >
                                    ৳ {formatPrice(card.price)}
                                </p>

                                <p className="mt-2 text-[11px] text-gray-500">
                                    {card.subtitle}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Market Prices Table */}
                <section className="mt-4 rounded-2xl border border-[#e2eae2] bg-[#fbfdfb] p-4 sm:p-5">
                    <div className="mb-4 flex items-center gap-2">
                        <MapPinIcon className="h-5 w-5 text-green-700" />

                        <div>
                            <h2 className="text-base font-bold">
                                বাজারভিত্তিক আজকের দাম
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                বিভিন্ন বাজারে এই পণ্যের মূল্য
                            </p>
                        </div>
                    </div>

                    {markets.length > 0 ? (
                        <div className="overflow-x-auto rounded-xl border border-[#e2eae2]">
                            <table className="w-full min-w-[650px] border-collapse text-left text-xs sm:text-sm">
                                <thead className="bg-[#f0f5f0] text-gray-500">
                                    <tr>
                                        <th className="px-3 py-3 font-semibold sm:px-4">
                                            বাজার
                                        </th>

                                        <th className="px-3 py-3 font-semibold sm:px-4">
                                            বিভাগ
                                        </th>

                                        <th className="px-3 py-3 text-right font-semibold sm:px-4">
                                            সর্বনিম্ন
                                        </th>

                                        <th className="px-3 py-3 text-right font-semibold sm:px-4">
                                            সর্বোচ্চ
                                        </th>

                                        <th className="px-3 py-3 text-right font-semibold sm:px-4">
                                            গড়
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {markets.map((market, index) => {
                                        const marketAverage =
                                            (Number(market.min) +
                                                Number(market.max)) /
                                            2;

                                        return (
                                            <tr
                                                key={market.id ?? index}
                                                className={`border-t border-[#dce4dc] ${index % 2 === 0
                                                        ? "bg-[#fbfdfb]"
                                                        : "bg-[#f0f5f0]"
                                                    }`}
                                            >
                                                <td className="px-3 py-3 font-medium sm:px-4">
                                                    {market.market ??
                                                        market.name ??
                                                        market.marketName ??
                                                        "অজানা বাজার"}
                                                </td>

                                                <td className="px-3 py-3 text-gray-600 sm:px-4">
                                                    {market.division ?? "—"}
                                                </td>

                                                <td className="px-3 py-3 text-right font-medium sm:px-4">
                                                    ৳ {formatPrice(market.min)}
                                                </td>

                                                <td className="px-3 py-3 text-right font-medium sm:px-4">
                                                    ৳ {formatPrice(market.max)}
                                                </td>

                                                <td className="px-3 py-3 text-right font-semibold sm:px-4">
                                                    ৳ {formatPrice(marketAverage)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="rounded-xl bg-[#f0f5f0] px-4 py-8 text-center">
                            <BanknotesIcon className="mx-auto h-8 w-8 text-gray-400" />

                            <p className="mt-2 text-sm text-gray-500">
                                বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
