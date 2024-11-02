"use client";
import { Column } from "@prisma/client";
import React from "react";
import ColumnItem from "./ColumnItem";
import "../../app/column.css";

interface IColumnListProps {
  columns: Column[];
  handleDeleteColumn: (id: string) => void;
}

const ColumnList = ({ columns, handleDeleteColumn }: IColumnListProps) => {
  return (
    <>
      <div className="columnWrapper">
        {columns.map((col) => (
          <ColumnItem
            key={col.id}
            column={col}
            handleDeleteColumn={handleDeleteColumn}
          ></ColumnItem>
        ))}
      </div>
    </>
  );
};

export default ColumnList;
