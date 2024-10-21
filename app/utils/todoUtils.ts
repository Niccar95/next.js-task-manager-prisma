import { Todo } from "@prisma/client";

export function getNextOrder(todos: Todo[]): { id: string; order: number }[] {
  return todos.map((todo, index) => ({
    id: todo.id,
    order: index,
  }));
}
