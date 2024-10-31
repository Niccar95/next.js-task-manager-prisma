"use client";
import React, { FormEvent, useState } from "react";
import "../app/form.css";
import "../app/globals.css";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Page = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoader(true);

    const result = await signIn("credentials", {
      redirect: false,
      userName,
      password,
    });

    setLoader(false);

    if (result?.error) {
      setErrorMessage(result.error);
    } else {
      router.push("/home");
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

        {loader && (
          <div className="spinnerWrapper">
            <div className="spinner"></div>
          </div>
        )}
      </form>
    </>
  );
};

export default Page;
