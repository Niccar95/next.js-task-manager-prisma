"use client";

import Link from "next/link";
import React from "react";
import "../../app/navBar.css";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/pages/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        console.log("Logout successful");
        router.push("/");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <>
      <div className="navBar">
        <ul className="navList">
          <li className="navListItem">
            <Link href="/pages/home">Home</Link>
          </li>
          <li className="navListItem">
            <Link href="/pages/new">New</Link>
          </li>
          <li className="navListItem">
            <Link href="/pages/contact">Contact</Link>
          </li>
          <li className="navListItem">
            <Link href="/pages/about">About</Link>
          </li>
        </ul>
        <ul>
          <li className="navListItem">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
