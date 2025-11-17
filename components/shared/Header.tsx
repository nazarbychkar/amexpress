"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-elegant py-2 border-b border-gray-200/50"
          : "bg-transparent backdrop-blur-xl bg-white/90 shadow-soft py-3"
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-center items-center">
        <Link
          href="/"
          className="flex items-center hover:scale-105 active:scale-95 transition-transform duration-300"
        >
          <Image
            src="/logo1199.svg"
            alt="AmeXpress"
            width={180}
            height={60}
            className={`w-auto transition-all duration-300 ${
              scrolled ? "h-10" : "h-12"
            }`}
            priority
          />
        </Link>
      </div>
    </header>
  );
}
