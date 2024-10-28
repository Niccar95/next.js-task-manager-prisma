"use client";

import { Column } from "@prisma/client";
import "../../app/column.css";
import "../../app/form.css";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

interface IColumnProps {
  column: Column;
}

const ColumnItem = ({ column }: IColumnProps) => {
  return (
    <>
      <article className="column">
        <h2>{column.title}</h2>
        <TodoForm columnId={column.id}></TodoForm>

        <TodoList columnId={column.id}></TodoList>
      </article>
    </>
  );
};

export default ColumnItem;
