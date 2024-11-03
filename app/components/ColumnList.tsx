"use client";
import { Column } from "@prisma/client";
import React, { useEffect, useState } from "react";
import ColumnItem from "./ColumnItem";
import "../../app/column.css";
import { Reorder } from "framer-motion";

interface IColumnListProps {
  columns: Column[];
  handleDeleteColumn: (id: string) => void;
}

const ColumnList = ({ columns, handleDeleteColumn }: IColumnListProps) => {
  const [columnOrder, setColumnOrder] = useState<Column[]>(columns);

  useEffect(() => {
    setColumnOrder(columns);
  }, [columns]);

  return (
    <>
      <Reorder.Group
        className="reorderGroup"
        axis="x"
        values={columnOrder}
        onReorder={setColumnOrder}
      >
        <div className="columnWrapper">
          {columnOrder.map((col) => (
            <ColumnItem
              key={col.id}
              column={col}
              handleDeleteColumn={handleDeleteColumn}
            ></ColumnItem>
          ))}
        </div>
      </Reorder.Group>
    </>
  );
};

export default ColumnList;
