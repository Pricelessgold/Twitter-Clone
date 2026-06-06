"use client";

import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <main>
      <h1>Profile</h1>

      {user ? (
        <>
          <p>Name: {user.name}</p>
          <p>Username: {user.username}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>You passed middleware, but React user state has not been restored yet.</p>
      )}
    </main>
  );
}