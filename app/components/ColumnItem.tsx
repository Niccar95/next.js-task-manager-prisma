"use client";

import { Column } from "@prisma/client";
import "../../app/column.css";
import "../../app/form.css";
import "../../app/buttons.css";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useEffect, useState } from "react";
import { Todo } from "@prisma/client";
import { getNextOrder } from "../utils/todoUtils";

interface IColumnProps {
  column: Column;
}

const ColumnItem = ({ column }: IColumnProps) => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`/api/todos/${column.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const todos = await response.json();
        setTodoList(todos);
      } catch (error) {
        console.error("Failed to fetch todos", error);
      }
    };
    fetchTodos();
  }, [column.id]);

  const handleToggleTodo = async (id: string, complete: boolean) => {
    try {
      await fetch(`/api/todos`, {
        method: "PATCH",
        body: JSON.stringify({ id, complete }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedTodos = todoList.map((todo) =>
        todo.id === id ? { ...todo, complete } : todo
      );
      setTodoList(updatedTodos);
    } catch (error) {
      console.error("Failed to toggle todo", error);
    }
  };

  const handleReorder = async (newOrder: Todo[]) => {
    try {
      const reorderedTodos = newOrder.map((todo, index) => ({
        ...todo,
        order: index,
      }));

      await fetch(`/api/updateTodos`, {
        method: "POST",
        body: JSON.stringify({ todos: reorderedTodos }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setTodoList(reorderedTodos);
    } catch (error) {
      console.error("Failed to reorder todos", error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await fetch(`/api/todos`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedTodos = todoList.filter((todo) => todo.id !== id);
      const newOrder = getNextOrder(updatedTodos);

      await fetch(`'/api/updateTodos`, {
        method: "POST",
        body: JSON.stringify({ todos: newOrder }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setTodoList(updatedTodos);
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  const addTodo = (newTodo: Todo) => {
    setTodoList([...todoList, newTodo]);
  };

  return (
    <article className="column">
      <section className="topSection">
        <h2>{column.title}</h2>
        <section className="toolSection">
          <button className="toolButton">Delete</button>
        </section>
      </section>
      <TodoForm columnId={column.id} onAddTodo={addTodo} />
      <TodoList
        todoList={todoList}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
        onReorder={handleReorder}
      />
    </article>
  );
};

export default ColumnItem;
