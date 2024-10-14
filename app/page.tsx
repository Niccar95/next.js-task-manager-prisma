"use client";
import React, { useState } from "react";
import "../app/form.css";
import { useRouter } from "next/navigation";

const Page = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/pages/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });
      const result = await response.json();
      if (response.status === 200) {
        router.push("/pages/home");
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("An error occurred during login", error);
    } finally {
      console.log("Login successfull");
    }
  };
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          className="textInput"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <input
          className="textInput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Page;
