import { makeSureDbIsReady } from "@/lib/db";
import { Tweet } from "@/models/Tweet";

export async function POST(req) {
  await makeSureDbIsReady();

  const authToken = req.cookies.get("authToken");

  if (!authToken) {
    return new Response(
      JSON.stringify({ error: "Unauthorized TEST" }),
      { status: 401 }
    );
  }

  const body = await req.json();

  try {
    const newTweet = await Tweet.create(body);

    return new Response(JSON.stringify(newTweet), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error creating tweet" }),
      { status: 500 }
    );
  }
}


export async function GET(req) {
  await makeSureDbIsReady();

  try {
    const tweets = await Tweet.find({}).sort({ createdAt: -1 });

    return new Response(JSON.stringify(tweets), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error fetching tweets" }),
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  await makeSureDbIsReady();

  const { id, ...updatedData } = await req.json();

  try {
    const updatedTweet = await Tweet.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return new Response(JSON.stringify(updatedTweet), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error updating tweet" }), {
      status: 500,
    });
  }
}

export async function DELETE(req,) {
  await makeSureDbIsReady();

  const { id } = await req.json();

  try {
    await Tweet.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ message: "Tweet deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error deleting tweet" }), {
      status: 500,
    });
  }
}