import prisma from "@/app/db";
import { connectToDatabase } from "@/app/helpers/server-helpers";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const { userName, password } = await req.json();
    if (!userName || !password) {
      return NextResponse.json(
        { message: "Missing username or password" },
        { status: 422 }
      );
    }

    await connectToDatabase();
    const user = await prisma.user.findFirst({
      where: { userName },
    });

    if (!user) {
      return NextResponse.json({ message: "No user found" }, { status: 404 });
    }

    if (!user.hashedPassword) {
      return NextResponse.json(
        { message: "User has no password set" },
        { status: 400 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Login successful", user: user.userName },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  } finally {
    console.log("Welcome!");
  }
};
