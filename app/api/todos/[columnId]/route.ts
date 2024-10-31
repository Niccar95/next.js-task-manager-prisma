import { getTodosByColumnId } from "@/app/services/todoService";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { columnId: string } }
) => {
  const { columnId } = params;

  console.log(req.method);
  console.log(`Request headers:`, req.headers);

  try {
    const todos = await getTodosByColumnId(columnId);
    return NextResponse.json(todos);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
};
