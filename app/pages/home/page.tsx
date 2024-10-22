import "../../globals.css";
import TodoList from "../../components/TodoList";
import Navbar from "@/app/components/Navbar";
import prisma from "@/app/db";

const fetchTodos = async () => {
  "use server";
  return await prisma.todo.findMany({
    orderBy: {
      order: "asc",
    },
  });
};

export default async function Page() {
  const todos = await fetchTodos();

  console.log(todos);

  return (
    <>
      <Navbar></Navbar>
      <h1>To Do</h1>
      <TodoList todos={todos}></TodoList>
    </>
  );
}
