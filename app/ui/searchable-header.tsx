"use client";
import { useState, useTransition } from "react";
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
  const [searchValue, setSearchValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Debounced search with 400ms delay
  const debouncedSearch = useDebouncedCallback((term: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      if (term.trim()) {
        params.set("query", term.trim());
      } else {
        params.delete("query");
      }
      replace(`${pathname}?${params.toString()}`);
    });
  }, 400);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  const clearSearch = () => {
    setSearchValue("");
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  };

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
                value={searchValue || searchParams.get("query") || ""}
                onChange={handleSearchChange}
                className="w-40 lg:w-52 bg-cream-dark border border-stone/20 py-2.5 px-4 pl-10 pr-8 text-sm text-charcoal placeholder:text-stone focus:border-forest focus:outline-none transition-colors"
              />
              <MagnifyingGlassIcon className="w-4 h-4 text-stone absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-forest transition-colors" />
              {isPending && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-stone/30 border-t-forest animate-spin rounded-full" />
                </div>
              )}
              {!isPending && (searchValue || searchParams.get("query")) && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-charcoal transition-colors"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
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
          <div className="absolute inset-0 bg-cream z-50 flex items-center px-4 sm:hidden h-16">
            <div className="relative flex-1">
              <input
                type="text"
                autoFocus
                placeholder="Search products..."
                value={searchValue || searchParams.get("query") || ""}
                onChange={handleSearchChange}
                className="w-full bg-cream-dark border border-stone/20 py-3 px-4 pl-10 pr-10 text-base text-charcoal placeholder:text-stone focus:border-forest focus:outline-none transition-colors"
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-stone absolute left-3.5 top-1/2 -translate-y-1/2" />
              {isPending && (
                <div className="absolute right-12 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-stone/30 border-t-forest animate-spin rounded-full" />
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setIsMobileSearchOpen(false);
                setSearchValue("");
              }}
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
