"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/app/images/logo.png";
import { useSession, signOut } from "@/lib/auth-client";

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);
  const { data: session, isPending } = useSession();

  async function handleSignOut() {
    setIsSigningOut(true);
    setSignOutError(null);

    try {
      const { error } = await signOut();

      if (error) {
        setSignOutError(
          error.message ?? "Sign out failed. Please try again.",
        );
        return;
      }

      setOpen(false);
    } catch (error) {
      setSignOutError(
        error instanceof Error ? error.message : "Sign out failed. Please try again.",
      );
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 sm:px-6">
      {/* Floating Container Matching Image Design */}
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-zinc-900/80 px-4 backdrop-blur-md sm:px-6">
        <nav
          aria-label="Main navigation"
          className="flex h-16 items-center justify-between"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setOpen(false)}
          >
            <Image src={logo} alt="HireLoop" className="h-7 w-auto" priority />
          </Link>

          {/* Right/Center Navigation & Action Buttons */}
          <div className="hidden items-center gap-8 md:flex">
            {/* Nav Links */}
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Vertical Divider */}
            <div className="h-4 w-[1px] bg-white/20" aria-hidden="true" />

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              {isPending ? null : session ? (
                <>
                  <span className="text-sm font-medium text-zinc-300">
                    Hi, {session.user.name}
                  </span>
                  <Button
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                  >
                    {isSigningOut ? "Signing out..." : "Sign Out"}
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-opacity hover:opacity-90"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-300 hover:bg-white/10 hover:text-white md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </nav>

        {signOutError && (
          <p className="pb-3 text-sm text-red-400" role="alert">
            {signOutError}
          </p>
        )}

        {/* Mobile Menu Dropdown */}
        {open && (
          <div
            id="mobile-menu"
            className="border-t border-white/10 py-4 md:hidden"
          >
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-base font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
              {isPending ? null : session ? (
                <>
                  <span className="px-4 py-2 text-sm font-medium text-zinc-300">
                    Hi, {session.user.name}
                  </span>
                  <Button
                    className="w-full rounded-md px-4 py-2 text-left text-indigo-400 hover:bg-white/10 hover:text-indigo-300"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                  >
                    {isSigningOut ? "Signing out..." : "Sign Out"}
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="w-full rounded-md px-4 py-2 text-left text-indigo-400 hover:bg-white/10 hover:text-indigo-300"
                    onClick={() => setOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-center text-sm font-medium text-white shadow-lg shadow-indigo-500/20 hover:from-blue-500 hover:to-indigo-500"
                    onClick={() => setOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
