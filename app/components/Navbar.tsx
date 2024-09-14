import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <div>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/pages/contact">Contact</Link>
          </li>
          <li>
            <Link href="/pages/about">About</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
