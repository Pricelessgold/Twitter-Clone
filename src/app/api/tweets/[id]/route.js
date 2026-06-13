import { makeSureDbIsReady } from "@/lib/db";
import { Tweet } from "@/models/Tweet";
import { getUserFromToken } from "@/lib/auth";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  await makeSureDbIsReady();

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return Response.json({ error: "Invalid tweet id" }, { status: 400 });
  }

  const tweet = await Tweet.findById(id).populate("author", " username email");

  if (!tweet) {
    return Response.json({ error: "Tweet not found" }, { status: 404 });
  }

  return Response.json(tweet);
}

export async function PUT(req, { params }) {
  await makeSureDbIsReady();

  const { id } = await params;
  const authToken = req.cookies.get("authToken")?.value;
  const user = getUserFromToken(authToken);

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return Response.json({ error: "Invalid tweet id" }, { status: 400 });
  }

  const tweet = await Tweet.findById(id);

  if (!tweet) {
    return Response.json({ error: "Tweet not found" }, { status: 404 });
  }

  if (tweet.author.toString() !== user.id) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  if (!body.text || body.text.trim() === "") {
    return Response.json({ error: "Tweet text is required" }, { status: 400 });
  }

  tweet.text = body.text;
  await tweet.save();

  const updatedTweet = await tweet.populate("author", "username email");

  return Response.json(updatedTweet);
}

export async function DELETE(req, { params }) {
  await makeSureDbIsReady();

  const { id } = await params;
  const authToken = req.cookies.get("authToken")?.value;
  const user = getUserFromToken(authToken);

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return Response.json({ error: "Invalid tweet id" }, { status: 400 });
  }

  const tweet = await Tweet.findById(id);

  if (!tweet) {
    return Response.json({ error: "Tweet not found" }, { status: 404 });
  }

  if (tweet.author.toString() !== user.id) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  await Tweet.findByIdAndDelete(id);

  return Response.json({ message: "Tweet deleted successfully" });
}