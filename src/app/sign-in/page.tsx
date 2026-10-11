
"use client";

import React from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";




import {
    Button,
    FieldError,
    FieldGroup,
    Fieldset,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";

const SignInPage = () => {
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const user = Object.fromEntries(formData.entries()) as {
            email: string;
            password: string;
        };

        try {
            const { data, error } = await authClient.signIn.email({
                email: user.email,
                password: user.password,
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message || "সাইন ইন করা যায়নি!");
                console.log(error);
                return;
            }

            if (data) {
                toast.success("সফলভাবে সাইন ইন হয়েছে!");
            }
        } catch (error) {
            console.error(error);
            toast.error("কিছু একটা সমস্যা হয়েছে!");
        }
    };

    const handleSocialSignIn = async (
        provider: "google" | "github"
    ) => {
        try {
            const { data, error } = await authClient.signIn.social({
                provider,
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message || "সাইন ইন করা যায়নি!");
            } else if (data) {
                toast.success("সফলভাবে সাইন ইন হয়েছে!");
            }
        } catch (error) {
            console.error(error);
            toast.error("কিছু একটা সমস্যা হয়েছে!");
        }
    };

    return (
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-5 sm:py-3">
            <div className="mx-auto w-full max-w-[506px]">

                {/* Heading */}
                <header className="mb-7 text-center">
                    <h1 className="text-2xl font-bold text-[#202820] sm:text-[28px]">
                        সাইন ইন
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-[#697269] sm:text-base">
                        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                    </p>
                </header>

                {/* Sign In Card */}
                <div className="rounded-[18px] border border-[#dfe7df] bg-[#fafcfb] p-5 sm:p-[29px]">
                    <Form onSubmit={onSubmit} className="w-full">
                        <Fieldset className="w-full">
                            <FieldGroup className="gap-5">

                                {/* Email */}
                                <TextField
                                    isRequired
                                    name="email"
                                    type="email"
                                    className="w-full"
                                >
                                    <Label className="text-sm font-medium text-[#303a32] sm:text-base">
                                        ইমেইল
                                    </Label>

                                    <Input
                                        placeholder="you@example.com"
                                        className="mt-2 w-full rounded-[10px] border border-[#dfe7df] bg-transparent px-3 py-3 text-sm sm:text-base"
                                    />

                                    <FieldError />
                                </TextField>

                                {/* Password */}
                                <TextField
                                    isRequired
                                    name="password"
                                    type="password"
                                    className="w-full"
                                >
                                    <Label className="text-sm font-medium text-[#303a32] sm:text-base">
                                        পাসওয়ার্ড
                                    </Label>

                                    <Input
                                        placeholder="কমপক্ষে ৮ অক্ষর"
                                        className="mt-2 w-full rounded-[10px] border border-[#dfe7df] bg-transparent px-3 py-3 text-sm sm:text-base"
                                    />

                                    <FieldError />
                                </TextField>
                            </FieldGroup>

                            {/* Sign In Button */}
                            <Fieldset.Actions className="mt-5 w-full">
                                <Button
                                    type="submit"
                                    className="w-full rounded-[10px] bg-[#07883e] py-3 text-sm font-semibold text-white shadow-[0_3px_4px_rgba(0,0,0,0.2)] transition hover:bg-[#067534] sm:text-base"
                                >
                                    সাইন ইন
                                </Button>
                            </Fieldset.Actions>
                        </Fieldset>
                    </Form>

                    {/* Divider */}
                    <div className="my-5 flex items-center gap-4">
                        <div className="h-[2px] flex-1 bg-[#e4e8e4]" />

                        <span className="text-sm text-[#454d45]">
                            অথবা
                        </span>

                        <div className="h-[2px] flex-1 bg-[#e4e8e4]" />
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">

                        <Button
                            type="button"
                            variant="secondary"
                            onPress={() => handleSocialSignIn("google")}
                            className="flex w-full flex-row items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-gray-300 bg-transparent px-2 py-3 text-sm font-semibold text-[#303a32] transition hover:bg-gray-100"
                        >
                            <FcGoogle className="h-5 w-5 shrink-0" />
                            <span className="whitespace-nowrap">
                                Google দিয়ে চালিয়ে যান
                            </span>
                        </Button>



                        <Button
                            type="button"
                            variant="secondary"
                            onPress={() => handleSocialSignIn("github")}
                            className="flex w-full items-center justify-center gap-2 rounded-[10px] border border-[#dfe7df] bg-transparent px-2 py-3 text-xs font-semibold text-[#303a32] transition hover:bg-gray-100 sm:text-sm"
                        >
                            <FaGithub className="h-[18px] w-[18px] shrink-0" />
                            GitHub দিয়ে চালিয়ে যান
                        </Button>

                    </div>

                    {/* Sign Up Link */}
                    <p className="mt-5 text-center text-sm text-[#414941] sm:text-base">
                        অ্যাকাউন্ট নেই?{" "}
                        <Link
                            href="/sign-up"
                            className="font-medium text-green-700 hover:underline"
                        >
                            সাইন আপ করুন
                        </Link>
                    </p>
                </div>

                {/* Back Home */}
                <div className="mt-7 text-center">
                    <Link
                        href="/"
                        className="text-sm text-gray-500 transition hover:text-green-700 sm:text-base"
                    >
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default SignInPage;
