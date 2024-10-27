import React from "react";
import { Column } from "@prisma/client";
import "../../app/column.css";

interface IColumnProps {
  column: Column;
}

const ColumnItem = ({ column }: IColumnProps) => {
  return (
    <>
      <article className="column">
        <h2>{column.title}</h2>
      </article>
    </>
  );
};

export default ColumnItem;
