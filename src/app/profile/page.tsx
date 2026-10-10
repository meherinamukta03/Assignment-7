"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";

export default function ProfilePage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [signingOut, setSigningOut] = useState(false);

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f0f5f0]">
                <p className="text-gray-500">লোড হচ্ছে...</p>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    const user = session.user;
    const firstName = user.name
        ? user.name.split(" ")[0]
        : "ইউজার";

    const handleSignOut = async () => {
        setSigningOut(true);

        try {
            const { error } = await authClient.signOut();

            if (error) {
                toast.error("সাইন আউট করা যায়নি!");
                return;
            }

            toast.success("সফলভাবে সাইন আউট করা হয়েছে!");
            router.replace("/");
        } catch (error) {
            console.error(error);
            toast.error("সাইন আউট করতে সমস্যা হয়েছে!");
        } finally {
            setSigningOut(false);
        }
    };

    const handleUpdate = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const trimmedName = name.trim();

        if (!trimmedName) {
            toast.error("আপনার নাম লিখুন!");
            return;
        }

        setLoading(true);

        try {
            const { error } = await authClient.updateUser({
                name: trimmedName,
            });

            if (error) {
                toast.error(
                    error.message || "প্রোফাইল আপডেট করা যায়নি!"
                );
                return;
            }

            toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
            setName("");
            await authClient.getSession();
        } catch (error) {
            console.error(error);
            toast.error("কিছু একটা সমস্যা হয়েছে!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-8">
            <div className="mx-auto max-w-2xl space-y-6">

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        আমার প্রোফাইল
                    </h1>

                    <p className="mt-1 text-xs text-gray-500">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>

                {/* User Information Card */}
                <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#dfe7df] bg-white p-5 shadow-sm sm:flex-row sm:items-center">
                    <div className="flex min-w-0 items-center gap-4">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-gray-200">
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name || "Avatar"}
                                    fill
                                    sizes="56px"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-lg font-bold text-gray-600">
                                    {firstName.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>

                        <div className="min-w-0">
                            <h2 className="truncate text-base font-bold text-gray-900">
                                {user.name}
                            </h2>

                            <p className="truncate text-xs text-gray-500">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={signingOut}
                        className="flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-red-200 px-3.5 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                        <FiLogOut className="h-4 w-4" />

                        <span>
                            {signingOut
                                ? "সাইন আউট হচ্ছে..."
                                : "সাইন আউট"}
                        </span>
                    </button>
                </div>

                {/* Edit Profile Form */}
                <div className="rounded-2xl border border-[#dfe7df] bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-sm font-bold text-gray-800">
                        তথ্য পরিবর্তন
                    </h3>

                    <form
                        onSubmit={handleUpdate}
                        className="space-y-4"
                    >
                        <div className="ml-4 sm:ml-8">
                            <label
                                htmlFor="profile-name"
                                className="mb-1.5 block text-xs font-bold text-black"
                            >
                                নাম
                            </label>

                            <input
                                id="profile-name"
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                className="w-full rounded-xl border border-[#dfe7df] bg-transparent px-3.5 py-2.5 text-xs text-gray-800 focus:border-green-600 focus:outline-none"
                                placeholder="আপনার নাম লিখুন"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-[#07883e] py-3 text-xs font-semibold text-white shadow transition hover:bg-[#067534] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? "আপডেট হচ্ছে..."
                                : "আপডেট"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}