import prisma from "@/app/db";
import { connectToDatabase } from "@/app/helpers/server-helpers";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const { userName, password, avatar = "" } = await req.json();
    if (!userName || !password)
      return NextResponse.json({ message: "Invalid data" }, { status: 422 });
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectToDatabase();
    const user = await prisma.user.create({
      data: { userName, hashedPassword, avatar: avatar || "" },
    });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
