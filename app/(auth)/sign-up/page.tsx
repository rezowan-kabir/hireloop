"use client";

import { authClient } from "@/lib/auth-client";
import { ROLES, ROLE_LABELS, type Role } from "@/lib/roles";
import Link from "next/link";
import type { FormEvent } from "react";

export default function SignUpPage() {
  //TODO: Form submit hole ei function-ti kaj korbe
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    //* Form theke data gulo niye nicchi
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    // Radio group-er check kora role-ta; kono ta na thakle "seeker"
    const role = (formData.get("role") ?? "seeker") as Role;

    //! Better-auth diye sign up call korlam
    //? Better-auth diye sign up call korlam
    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      role,
      callbackURL: "/", // Sign up-er por kothay redirect hobe
    });

    if (error) {
      console.error("Sign up error:", error.message);
    } else {
      console.log("Sign up successful:", data);
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-8 text-white shadow-xl">
        <h1 className="text-2xl font-semibold">Create your account</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Join HireLoop and start finding your dream job.
        </p>

        {/* Form-er modhe handleSubmit set kora hoyeche */}
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

          <fieldset className="space-y-2 text-sm font-medium">
            <legend>I am a...</legend>
            <div className="grid grid-cols-3 gap-2">
              {ROLES.map((role) => (
                <label
                  key={role}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/15 bg-zinc-950 px-3 py-2.5 text-center font-normal text-white transition-colors has-[:checked]:border-indigo-400 has-[:checked]:bg-indigo-600/20"
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    defaultChecked={role === "seeker"}
                    className="size-3.5 accent-indigo-500"
                  />
                  {ROLE_LABELS[role]}
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-indigo-500"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          {/* Link theke onSubmit remove kore dewa hoyeche */}
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
