import "../../globals.css";
import TodoList from "../../components/TodoList";
import Navbar from "@/app/components/Navbar";

export default async function Page() {
  return (
    <>
      <Navbar></Navbar>
      <h1>To Do</h1>
      <TodoList></TodoList>
    </>
  );
}
