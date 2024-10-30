"use client";
import "../../app/globals.css";
import "../../app/buttons.css";
import { useState } from "react";
import { CirclePicker } from "react-color";

interface TodoItemProps {
  id: string;
  title: string;
  complete: boolean;
  toggleTodo: (id: string, complete: boolean) => void;
  deleteTodo: (id: string) => void;
}

const TodoItem = ({
  id,
  complete,
  title,
  toggleTodo,
  deleteTodo,
}: TodoItemProps) => {
  const [isCompleted, setIsCompleted] = useState(complete);
  const [isEditing, setIstrue] = useState(false);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedComplete = e.target.checked;
    setIsCompleted(updatedComplete);
    toggleTodo(id, updatedComplete);
  };

  const handleDelete = () => {
    deleteTodo(id);
  };

  const handleClick = () => {
    if (!isEditing) {
      setIstrue(true);
    } else {
      setIstrue(false);
    }
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
      <button className="todoButton" onClick={handleDelete}>
        Delete
      </button>

      <button className="todoButton" onClick={handleClick}>
        Edit
      </button>

      {isEditing && (
        <div className="editModal">
          <CirclePicker></CirclePicker>
        </div>
      )}
    </>
  );
};

export default TodoItem;
