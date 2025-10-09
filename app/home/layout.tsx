"use client";
import { useState } from "react";
import { Search } from "../ui/search";
import { ShoppingCartIcon } from "../ui//shopping_cart";
import {
  RectangleStackIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "../ui/footer";
import { Sidebar } from "../ui/side_bar";
import Link from "next/link";
import { clsx } from "clsx";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header */}
      <header className="px-3 py-2 w-full border-gray-500  text-black mb-6">
        <nav className="flex items-center justify-between w-full">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden"
            aria-label="Open sidebar"
          >
            <RectangleStackIcon className="w-8 h-8 text-green-900" />
          </button>

          <Link href="/home">
            <h1
              className={clsx("text-xl md:text-2xl font-bold text-green-900", {
                hidden: searchOpen,
              })}
            >
              Gabi Fixes
            </h1>
          </Link>
          <div className="flex items-center gap-3">
            <Search open={searchOpen} />
            <MagnifyingGlassIcon
              className="w-6 h-6 text-green-900 cursor-pointer"
              onClick={() => setSearchOpen(!searchOpen)}
            />
            <Link href="/home/cart">
              <ShoppingCartIcon />
            </Link>
          </div>
        </nav>
      </header>

      {/* Page Content */}
      <div className="px-3 flex-grow w-full">{children}</div>

      {/* Footer */}
      <footer className="px-3 w-full mt-auto py-2">
        <Footer />
      </footer>
    </div>
  );
}
