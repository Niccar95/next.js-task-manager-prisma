"use client";
import TodoItem from "./TodoItem";
import { Todo } from "@prisma/client";
import { Reorder } from "framer-motion";
import { getNextOrder } from "../utils/todoUtils";
import { useState } from "react";

type TodoListProps = {
  todos: Todo[];
};

const TodoList = ({ todos }: TodoListProps) => {
  const [todoList, setTodos] = useState<Todo[]>(todos);

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
      setTodos(updatedTodos);
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
      setTodos(reorderedTodos);
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

      setTodos(updatedTodos);
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
