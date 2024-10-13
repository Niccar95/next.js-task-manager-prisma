import "../app/globals.css";
import prisma from "./db";
import TodoList from "./components/TodoList";

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";

  await prisma.todo.update({ where: { id }, data: { complete } });
}

async function deleteTodo(id: string) {
  "use server";
  await prisma.todo.delete({ where: { id } });
}

export default async function Page() {
  const todos = await getTodos();

  console.log(todos);

  return (
    <>
      <h1>To Do</h1>
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      ></TodoList>
    </>
  );
}
