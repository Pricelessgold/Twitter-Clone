"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TweetCard from "@/components/TweetCard";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { user } = useAuth();

  const [text, setText] = useState("");
  const [tweets, setTweets] = useState([]);

  async function getTweets() {
    const res = await fetch("/api/tweets");
    const data = await res.json();
    setTweets(data);
  }

  useEffect(() => {
    getTweets();
  }, []);

  async function createTweet() {
    if (!text.trim()) return;

    const res = await fetch("/api/tweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Could not create tweet");
      return;
    }

    setText("");
    getTweets();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        {user ? (
          <section className="mb-12 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold">
                {user.username?.charAt(0).toUpperCase()}
              </div>

              <p className="text-slate-300">
                Posting as{" "}
                <span className="font-bold text-white">@{user.username}</span>
              </p>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's happening?"
              className="h-32 w-full resize-none rounded-xl border border-slate-700 bg-slate-800 p-4 text-white outline-none focus:border-blue-500"
            />

            <button
              onClick={createTweet}
              className="mt-4 rounded-full bg-blue-600 px-8 py-3 font-bold hover:bg-blue-700"
            >
              Tweet
            </button>
          </section>
        ) : (
          <section className="mb-12 rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center shadow-lg">
            <h2 className="text-2xl font-bold">Login to create tweets</h2>

            <p className="mt-2 text-slate-400">
              You need an account before posting.
            </p>

            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="/login"
                className="rounded-full bg-blue-600 px-6 py-3 font-bold hover:bg-blue-700"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-full border border-slate-700 px-6 py-3 font-bold hover:bg-slate-800"
              >
                Sign Up
              </Link>
            </div>
          </section>
        )}

        <section>
          <h1 className="mb-8 text-center text-4xl font-bold">
            📝 Latest Tweets
          </h1>

          <div className="space-y-4">
            {tweets.map((tweet) => (
              <Link
                key={tweet._id}
                href={`/tweet/${tweet._id}`}
                className="block"
              >
                <TweetCard tweet={tweet} />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}