"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  HomeIcon,
  ShoppingBagIcon,
  TagIcon,
  UsersIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

const links = [
  { name: "Dashboard", href: "/admin", icon: HomeIcon },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBagIcon },
  { name: "Products", href: "/admin/products", icon: TagIcon },
  { name: "Customers", href: "/admin/customers", icon: UsersIcon },
  { name: "Analytics", href: "/admin/analytics", icon: ChartBarIcon },
  { name: "Settings", href: "/admin/settings", icon: Cog6ToothIcon },
];

export function AdminSidenav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <Link
        className="mb-8 flex h-20 items-end justify-start rounded-md bg-green-600 p-4 md:h-32"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <h1 className="text-xl font-bold">Gabi Fixes Admin</h1>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3 text-gray-900 dark:text-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-green-400 decoration-none no-underline",
                {
                  "bg-green-100 text-green-600 dark:bg-gray-700 dark:text-green-400":
                    pathname === link.href,
                }
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block dark:bg-gray-900"></div>
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3 text-gray-900 dark:text-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-red-400">
            <ArrowLeftOnRectangleIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
