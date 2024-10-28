"use client";
import React from "react";
import { Column } from "@prisma/client";
import "../../app/column.css";
import TodoForm from "./TodoForm";

interface IColumnProps {
  column: Column;
}

const ColumnItem = ({ column }: IColumnProps) => {
  return (
    <>
      <article className="column">
        <h2>{column.title}</h2>
        <TodoForm columnId={column.id}></TodoForm>
      </article>
    </>
  );
};

export default ColumnItem;
