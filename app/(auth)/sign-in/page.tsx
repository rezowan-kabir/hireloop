"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";

export default function SignInPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      const { error } = await authClient.signIn.email({ email, password });

      if (error) {
        setErrorMessage(error.message ?? "Unable to sign in. Please try again.");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to sign in. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-8 text-white shadow-xl">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Sign in to continue to HireLoop.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {errorMessage && (
            <p className="text-sm text-red-400" role="alert">
              {errorMessage}
            </p>
          )}
          <label className="block space-y-2 text-sm font-medium">
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-white/15 bg-zinc-950 px-3 py-2.5 text-white outline-none focus:border-indigo-400"
            />
          </label>

          <label className="block space-y-2 text-sm font-medium">
            Password
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-white/15 bg-zinc-950 px-3 py-2.5 text-white outline-none focus:border-indigo-400"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-indigo-500"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
          >
            Sign up
          </Link>
        </p>
      </section>
    </main>
  );
}
