"use client";

interface TodoItemProps {
  id: string;
  title: string;
  complete: boolean;
  toggleTodo: (id: string, complete: boolean) => void;
}

const TodoItem = ({ id, complete, title, toggleTodo }: TodoItemProps) => {
  return (
    <li>
      <p>{title}</p>
      <input
        id={id}
        type="checkbox"
        onChange={(e) => toggleTodo(id, e.target.checked)}
        defaultChecked={complete}
      ></input>
      <label htmlFor={id}></label>
    </li>
  );
};

export default TodoItem;
