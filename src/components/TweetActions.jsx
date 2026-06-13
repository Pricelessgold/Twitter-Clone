"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TweetActions({ tweet }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(tweet.text);

  async function updateTweet() {
    const res = await fetch(`/api/tweets/${tweet._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Could not update tweet");
      return;
    }

    setIsEditing(false);
    router.refresh();
  }

  async function deleteTweet() {
    const confirmed = confirm("Are you sure you want to delete this tweet?");

    if (!confirmed) return;

    const res = await fetch(`/api/tweets/${tweet._id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Could not delete tweet");
      return;
    }

    router.push("/");
    router.refresh();
  }

  if (isEditing) {
    return (
      <div className="mt-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="h-28 w-full rounded-xl border border-slate-700 bg-slate-800 p-4 text-white outline-none focus:border-blue-500"
        />

        <div className="mt-3 flex gap-3">
          <button
            onClick={updateTweet}
            className="rounded-full bg-blue-600 px-5 py-2 font-bold hover:bg-blue-700"
          >
            Save
          </button>

          <button
            onClick={() => setIsEditing(false)}
            className="rounded-full border border-slate-700 px-5 py-2 font-bold hover:bg-slate-800"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 flex gap-3">
      <button
        onClick={() => setIsEditing(true)}
        className="rounded-full bg-slate-700 px-5 py-2 font-bold hover:bg-slate-600"
      >
        Edit
      </button>

      <button
        onClick={deleteTweet}
        className="rounded-full bg-red-600 px-5 py-2 font-bold hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
}