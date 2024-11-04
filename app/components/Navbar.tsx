"use client";

import Link from "next/link";
import React from "react";
import "../../app/navBar.css";

import { signOut } from "next-auth/react";

const Navbar = () => {
  const handleLogout = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <>
      <div className="navBar">
        <ul className="navList">
          <li className="navListItem">
            <Link href="/home">Home</Link>
          </li>
          <li className="navListItem">
            <Link href="/new">New</Link>
          </li>
          <li className="navListItem">
            <Link href="/contact">Contact</Link>
          </li>
          <li className="navListItem">
            <Link href="/about">About</Link>
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
