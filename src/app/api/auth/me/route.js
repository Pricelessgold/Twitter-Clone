import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  const authToken = request.cookies.get("authToken")?.value;

  if (!authToken) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

    return NextResponse.json({
      user: {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
      },
    });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}