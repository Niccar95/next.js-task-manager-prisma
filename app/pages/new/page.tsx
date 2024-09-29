import { redirect } from 'next/navigation';
import Link from 'next/link'
import React from 'react'
import prisma from '@/app/db';

async function createTodo(data: FormData) {
"use server"

const title = data.get("title")?.valueOf();
if(typeof title !== "string" || title.length === 0)  {
  throw new Error ("Invalid title")
}

await prisma.todo.create({data: {title, complete: false }})

redirect("/");
}

const page = () => {
  return (
    <>
   <h1>New</h1>
   <form action={createTodo}>
    <input type="text" name="title"></input>
   <div>
    <Link href="..">Cancel</Link>
    <button type="submit">Add</button>
   </div>
   </form>


  </>

  )
  
 
}

export default page
