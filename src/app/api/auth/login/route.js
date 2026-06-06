import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    message: "Logged in successfully",
  });

  response.cookies.set("authToken", "fake-token-123", {
  httpOnly: true,
  path: "/",
  sameSite: "lax",
});
  return response;
}