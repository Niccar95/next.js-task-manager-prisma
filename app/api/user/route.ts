import { updateImage } from "@/app/services/userService";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
  try {
    const { id, image } = await req.json();
    const newTodo = await updateImage(id, image);
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
};
