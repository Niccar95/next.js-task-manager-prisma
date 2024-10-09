"use client";

interface TodoItemProps {
  id: string;
  title: string;
  complete: boolean;
  toggleTodo: (id: string, complete: boolean) => void;
  deleteTodo: (id: string) => Promise<void>;
}

const TodoItem = ({
  id,
  complete,
  title,
  toggleTodo,
  deleteTodo,
}: TodoItemProps) => {
  const handleDelete = async () => {
    await deleteTodo(id);
    window.location.reload();
  };

  return (
    <li className="listItem">
      <p className={complete ? "completed" : ""}>{title}</p>
      <input
        id={id}
        type="checkbox"
        onChange={(e) => toggleTodo(id, e.target.checked)}
        defaultChecked={complete}
      ></input>
      <label htmlFor={id}></label>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TodoItem;
