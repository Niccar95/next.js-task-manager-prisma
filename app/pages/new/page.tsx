import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import prisma from "@/app/db";
import "../../form.css";
import Navbar from "@/app/components/Navbar";

async function createTodo(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid title");
  }

  await prisma.todo.create({ data: { title, complete: false } });

  redirect("/pages/home");
}

const page = () => {
  return (
    <>
      <Navbar></Navbar>
      <h1>New</h1>
      <form action={createTodo}>
        <input
          className="textInput"
          type="text"
          name="title"
          placeholder="Enter your task"
          maxLength={30}
        ></input>
        <section className="submitSection">
          <Link className="cancelLink" href="..">
            Cancel
          </Link>
          <button type="submit">Add</button>
        </section>
      </form>
    </>
  );
};

export default page;
