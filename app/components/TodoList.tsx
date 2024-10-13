import React from "react";
import TodoItem from "./TodoItem";
import { Todo } from "@prisma/client";

type TodoListProps = {
  todos: Todo[];
  toggleTodo: (id: string, complete: boolean) => void;
  deleteTodo: (id: string) => Promise<void>;
};

const TodoList = ({ todos, toggleTodo, deleteTodo }: TodoListProps) => {
  return (
    <>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            complete={todo.complete}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          ></TodoItem>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
