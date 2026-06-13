import { makeSureDbIsReady } from "@/lib/db";
import { Tweet } from "@/models/Tweet";
import { getUserFromToken } from "@/lib/auth";
import { User } from "@/models/User";

export async function GET() {
  await makeSureDbIsReady();

  const tweets = await Tweet.find({})
    .populate("author", " username email ")
    .sort({ createdAt: -1 });

  return Response.json(tweets);
}

export async function POST(req) {
  await makeSureDbIsReady();

  const authToken = req.cookies.get("authToken")?.value;
  const user = getUserFromToken(authToken);

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  if (!body.text || body.text.trim() === "") {
    return Response.json(
      { error: "Tweet text is required" },
      { status: 400 }
    );
  }

  const tweet = await Tweet.create({
    text: body.text,
    author: user.id,
  });

  const populatedTweet = await tweet.populate("author", " username email ");

  return Response.json(populatedTweet, { status: 201 });
}