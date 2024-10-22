import { updateOrder } from "@/services/todoService";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { todos } = await req.json();

    if (!Array.isArray(todos)) {
      return NextResponse.json(
        { success: false, error: "Invalid data format" },
        { status: 400 }
      );
    }

    const updatePromises = todos.map((todo) => {
      updateOrder(todo.id, todo.order);
    });

    await Promise.all(updatePromises);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 400 }
    );
  }
};
