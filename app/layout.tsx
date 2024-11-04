"use client";

import { usePathname } from "next/navigation";
import "../app/navBar.css";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        {pathname !== "/" && <Navbar></Navbar>}
        <main>{children}</main>
        <footer></footer>
      </body>
    </html>
  );
}
