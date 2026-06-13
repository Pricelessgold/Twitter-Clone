import { makeSureDbIsReady } from "@/lib/db";
import { Tweet } from "@/models/Tweet";
import mongoose from "mongoose";

export async function PATCH(req, { params }) {
  await makeSureDbIsReady();

  const { id } = await params;
  const body = await req.json();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return Response.json(
      { error: "Invalid tweet id" },
      { status: 400 }
    );
  }

  if (body.type !== "upvote" && body.type !== "downvote") {
    return Response.json(
      { error: "Invalid vote type" },
      { status: 400 }
    );
  }

  const update =
    body.type === "upvote"
      ? { $inc: { upvotes: 1 } }
      : { $inc: { downvotes: 1 } };

  try {
    const updatedTweet = await Tweet.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!updatedTweet) {
      return Response.json(
        { error: "Tweet not found" },
        { status: 404 }
      );
    }

    return Response.json(updatedTweet, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/tweets/[id]/vote error:", error);

    return Response.json(
      { error: "Error voting tweet" },
      { status: 500 }
    );
  }
}