
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
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি!");
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
              className="flex w-full items-center justify-center gap-2 rounded-[10px] border border-[#dfe7df] bg-transparent px-2 py-3 text-xs font-semibold text-[#303a32] transition hover:bg-gray-100 sm:text-sm"
            >
              <svg
                viewBox="0 0 48 48"
                className="h-[18px] w-[18px] shrink-0"
                aria-hidden="true"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                  transform="translate(0 4)"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.92 46.98 31.7 46.98 24.55Z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.94 23.94 0 0 0 0 21.56l7.98-6.19Z"
                  transform="translate(0 4)"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.44-4.89 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                  transform="translate(0 -4)"
                />
              </svg>

              Google দিয়ে চালিয়ে যান
            </Button>

            <Button
              type="button"
              variant="secondary"
              onPress={() => handleSocialSignIn("github")}
              className="flex w-full items-center justify-center gap-2 rounded-[10px] border border-[#dfe7df] bg-transparent px-2 py-3 text-xs font-semibold text-[#303a32] transition hover:bg-gray-100 sm:text-sm"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-[18px] w-[18px] shrink-0"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.77 2.5 4.32 1.76.1-.72.4-1.22.72-1.5-2.5-.28-5.13-1.25-5.13-5.54 0-1.22.44-2.22 1.16-3-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.13-1.45 3.08-1.15 3.08-1.15.61 1.55.23 2.69.11 2.98.72.78 1.16 1.78 1.16 3 0 4.3-2.63 5.25-5.14 5.53.41.36.77 1.03.77 2.08v3.08c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />
              </svg>

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
