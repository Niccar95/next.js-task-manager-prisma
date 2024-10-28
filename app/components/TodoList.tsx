"use client";
import TodoItem from "./TodoItem";
import { Todo } from "@prisma/client";
import { Reorder } from "framer-motion";
import { getNextOrder } from "../utils/todoUtils";
import { useEffect, useState } from "react";

interface ITodoListProps {
  columnId: string;
}

const TodoList = ({ columnId }: ITodoListProps) => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`/pages/api/todos/${columnId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const todos = await response.json();
        setTodoList(todos);
        console.log(todos);
      } catch (error) {
        console.error("Failed to fetch todos", error);
      }
    };
    fetchTodos();
  }, [columnId]);

  const handleToggleTodo = async (id: string, complete: boolean) => {
    try {
      await fetch(`/pages/api/todos`, {
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

      await fetch(`/pages/api/updateTodos`, {
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
      await fetch(`/pages/api/todos`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedTodos = todoList.filter((todo) => todo.id !== id);

      const newOrder = getNextOrder(updatedTodos);

      await fetch(`/pages/api/updateTodos`, {
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

  return (
    <>
      <ul>
        <Reorder.Group values={todoList} onReorder={handleReorder}>
          {todoList.map((todo) => (
            <Reorder.Item
              className="listItem"
              as="li"
              value={todo}
              key={todo.id}
            >
              <TodoItem
                key={todo.id}
                id={todo.id}
                title={todo.title}
                complete={todo.complete}
                toggleTodo={handleToggleTodo}
                deleteTodo={handleDeleteTodo}
              ></TodoItem>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </ul>
    </>
  );
};

export default TodoList;
