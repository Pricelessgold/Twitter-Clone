import { NextResponse } from "next/server";

export async function GET(request) {
  const authToken = request.cookies.get("authToken");

  if (!authToken) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      name: "Odose",
      username: "greatestodose",
    },
  });
}