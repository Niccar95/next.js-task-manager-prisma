import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import "../../form.css";
import Navbar from "@/app/components/Navbar";
import { createTodo } from "@/services/todoService";

const page = () => {
  async function handleCreateTodo(data: FormData) {
    "use server";

    await createTodo(data);
    redirect("/pages/home");
  }
  return (
    <>
      <Navbar></Navbar>
      <h1>New</h1>
      <form action={handleCreateTodo}>
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
