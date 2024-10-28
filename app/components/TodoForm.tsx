import Link from "next/link";
import React, { useState } from "react";

interface IColumnIdProps {
  columnId: string;
}

const TodoForm = ({ columnId }: IColumnIdProps) => {
  const [title, setTitle] = useState("");

  const handleCreateTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch(`/pages/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, columnId }),
    });

    if (response.ok) {
      setTitle("");
    } else {
      console.error("Failed to create todo");
    }
  };

  return (
    <>
      <form onSubmit={handleCreateTodo}>
        <input
          className="textInput"
          type="text"
          name="title"
          placeholder="Enter your task"
          maxLength={30}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <section className="submitSection">
          <Link className="cancelLink" href="..">
            Cancel
          </Link>
          <button type="submit">Add</button>
        </section>
      </form>
    </>
  );
};

export default TodoForm;
