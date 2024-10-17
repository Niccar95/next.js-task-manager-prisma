import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logout successful" });

  res.cookies.set("authToken", "", {
    path: "/",
    expires: new Date(0),
    httpOnly: true,
  });

  return res;
}

export function OPTIONS() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
