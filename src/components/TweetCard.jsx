// components/TweetCard.js
// 📌 Displays a single tweet with likes, hashtags, and user info

export default function TweetCard({ tweet }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px" }}>
      
      <p>{tweet.text}</p>
      <p>
        👍 {tweet.upvotes} | 👎 {tweet.downvotes}
      </p>
    </div>
  );
}