"use client";
import React, { FormEvent, useState } from "react";
import "../app/form.css";
import "../app/globals.css";
import { useRouter } from "next/navigation";

const Page = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
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

        if (response.status === 404) {
          setErrorMessage("Invalid username or password.");
        } else {
          setErrorMessage(result.message || "Login failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("An error occurred during login", error);
    }
  };
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="userName">Username:</label>
        <input
          id="userName"
          className="textInput"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        ></input>

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          className="textInput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Page;
