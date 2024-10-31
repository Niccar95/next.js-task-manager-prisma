"use client";
import "../../app/globals.css";
import Navbar from "@/app/components/Navbar";
import { Column } from "@prisma/client";
import ColumnList from "@/app/components/ColumnList";
import { useEffect, useState } from "react";

export default function Page() {
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await fetch("/api/columns");
        const data = await response.json();
        setColumns(data);
      } catch (error) {
        console.error("Failed to fetch columns", error);
      }
    };

    fetchColumns();
  }, []);

  const handleCreateColumn = async () => {
    try {
      const title = prompt("Enter column title:");
      if (!title) return;
      const response = await fetch("/api/columns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      const newColumn = await response.json();
      setColumns([...columns, newColumn]);
    } catch (error) {
      console.error("Failed to create column", error);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <h1>Task Manager</h1>
      <button onClick={handleCreateColumn}>Add Column</button>
      <ColumnList columns={columns}></ColumnList>
    </>
  );
}
