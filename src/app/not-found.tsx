import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-white px-6 py-16">
      <div className="max-w-xl text-center">
        <p className="text-8xl font-extrabold text-green-800">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
          দুঃখিত! পেজটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mt-4 leading-7 text-gray-500">
          আপনি যে লিংকটি অনুসরণ করেছেন, সেটি হয়তো ভুল
          হয়েছে অথবা পেজটি সরিয়ে ফেলা হয়েছে।
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}