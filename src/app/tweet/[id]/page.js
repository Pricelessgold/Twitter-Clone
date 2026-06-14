import VoteButtons from "@/components/VoteButtons";
import TweetActions from "@/components/TweetActions";
import Link from "next/link";
import { cookies } from "next/headers";
import { getUserFromToken } from "@/lib/auth";

async function getTweet(id) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/tweets/${id}`, {
    cache: "no-store",
  });
  
  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function TweetPage({ params }) {
  const { id } = await params;

  const tweet = await getTweet(id);

  if (!tweet) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
          <h1 className="text-2xl font-bold">Tweet not found</h1>

          <Link href="/" className="mt-4 block text-blue-400">
            ← Back to Feed
          </Link>
        </div>
      </main>
    );
  }

  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;
  const currentUser = getUserFromToken(authToken);

  const isOwner = currentUser?.id === tweet.author?._id;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-blue-400 hover:text-blue-300"
        >
          ← Back to Feed
        </Link>

        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 font-bold">
              {tweet.author?.username?.charAt(0).toUpperCase() || "U"}
            </div>

            <div>
              <p className="font-semibold">
                {tweet.author?.username || "Unknown User"}
              </p>

              <p className="text-sm text-slate-400">
                {tweet.createdAt
                  ? new Date(tweet.createdAt).toLocaleString()
                  : ""}
              </p>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-slate-200">
            {tweet.text}
          </p>

          <VoteButtons tweet={tweet} />

          {isOwner && <TweetActions tweet={tweet} />}
        </article>
      </div>
    </main>
  );
}