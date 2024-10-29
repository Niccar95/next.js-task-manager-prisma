import TodoItem from "./TodoItem";
import { Todo } from "@prisma/client";
import { Reorder } from "framer-motion";

interface ITodoListProps {
  todoList: Todo[];
  onToggleTodo: (id: string, complete: boolean) => void;
  onDeleteTodo: (id: string) => void;
  onReorder: (newOrder: Todo[]) => void;
}

const TodoList = ({
  todoList,
  onToggleTodo,
  onDeleteTodo,
  onReorder,
}: ITodoListProps) => {
  return (
    <>
      <ul>
        <Reorder.Group values={todoList} onReorder={onReorder}>
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
                toggleTodo={onToggleTodo}
                deleteTodo={onDeleteTodo}
              ></TodoItem>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </ul>
    </>
  );
};

export default TodoList;
