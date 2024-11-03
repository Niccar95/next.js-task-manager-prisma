"use client";
import "../../app/globals.css";
import "../../app/buttons.css";
import "../../app/todoItem.css";
import { useState } from "react";
import { CirclePicker } from "react-color";
import Image from "next/image";
import pencilImage from "../../app/public/pencil.svg";

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
      <li className="listItem">
        <section className="taskSection">
          <p className={isCompleted ? "completed" : ""}>{title}</p>
          <input
            className="checkBox"
            id={id}
            type="checkbox"
            onChange={handleToggle}
            defaultChecked={complete}
          ></input>
        </section>

        <section className="toolSection">
          <button className="toolButton" onClick={handleDelete}>
            Delete
          </button>

          <button className="toolButton" onClick={handleClick}>
            Edit
            <Image
              src={pencilImage}
              alt="pencil"
              width={10}
              height={10}
            ></Image>
          </button>
        </section>

        {isEditing && (
          <div className="editModal">
            <CirclePicker></CirclePicker>
          </div>
        )}
      </li>
    </>
  );
};

export default TodoItem;
