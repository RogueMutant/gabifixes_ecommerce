"use client";
import { useState } from "react";
import Image from "next/image";
import { Search } from "../ui/search";
import { ShoppingCartIcon } from "../ui/shopping_cart";
import { NavLinks } from "./nav_links";
import { RectangleStackIcon } from "@heroicons/react/24/solid";
import { Footer } from "../ui/footer";
import { Sidebar } from "../ui/side_bar";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header */}
      <header className="px-3 w-full mt-5 text-black mb-6">
        <nav className="flex items-center justify-between w-full">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden"
            aria-label="Open sidebar"
          >
            <RectangleStackIcon className="w-8 h-8 text-green-900" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-green-900">
            Gabi Fixes
          </h1>
          <div className="flex items-center gap-3">
            <Search />
            <Link href="/home/cart">
              <ShoppingCartIcon />
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Image Section */}
      <div className="px-3 relative w-full h-56 sm:h-60 rounded-xl overflow-hidden mb-6">
        <Image
          src="/hello_glow_body_butter.jpg"
          alt="Gabi Fixes Logo"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center z-10">
          <h2 className="font-bold text-2xl sm:text-4xl text-white leading-tight">
            Radiant Beauty Awaits
          </h2>
          <p className="text-sm text-white opacity-90 max-w-sm">
            Discover our curated collection of beauty essentials.
          </p>
        </div>
      </div>

      {/* Page Content */}
      <div className="px-3 flex-grow w-full">{children}</div>

      {/* Footer */}
      <footer className="px-3 w-full mt-auto pt-4">
        <Footer />
      </footer>
    </div>
  );
}
