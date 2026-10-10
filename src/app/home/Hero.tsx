



import Image from "next/image";

export default function Hero() {
   


    const today = new Date();

    const date = today.toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });


    return (
      <section className="mx-auto w-full max-w-[1020px] px-4 py-5 md:py-8">
            <div className=" flex flex-col items-center justify-between gap-8 overflow-hidden rounded-2xl border border-gray-100 bg-[#F8FAF7] p-5 sm:p-8 md:flex-row md:p-10 lg:p-12">

                {/* Left Content */}
                <div className="w-full flex-1 space-y-4 text-left">
                    {/* Eyebrow / Date */}
                    <div className="inline-block rounded-full bg-white  px-3.5 py-1 text-xs font-semibold text-[#2D7048] sm:text-sm">
                     {date}
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-[#1A1A1A] sm:text-4xl lg:text-5xl">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    {/* Subtitle */}
                    <p className="text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                        বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
                        দামের পরিবর্তন এক জায়গায়।
                    </p>

                    {/* Primary CTA Button */}
                    <div className="pt-2">
                        <a
                            href="#সব-পণ্য"
                            className="inline-flex items-center justify-center rounded-xl bg-[#008A45] px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#007339] hover:shadow-lg active:scale-95 sm:text-base"
                        >
                            সব পণ্য দেখুন
                        </a>
                    </div>
                </div>

                {/* Right Side Hero Image */}
                <div className="relative w-48 flex-shrink-0 sm:w-60 md:w-64 lg:w-80">
                    <Image
                        src="/bazar-hero.png"
                        alt="বাজারের ফলের ঝুড়ি"
                        width={400}
                        height={400}
                        priority
                        className="h-auto w-full object-contain"
                        sizes="(max-width: 640px) 192px, (max-width: 768px) 240px, (max-width: 1024px) 256px, 320px"
                    />
                </div>

            </div>
        </section>
    );
}
