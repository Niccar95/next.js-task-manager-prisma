import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logout successful" });

  // Clear the cookie
  res.cookies.set("authToken", "", {
    path: "/",
    expires: new Date(0), // Set expiry in the past
    httpOnly: true,
  });

  return res;
}

// Handle methods other than POST
export function OPTIONS() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
