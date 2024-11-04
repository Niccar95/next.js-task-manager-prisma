"use client";
import "../../app/globals.css";
import { Column } from "@prisma/client";
import ColumnList from "@/app/components/ColumnList";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Page() {
  const [columns, setColumns] = useState<Column[]>([]);

  const { data } = useSession();

  const sessionUser = data?.user;

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await fetch(`/api/columns`);
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
      const response = await fetch(`/api/columns`, {
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

  const handleDeleteColumn = async (id: string) => {
    try {
      const response = await fetch(`/api/columns`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setColumns(columns.filter((column) => column.id !== id));
      } else {
        const errorData = await response.json();
        console.error("Failed to delete column", errorData);
      }
    } catch (error) {
      console.error("Failed to delete column", error);
    }
  };

  return (
    <>
      {data !== null && <h1>Welcome {sessionUser?.name || "User"}!</h1>}
      <button onClick={handleCreateColumn}>Add Column</button>
      <ColumnList
        columns={columns}
        handleDeleteColumn={handleDeleteColumn}
      ></ColumnList>
    </>
  );
}
