
"use client";

import React from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

import {
  Button,
  FieldError,
  FieldGroup,
  Fieldset,
  Input,
  Label,
  TextField,
} from "@heroui/react";

const SignUpPage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    };

    if (user.password !== user.confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না!");
      return;
    }

    if (user.password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে!");
      return;
    }

    try {
      const { name, email, password } = user;

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        console.error("Sign Up Error:", error);
        console.error("Error Message:", error.message);
        console.error("Error Status:", error.status);
        console.error("Error Code:", error.code);

        toast.error(
          error.message || "অ্যাকাউন্ট তৈরি করা যায়নি!"
        );
        return;
      }

      if (data) {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
      }
    } catch (error) {
      console.error("Sign Up Exception:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "কিছু একটা সমস্যা হয়েছে!"
      );
    }
  };

  const handleSocialSignUp = async (
    provider: "google" | "github"
  ) => {
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        console.error("Social Sign Up Error:", error);
        toast.error(error.message || "সাইন আপ করা যায়নি!");
      }
    } catch (error) {
      console.error("Social Sign Up Exception:", error);
      toast.error("কিছু একটা সমস্যা হয়েছে!");
    }
  };

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-6">
      <div className="mx-auto w-full max-w-[355px]">
        {/* Heading */}
        <header className="mb-5 text-center">
          <h1 className="text-xl font-bold text-[#202820] sm:text-2xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-[11px] leading-5 text-gray-500 sm:text-xs">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </header>

        {/* Sign Up Card */}
        <div className="rounded-[14px] border border-[#dfe7df] bg-[#fafcfb] p-5">
          <form onSubmit={onSubmit} className="w-full">
            <Fieldset className="w-full">
              <FieldGroup className="gap-3.5">
                {/* Name */}
                <TextField
                  isRequired
                  name="name"
                  className="w-full"
                  validate={(value) =>
                    value.trim().length < 3
                      ? "নাম কমপক্ষে ৩ অক্ষরের হতে হবে"
                      : null
                  }
                >
                  <Label className="text-xs font-medium text-[#303a32]">
                    নাম
                  </Label>

                  <Input
                    autoComplete="name"
                    placeholder="যেমন: রহিম উদ্দিন"
                    className="mt-1.5 w-full rounded-[8px] border border-[#dfe7df] bg-transparent px-2.5 py-2 text-xs"
                  />

                  <FieldError />
                </TextField>

                {/* Email */}
                <TextField
                  isRequired
                  name="email"
                  type="email"
                  className="w-full"
                >
                  <Label className="text-xs font-medium text-[#303a32]">
                    ইমেইল
                  </Label>

                  <Input
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="mt-1.5 w-full rounded-[8px] border border-[#dfe7df] bg-transparent px-2.5 py-2 text-xs"
                  />

                  <FieldError />
                </TextField>

                {/* Password */}
                <TextField
                  isRequired
                  name="password"
                  type="password"
                  className="w-full"
                  validate={(value) =>
                    value.length < 8
                      ? "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে"
                      : null
                  }
                >
                  <Label className="text-xs font-medium text-[#303a32]">
                    পাসওয়ার্ড
                  </Label>

                  <Input
                    autoComplete="new-password"
                    placeholder="কমপক্ষে ৮ অক্ষর"
                    className="mt-1.5 w-full rounded-[8px] border border-[#dfe7df] bg-transparent px-2.5 py-2 text-xs"
                  />

                  <FieldError />
                </TextField>

                {/* Confirm Password */}
                <TextField
                  isRequired
                  name="confirmPassword"
                  type="password"
                  className="w-full"
                >
                  <Label className="text-xs font-medium text-[#303a32]">
                    পাসওয়ার্ড নিশ্চিত করুন
                  </Label>

                  <Input
                    autoComplete="new-password"
                    placeholder="আবার লিখুন"
                    className="mt-1.5 w-full rounded-[8px] border border-[#dfe7df] bg-transparent px-2.5 py-2 text-xs"
                  />

                  <FieldError />
                </TextField>
              </FieldGroup>

              {/* Create Account */}
              <Fieldset.Actions className="mt-3.5 w-full">
                <Button
                  type="submit"
                  className="w-full rounded-[8px] bg-[#07883e] py-2.5 text-xs font-semibold text-white shadow-[0_3px_4px_rgba(0,0,0,0.2)] transition hover:bg-[#067534]"
                >
                  অ্যাকাউন্ট তৈরি করুন
                </Button>
              </Fieldset.Actions>
            </Fieldset>
          </form>

          {/* Divider */}
          <div className="my-3.5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e1e6e1]" />

            <span className="text-[11px] text-gray-600">
              অথবা
            </span>

            <div className="h-px flex-1 bg-[#e1e6e1]" />
          </div>

          {/* Google and GitHub */}
          <div className="grid grid-cols-2 gap-1.5">
            <Button
              type="button"
              variant="secondary"
              onPress={() => handleSocialSignUp("google")}
              className="flex w-full items-center justify-center gap-1 rounded-[8px] border border-[#dfe7df] bg-transparent px-1 py-2 text-[9px] font-semibold text-[#303a32] hover:bg-gray-100 sm:text-[10px]"
            >
              <span className="text-sm font-bold text-[#4285F4]">
                G
              </span>
              Google দিয়ে চালিয়ে যান
            </Button>

            <Button
              type="button"
              variant="secondary"
              onPress={() => handleSocialSignUp("github")}
              className="flex w-full items-center justify-center gap-1 rounded-[8px] border border-[#dfe7df] bg-transparent px-1 py-2 text-[9px] font-semibold text-[#303a32] hover:bg-gray-100 sm:text-[10px]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 shrink-0"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.77 2.5 4.32 1.76.1-.72.4-1.22.72-1.5-2.5-.28-5.13-1.25-5.13-5.54 0-1.22.44-2.22 1.16-3-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.13-1.45 3.08-1.15 3.08-1.15.61 1.55.23 2.69.11 2.98.72.78 1.16 1.78 1.16 3 0 4.3-2.63 5.25-5.14 5.53.41.36.77 1.03.77 2.08v3.08c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />
              </svg>

              GitHub দিয়ে চালিয়ে যান
            </Button>
          </div>

          {/* Sign In Link */}
          <p className="mt-4 text-center text-[11px] text-[#414941]">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-green-700 hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        {/* Back Home */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-xs text-gray-500 transition hover:text-green-700"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
