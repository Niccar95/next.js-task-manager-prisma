import prisma from "@/app/db";

export async function createTodo(data: FormData) {
  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid title");
  }

  return await prisma.todo.create({ data: { title, complete: false } });
}

export async function getTodos() {
  "use server";
  return await prisma.todo.findMany();
}

export async function toggleTodo(id: string, complete: boolean) {
  "use server";
  return await prisma.todo.update({
    where: { id },
    data: { complete },
  });
}

export async function deleteTodo(id: string) {
  "use server";
  return await prisma.todo.delete({
    where: { id },
  });
}
