"use client";
import { useState } from "react";
import { ShoppingCartIcon } from "./shopping_cart";
import {
  RectangleStackIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function SearchableHeader({ onMenuClick }: { onMenuClick: () => void }) {
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
    <header className="sticky top-0 z-40 w-full bg-cream/95 backdrop-blur-md border-b border-stone/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Mobile Menu */}
          <div className="flex items-center lg:w-1/4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 -ml-2 text-charcoal hover:bg-cream-dark transition-colors"
              aria-label="Open menu"
            >
              <RectangleStackIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Center: Logo (Mobile) & Desktop Navigation */}
          <div className="flex-1 flex justify-center items-center lg:justify-center">
            <Link href="/home" className="flex items-center gap-2 lg:hidden">
              <span className="font-serif text-2xl text-charcoal tracking-wide">
                Gabi Fixes
              </span>
            </Link>

            <nav className="hidden lg:flex items-center justify-center gap-10 text-xs text-charcoal uppercase tracking-[0.15em]">
              <Link href="/home" className="flex items-center gap-2 mr-6">
                <span className="font-serif text-2xl text-charcoal tracking-wide normal-case">
                  Gabi Fixes
                </span>
              </Link>
              <Link
                href="/home"
                className="hover:text-forest transition-colors py-1 border-b border-transparent hover:border-forest"
              >
                Shop
              </Link>
              <Link
                href="/home"
                className="hover:text-forest transition-colors py-1 border-b border-transparent hover:border-forest"
              >
                New
              </Link>
              <Link
                href="/home"
                className="hover:text-forest transition-colors py-1 border-b border-transparent hover:border-forest"
              >
                Sale
              </Link>
            </nav>
          </div>

          {/* Right: Search & Cart */}
          <div className="flex items-center justify-end gap-3 sm:gap-5 lg:w-1/4">
            {/* Search Bar (Desktop) */}
            <div className="hidden sm:flex relative group">
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get("query")?.toString()}
                className="w-40 lg:w-52 bg-cream-dark border border-stone/20 py-2.5 px-4 pl-10 text-sm text-charcoal placeholder:text-stone focus:border-forest focus:outline-none transition-colors"
              />
              <MagnifyingGlassIcon className="w-4 h-4 text-stone absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-forest transition-colors" />
            </div>

            {/* Mobile Search Icon */}
            <button
              onClick={() => setIsMobileSearchOpen(true)}
              className="sm:hidden p-2 text-charcoal hover:text-forest transition-colors"
              aria-label="Open search"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>

            <button className="p-2 text-charcoal hover:text-forest transition-colors hidden sm:block">
              <div className="relative">
                <span className="sr-only">Favorites</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </div>
            </button>

            <Link
              href="/home/cart"
              className="p-2 text-charcoal hover:text-forest transition-colors relative"
            >
              <ShoppingCartIcon />
            </Link>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {isMobileSearchOpen && (
          <div className="absolute inset-0 bg-cream z-50 flex items-center px-4 sm:hidden">
            <div className="relative flex-1">
              <input
                type="text"
                autoFocus
                placeholder="Search products..."
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get("query")?.toString()}
                className="w-full bg-cream-dark border border-stone/20 py-3 px-4 pl-10 text-base text-charcoal placeholder:text-stone focus:border-forest focus:outline-none transition-colors"
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-stone absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <button
              onClick={() => setIsMobileSearchOpen(false)}
              className="ml-4 p-2 text-charcoal"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
