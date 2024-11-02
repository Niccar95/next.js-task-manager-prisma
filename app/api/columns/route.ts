import {
  createColumns,
  deleteColumns,
  getColumns,
} from "@/app/services/columnService";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const columns = await getColumns();
    return NextResponse.json(columns);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
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

export const DELETE = async (req: NextRequest) => {
  try {
    const { id } = await req.json();
    await deleteColumns(id);
    return NextResponse.json({ success: true });
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
