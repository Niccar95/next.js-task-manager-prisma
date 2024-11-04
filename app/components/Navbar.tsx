"use client";

import Link from "next/link";
import React from "react";
import "../../app/navBar.css";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import avatar from "../public/Powderedtoastwink.webp";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  const profilePageNavigation = () => {
    router.push("/profile");
  };

  return (
    <>
      <div className="navBar">
        <ul className="navList">
          <li className="navListItem">
            <Link href="/home">Home</Link>
          </li>
          <li className="navListItem">
            <Link href="/new">My boards</Link>
          </li>
          <li className="navListItem">
            <Link href="/contact">Contact</Link>
          </li>
          <li className="navListItem">
            <Link href="/about">About</Link>
          </li>
        </ul>

        <ul className="sessionLinks">
          <li className="profileIcon" onClick={profilePageNavigation}>
            <Image src={avatar} alt="avatar" className="avatar"></Image>
          </li>
          <li className="navListItem">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
