"use client";
import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { Todo } from "@prisma/client";
import { Reorder } from "framer-motion";

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
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  return (
    <>
      <ul>
        <Reorder.Group values={todoList} onReorder={setTodos}>
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
