"use client";

import { AdminSidenav } from "@/app/ui/admin/sidenav";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";
import { ToastProvider } from "@/app/ui/toast";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prepare content based on mounted state to avoid hydration mismatch on specific elements
  // But always wrap in Providers that children might need.

  const content = mounted ? (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="w-full flex-none md:w-64">
        <AdminSidenav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {/* Theme Toggle Placeholder */}
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        {children}
      </div>
    </div>
  ) : (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Render basic structure to match server HTML as much as possible, or just children if minimizing styling flash */}
      {/* If we just return children, we lose sidebar styling temporarily but avoiding hydration error is key. 
               However, children need ToastProvider. */}
      {children}
    </div>
  );

  // Actually, simplest fix that keeps original logic mostly intact:
  // If not mounted, returning children wrapped in ToastProvider is seemingly enough functionality-wise,
  // but might break style if layout is missing.
  // The original code returned just <>{children}</>.

  return (
    <ThemeProvider attribute="class">
      <ToastProvider>
        {mounted ? (
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="w-full flex-none md:w-64">
              <AdminSidenav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
              <div className="flex justify-end mb-4">
                <ThemeToggle />
              </div>
              {children}
            </div>
          </div>
        ) : (
          <>{children}</>
        )}
      </ToastProvider>
    </ThemeProvider>
  );
}

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
    >
      {theme === "dark" ? (
        <SunIcon className="w-6 h-6 text-yellow-500" />
      ) : (
        <MoonIcon className="w-6 h-6 text-gray-600" />
      )}
    </button>
  );
}
