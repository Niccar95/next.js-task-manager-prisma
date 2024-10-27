import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleTodo,
} from "@/app/services/todoService";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const todos = await getTodos();
    return NextResponse.json(todos);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();

    const newTodo = await createTodo(formData);
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
};

export const PATCH = async (req: Request) => {
  try {
    const { id, complete } = await req.json();
    const updatedTodo = await toggleTodo(id, complete);
    return NextResponse.json(updatedTodo);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { id } = await req.json();
    await deleteTodo(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
};
