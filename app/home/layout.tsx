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
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header */}
      <header className="px-4 py-3 w-full bg-white shadow-sm mb-6 relative z-40">
        <nav className="flex items-center justify-between w-full h-12 relative">
          {/* Left: Sidebar Toggle */}
          <div className="flex-shrink-0 z-10">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden"
              aria-label="Open sidebar"
            >
              <RectangleStackIcon className="w-8 h-8 text-green-900" />
            </button>
          </div>

          {/* Center: Title & Search */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg flex justify-center items-center">
            {/* Title & Icon Group (Fades out when search open) */}
            <div
              className={clsx(
                "flex items-center gap-3 transition-opacity duration-300 ease-in-out absolute",
                {
                  "opacity-0 pointer-events-none": isSearchOpen,
                  "opacity-100": !isSearchOpen,
                }
              )}
            >
              <Link href="/home">
                <h1 className="text-xl md:text-2xl font-bold text-green-900 tracking-tight">
                  Gabi Fixes
                </h1>
              </Link>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <MagnifyingGlassIcon className="w-6 h-6 text-green-900" />
              </button>
            </div>

            {/* Search Input Container (Expands when search open) */}
            <div
              className={clsx(
                "w-full transition-all duration-300 ease-in-out z-20",
                {
                  "opacity-100 scale-100": isSearchOpen,
                  "opacity-0 scale-95 pointer-events-none": !isSearchOpen,
                }
              )}
            >
              <Search
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
              />
            </div>
          </div>

          {/* Right: Cart */}
          <div className="flex-shrink-0 z-10 flex items-center gap-4">
            {/* Hidden spacer to balance layout if needed, or keeping it strictly space-between */}
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
