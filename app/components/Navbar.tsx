"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkStyle = (path: string) => ({
    padding: "8px 14px",
    borderRadius: "20px",
    textDecoration: "none",
    fontWeight: "600",
    background: pathname === path ? "#e4002b" : "transparent",
    color: pathname === path ? "#fff" : "#000",
    transition: "0.2s",
  });

  return (
    <nav
      style={{
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        background: "#fff",
      }}
    >

      <Link
        href="/"
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          textDecoration: "none",
          color: "#000",
        }}
      >
        🍔 FoodApp
      </Link>

  
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link href="/" style={linkStyle("/")}>
          Bosh sahifa
        </Link>

        <Link href="/restaurants" style={linkStyle("/restaurants")}>
          Restoranlar
        </Link>

        <Link href="/menu" style={linkStyle("/menu")}>
          Menyu
        </Link>

        <Link href="/halal" style={linkStyle("/halal")}>
          Halal
        </Link>


        <Link
          href="/login"
          style={{
            padding: "8px 18px",
            borderRadius: "20px",
            textDecoration: "none",
            fontWeight: "600",
            background: "#e4002b",
            color: "#fff",
          }}
        >
          Login
        </Link>
      </div>
    </nav>
  );
}