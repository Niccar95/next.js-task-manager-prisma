import prisma from "./db";

export default async function Page() {
  

  const todos = await prisma.todo.findMany()


const f = await prisma.todo.create({ data: {title: "test", complete: false, }})

console.log(f)

  return (
    <>
      <h1>To Do</h1>
      <form>
        <input type="text"></input>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
}
