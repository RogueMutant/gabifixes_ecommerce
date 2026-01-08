"use client";
import { useState } from "react";
import { ShoppingCartIcon } from "../ui//shopping_cart";
import {
  RectangleStackIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { montserrat } from "../ui/fonts";
import { Sidebar } from "../ui/side_bar";
import { Filter } from "../ui/filter";
import { Footer } from "../ui/footer";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div
      className={`${montserrat.className} min-h-screen bg-white flex flex-col`}
    >
      {/* Mobile Sidebar (Modal) */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Mobile Menu */}
            <div className="flex items-center lg:w-1/4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Open menu"
              >
                <RectangleStackIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Center: Logo (Mobile) & Desktop Navigation */}
            <div className="flex-1 flex justify-center items-center lg:justify-center">
              <Link href="/home" className="flex items-center gap-2 lg:hidden">
                <span className="text-xl font-black text-gray-900 tracking-tighter uppercase italic">
                  Gabi Fixes
                </span>
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </Link>

              <nav className="hidden lg:flex items-center justify-center gap-8 text-sm font-bold text-gray-900 uppercase tracking-widest">
                <Link href="/home" className="flex items-center gap-2 mr-4">
                  <span className="text-2xl font-black text-gray-900 tracking-tighter uppercase italic">
                    Gabi Fixes
                  </span>
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </Link>
                <Link
                  href="/home"
                  className="hover:text-green-600 transition-colors"
                >
                  Shop
                </Link>
                <Link
                  href="/home"
                  className="hover:text-green-600 transition-colors"
                >
                  New
                </Link>
                <Link
                  href="/home"
                  className="hover:text-green-600 transition-colors"
                >
                  Sale
                </Link>
              </nav>
            </div>

            {/* Right: Search & Cart */}
            <div className="flex items-center justify-end gap-2 sm:gap-4 lg:w-1/4">
              {/* Search Bar (Desktop) */}
              <div className="hidden sm:flex relative group">
                <input
                  type="text"
                  placeholder="Search products..."
                  onChange={(e) => handleSearch(e.target.value)}
                  defaultValue={searchParams.get("query")?.toString()}
                  className="w-48 lg:w-64 bg-gray-50 border-none rounded-full py-2 px-4 pl-10 text-sm focus:ring-2 focus:ring-green-500/20 transition-all outline-none"
                />
                <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-green-500" />
              </div>

              {/* Mobile Search Icon */}
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="sm:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Open search"
              >
                <MagnifyingGlassIcon className="w-6 h-6 text-gray-900" />
              </button>

              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
                <div className="relative">
                  <span className="sr-only">Favorites</span>
                  <svg
                    className="w-6 h-6 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
              </button>

              <Link
                href="/home/cart"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
              >
                <ShoppingCartIcon />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {isMobileSearchOpen && (
          <div className="absolute inset-0 bg-white z-50 flex items-center px-4 sm:hidden">
            <div className="relative flex-1">
              <input
                type="text"
                autoFocus
                placeholder="Search products..."
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get("query")?.toString()}
                className="w-full bg-gray-50 border-none rounded-full py-3 px-4 pl-10 text-base focus:ring-2 focus:ring-green-500/20 transition-all outline-none"
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <button
              onClick={() => setIsMobileSearchOpen(false)}
              className="ml-4 p-2 text-gray-900 font-bold"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Desktop Sidebar (Persistent) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32">
              <Filter open={true} onClose={() => {}} inline={true} />
            </div>
          </aside>

          {/* Product Feed */}
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </main>

      {/* Footer Container */}
      <Footer />
    </div>
  );
}
