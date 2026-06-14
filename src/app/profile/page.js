import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

async function getProfileData() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) return null;

  const res = await fetch(`${baseUrl}/api/auth/me`, {
    headers: {
      Cookie: `authToken=${authToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.user;
}

async function getUserTweets() {
  const res = await fetch(`${baseUrl}/api/tweets`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return res.json();
}

export default async function ProfilePage() {
  const user = await getProfileData();

  if (!user) {
    redirect("/login");
  }

  const allTweets = await getUserTweets();

  const userTweets = allTweets.filter(
    (tweet) => tweet.author?._id === user.id
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Link
          href="/"
          className="mb-6 inline-block text-lg text-blue-400 hover:text-blue-300"
        >
          ← Back to Feed
        </Link>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-lg">
          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-4xl font-bold">
              {user.username?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-4xl font-bold">{user.username}</h1>

              <p className="text-lg text-slate-400">
                @{user.username}
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-800 pt-6">
            <div className="grid grid-cols-3 text-center">
              <div>
                <p className="text-3xl font-bold">
                  {userTweets.length}
                </p>
                <p className="mt-1 text-slate-400">Tweets</p>
              </div>

              <div>
                <p className="text-3xl font-bold">0</p>
                <p className="mt-1 text-slate-400">Followers</p>
              </div>

              <div>
                <p className="text-3xl font-bold">0</p>
                <p className="mt-1 text-slate-400">Following</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-5 text-4xl font-bold">
            Your Tweets
          </h2>

          {userTweets.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
              You have not posted any tweets yet.
            </div>
          ) : (
            <div className="space-y-4">
              {userTweets.map((tweet) => (
                <Link
                  key={tweet._id}
                  href={`/tweet/${tweet._id}`}
                  className="block rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:bg-slate-800"
                >
                  <p className="text-xl text-slate-200">
                    {tweet.text}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-6 border-t border-slate-800 pt-4 text-slate-400">
                    <span>👍 {tweet.upvotes}</span>
                    <span>👎 {tweet.downvotes}</span>
                    <span>
                      {new Date(tweet.createdAt).toLocaleString()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
