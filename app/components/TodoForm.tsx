import React, { FormEvent, useState } from "react";
import { Todo } from "@prisma/client";
interface IColumnIdProps {
  columnId: string;
  onAddTodo: (newTodo: Todo) => void;
}

const TodoForm = ({ columnId, onAddTodo }: IColumnIdProps) => {
  const [title, setTitle] = useState("");

  const handleCreateTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch(`/pages/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, columnId }),
    });

    if (response.ok) {
      const newTodo = await response.json();
      onAddTodo(newTodo);
      setTitle("");
    } else {
      console.error("Failed to create todo");
    }
  };

  return (
    <form onSubmit={handleCreateTodo}>
      <input
        className="textInput"
        type="text"
        name="title"
        placeholder="Enter your task"
        maxLength={30}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <section className="submitSection">
        <button type="submit">Add Task</button>
      </section>
    </form>
  );
};

export default TodoForm;
