"use client";
import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { Todo } from "@prisma/client";
import { Reorder } from "framer-motion";

type TodoListProps = {
  todos: Todo[];
  toggleTodo: (id: string, complete: boolean) => void;
  deleteTodo: (id: string) => Promise<void>;
};

const TodoList = ({ todos, toggleTodo, deleteTodo }: TodoListProps) => {
  const [todoList, setTodos] = useState<Todo[]>(todos);
  return (
    <>
      <ul>
        <Reorder.Group values={todos} onReorder={setTodos}>
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
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
              ></TodoItem>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </ul>
    </>
  );
};

export default TodoList;
