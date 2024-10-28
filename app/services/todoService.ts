import prisma from "@/app/db";

export const getTodos = async () => {
  "use server";
  return await prisma.todo.findMany({
    orderBy: {
      order: "asc",
    },
  });
};

export const getTodosByColumnId = async (columnId: string) => {
  return await prisma.todo.findMany({
    where: { columnId },
    orderBy: {
      order: "asc",
    },
  });
};

export const createTodo = async (title: string, columnId: string) => {
  "use server";

  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid title");
  }

  const todos = await getTodos();

  const order = todos.length;

  return await prisma.todo.create({
    data: { title, complete: false, order, columnId },
  });
};

export const toggleTodo = async (id: string, complete: boolean) => {
  "use server";
  return await prisma.todo.update({
    where: { id },
    data: { complete },
  });
};

export const updateOrder = async (id: string, order: number) => {
  "use server";
  return await prisma.todo.update({
    where: { id },
    data: { order },
  });
};

export const deleteTodo = async (id: string) => {
  "use server";
  return await prisma.todo.delete({
    where: { id },
  });
};
