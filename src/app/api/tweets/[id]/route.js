import { makeSureDbIsReady } from "@/lib/db";
import { Tweet } from "@/models/Tweet";

export async function GET(req, { params }) {
  await makeSureDbIsReady();

  const { id } = await params;

  const tweet = await Tweet.findById(id);

  if (!tweet) {
    return new Response(
      JSON.stringify({ error: "Tweet not found" }),
      { status: 404 }
    );
  }

  return new Response(JSON.stringify(tweet), {
    status: 200,
  });
}

export async function PUT(req, { params }) {
  await makeSureDbIsReady();
  const authToken = req.cookies.get("authToken");

    if (!authToken) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

  const { id } = await params;

  const updatedData = await req.json();

  try {
    const updatedTweet = await Tweet.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedTweet) {
      return new Response(
        JSON.stringify({ error: "Tweet not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify(updatedTweet),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error updating tweet" }),
      { status: 500 }
    );
  }
}


export async function DELETE(req, { params }) {
  await makeSureDbIsReady();
  const authToken = req.cookies.get("authToken");
  if (!authToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
    });
  }
  
  const { id } = await params;

  try {
    const deletedTweet = await Tweet.findByIdAndDelete(id);

    if (!deletedTweet) {
      return new Response(
        JSON.stringify({ error: "Tweet not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Tweet deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error deleting tweet" }),
      { status: 500 }
    );
  }
}