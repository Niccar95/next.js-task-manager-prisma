import "../app/globals.css";

import TodoItem from "./components/TodoItem";
import prisma from "./db";

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
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            complete={todo.complete}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          ></TodoItem>
        ))}
      </ul>
    </>
  );
}
