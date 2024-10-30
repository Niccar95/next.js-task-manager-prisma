"use client";
import { Column } from "@prisma/client";
import React from "react";
import ColumnItem from "./ColumnItem";
import "../../app/column.css";

interface IColumnListProps {
  columns: Column[];
}

const ColumnList = ({ columns }: IColumnListProps) => {
  return (
    <>
      <div className="columnWrapper">
        {columns.map((col) => (
          <ColumnItem key={col.id} column={col}></ColumnItem>
        ))}
      </div>
    </>
  );
};

export default ColumnList;
