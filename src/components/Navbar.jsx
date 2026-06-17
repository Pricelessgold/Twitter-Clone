"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="w-full border-b border-slate-800 bg-slate-900 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
        <Link href="/" className="text-2xl font-bold">
          Twitter Clone
        </Link>

        <div className="flex items-center gap-6 text-base font-medium">
          <Link href="/"
          className="hover:text-blue-300">Home</Link>

          {user ? (
            <>
              <Link href="/profile" className="hover:text-blue-300">
                Profile
              </Link>
              <Link
                href="/profile"
                style={{ cursor: "pointer" }}
                className="hover:text-blue-300"
              >
                @{user.username}
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}