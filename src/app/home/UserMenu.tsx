"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { FiUser, FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";

export default function UserMenu() {
    const { data: session, isPending } = authClient.useSession();

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Dropdown-er baire click korle close hobe
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Session load howar somoy
    if (isPending) {
        return (
            <div className="h-8 w-20 animate-pulse rounded bg-gray-200" />
        );
    }

    const user = session?.user;

    // Login na korle
    if (!user) {
        return (
            <div className="flex items-center gap-3">
                <Link
                    href="/sign-in"
                    className="text-xs font-semibold text-gray-700 hover:text-green-700 sm:text-sm"
                >
                    সাইন ইন
                </Link>

                <Link
                    href="/sign-up"
                    className="rounded-lg bg-[#07883e] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#067534] sm:text-sm"
                >
                    সাইন আপ
                </Link>
            </div>
        );
    }

    const firstName = user.name
        ? user.name.split(" ")[0]
        : "ইউজার";

    // Sign out

async function handleSignOut() {
    try {
        const result = await authClient.signOut();

        if (result.error) {
            toast.error("সাইন আউট করা যায়নি!");
            return;
        }

        toast.success("সফলভাবে সাইন আউট হয়েছে!");

        window.location.href = "/";
    } catch {
        toast.error("সাইন আউট করার সময় সমস্যা হয়েছে!");
    }
}

    return (
        <div className="relative" ref={dropdownRef}>
            {/* User profile button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-xl p-1 hover:bg-gray-100"
            >
                <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-gray-200">
                    {user.image ? (
                        <Image
                            src={user.image}
                            alt={user.name || "User Avatar"}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center font-bold text-gray-600">
                            {firstName.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                <span className="text-xs font-semibold text-gray-800 sm:text-sm">
                    {firstName}
                </span>

                <span className="text-[10px] text-gray-500">▼</span>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-gray-100 bg-white p-3 shadow-xl">
                    <div className="mb-2 border-b border-gray-100 px-1 pb-2.5">
                        <p className="text-xs font-bold text-gray-900">
                            {user.name}
                        </p>

                        <p className="truncate text-[11px] text-gray-500">
                            {user.email}
                        </p>
                    </div>

                    <Link
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-gray-700 hover:bg-gray-50"
                    >
                        <FiUser className="h-4 w-4" />
                        আমার প্রোফাইল
                    </Link>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs text-red-600 hover:bg-red-50"
                    >
                        <FiLogOut className="h-4 w-4" />
                        সাইন আউট
                    </button>
                </div>
            )}
        </div>
    );
}