"use client";
import { useState, Suspense } from "react";
import { montserrat } from "../ui/fonts";
import { Sidebar } from "../ui/side_bar";
import { Filter } from "../ui/filter";
import { Footer } from "../ui/footer";
import { SearchableHeader } from "../ui/searchable-header";

// Fallback header without search functionality
function HeaderFallback({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center lg:w-1/4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 -ml-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <span className="text-xl font-black text-gray-900 tracking-tighter uppercase italic">
              Gabi Fixes
            </span>
          </div>
          <div className="flex items-center justify-end gap-2 sm:gap-4 lg:w-1/4" />
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={`${montserrat.className} min-h-screen bg-white flex flex-col`}
    >
      {/* Mobile Sidebar (Modal) */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header with Suspense */}
      <Suspense
        fallback={<HeaderFallback onMenuClick={() => setSidebarOpen(true)} />}
      >
        <SearchableHeader onMenuClick={() => setSidebarOpen(true)} />
      </Suspense>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Desktop Sidebar (Persistent) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32">
              <Suspense
                fallback={
                  <div className="h-96 w-full bg-gray-50 animate-pulse rounded-xl" />
                }
              >
                <Filter open={true} onClose={() => {}} inline={true} />
              </Suspense>
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
