async function getTweet(id) {
  const res = await fetch(`http://localhost:3000/api/tweets/${id}`, {
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
    return <p>Tweet not found.</p>;
  }

  return (
    <main>
      <p>{tweet.text}</p>

      <p>
        👍 {tweet.upvotes} | 👎 {tweet.downvotes}
      </p>

      <a href="/">← Back to Feed</a>
    </main>
  );
}