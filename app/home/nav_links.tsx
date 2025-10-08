"use client";

import {
  HomeIcon,
  HeartIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/home", label: "Home", icon: HomeIcon },
  { href: "/wishlist", label: "Wishlist", icon: HeartIcon },
  { href: "/profile", label: "Profile", icon: UserIcon },
  { href: "/cart", label: "Shop", icon: ShoppingBagIcon },
];
export function NavLinks() {
  const pathName = usePathname();
  return (
    <nav className="w-full flex space-x-4 items-center justify-between">
      {links.map(({ href, label, icon: Icon }) => {
        const isActive = pathName === href;
        return (
          <Link
            key={href}
            href={href}
            className={clsx("flex flex-col items-center p-2")}
          >
            <Icon
              className={clsx(
                "h-5 w-5",
                isActive ? "text-green-700" : "text-gray-500"
              )}
            />
            <span
              className={clsx(
                "text-sm",
                isActive ? "text-green-700 font-semibold" : "text-gray-700"
              )}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
