"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import type { FormEvent } from "react";

export default function SignUpPage() {
  // Placeholder: collects the form data only.
  // TODO: integrate auth later — e.g. signUp.email({ name, email, password }) from "@/lib/auth-client".
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    console.log("sign-up form data:", data);
  }
  const handleSignUp = async () =>{
    const { data, error } = await authClient.signUp.email({
      name: "John Doe", // required, The name of the user.
      email: "john.doe@example.com", // required, The email address of the user.
      password: "password1234", // required, The password of the user. It should be at least 8 characters long and max 128 by default.
      image: "https://example.com/image.png", // An optional profile image of the user.
      callbackURL: "https://example.com/callback", // An optional URL to redirect to after the user signs up.
    });
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-8 text-white shadow-xl">
        <h1 className="text-2xl font-semibold">Create your account</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Join HireLoop and start finding your dream job.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block space-y-2 text-sm font-medium">
            Name
            <input
              type="text"
              name="name"
              autoComplete="name"
              required
              className="w-full rounded-lg border border-white/15 bg-zinc-950 px-3 py-2.5 text-white outline-none focus:border-indigo-400"
            />
          </label>

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
              autoComplete="new-password"
              required
              className="w-full rounded-lg border border-white/15 bg-zinc-950 px-3 py-2.5 text-white outline-none focus:border-indigo-400"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-indigo-500"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
