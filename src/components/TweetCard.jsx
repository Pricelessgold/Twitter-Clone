export default function TweetCard({ tweet }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition hover:border-blue-500 hover:bg-slate-800">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
          {tweet.author?.username?.charAt(0).toUpperCase() || "U"}
        </div>

        <div>
          <p className="font-semibold text-white">
            {tweet.author?.username || "Unknown User"}
          </p>

          <p className="text-sm text-slate-400">
            @{tweet.author?.username || "unknown"} ·{" "}
            {tweet.createdAt
              ? new Date(tweet.createdAt).toLocaleString()
              : ""}
          </p>
        </div>
      </div>

      <p className="mb-5 text-lg leading-relaxed text-slate-200">
        {tweet.text}
      </p>

      <div className="flex gap-6 border-t border-slate-800 pt-4 text-slate-400">
        <span>👍 {tweet.upvotes}</span>
        <span>👎 {tweet.downvotes}</span>
      </div>
    </article>
  );
}
