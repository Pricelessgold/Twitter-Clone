"use client";

import { useRouter } from "next/navigation";

export default function VoteButtons({ tweet }) {
  const router = useRouter();

  async function vote(type) {
    await fetch(`/api/tweets/${tweet._id}/vote`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type }),
    });

    router.refresh();
  }

  return (
    <div className="mt-6 flex gap-6 border-t border-slate-800 pt-4 text-slate-400">
      <button onClick={() => vote("upvote")}>👍 {tweet.upvotes}</button>
      <button onClick={() => vote("downvote")}>👎 {tweet.downvotes}</button>
    </div>
  );
}