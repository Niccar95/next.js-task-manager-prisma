"use client";
import "../../app/globals.css";
import { useState } from "react";

interface TodoItemProps {
  id: string;
  title: string;
  complete: boolean;
  toggleTodo: (id: string, complete: boolean) => void;
  deleteTodo: (id: string) => Promise<void>;
}

const TodoItem = ({
  id,
  complete,
  title,
  toggleTodo,
  deleteTodo,
}: TodoItemProps) => {
  const [isCompleted, setIsCompleted] = useState(complete);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedComplete = e.target.checked;
    setIsCompleted(updatedComplete);
    toggleTodo(id, updatedComplete);
  };

  const handleDelete = async () => {
    await deleteTodo(id);
    window.location.reload();
  };

  return (
    <>
      <p className={isCompleted ? "completed" : ""}>{title}</p>
      <input
        className="checkBox"
        id={id}
        type="checkbox"
        onChange={handleToggle}
        defaultChecked={complete}
      ></input>
      <label htmlFor={id}></label>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default TodoItem;
