"use client";

import { usePathname } from "next/navigation";
import "../app/navBar.css";
import Navbar from "./components/Navbar";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {pathname !== "/" && <Navbar></Navbar>}
          <main>{children}</main>
          <footer></footer>
        </SessionProvider>
      </body>
    </html>
  );
}
