"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TweetCard from "@/components/TweetCard";
import {useAuth} from "@/context/AuthContext";

export default function HomePage() {

  const { user, login, logout } = useAuth();
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

    await fetch("/api/tweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    setText("");
    getTweets();
  }



  return (
    <main>
      <h1>📝 Latest Tweets</h1>

      <div style={{ margin: "20px 0", padding: "10px", border: "2px solid red" }}>
        {user ? (
          <div>
            <p>Logged in as {user.name}</p>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <button onClick={login}>Login</button>
        )}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's happening?"
      />

      <button onClick={createTweet}>Tweet</button>

      {tweets.map((tweet) => (
        <Link key={tweet._id} href={`/tweet/${tweet._id}`}>
          <TweetCard tweet={tweet} />
        </Link>
      ))}
    </main>
  );
}