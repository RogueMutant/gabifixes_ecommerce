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
