import { createColumns, getColumns } from "@/app/services/columnService";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const todos = await getColumns();
    return NextResponse.json(todos);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { title } = body;

    const column = await createColumns(title);
    return NextResponse.json(column);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
};
