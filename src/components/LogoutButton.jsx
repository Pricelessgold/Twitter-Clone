"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth();

  async function handleLogout() {
    await logout();

    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      style={{ cursor: "pointer" }}
      className="hover:text-blue-300"
    >
      Logout
    </button>
  );
}