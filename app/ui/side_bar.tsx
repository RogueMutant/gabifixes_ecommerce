"use client";
import {
  PaintBrushIcon,
  SparklesIcon,
  ScissorsIcon,
  WrenchIcon,
  HomeIcon,
  UserIcon,
  ArrowLeftEndOnRectangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";

const categoryIcons = [
  { href: "/home", label: "Home", icon: HomeIcon },
  { href: "/products/makeup", label: "Makeup", icon: PaintBrushIcon },
  { href: "/products/skincare", label: "Skincare", icon: SparklesIcon },
  { href: "/products/haircare", label: "Haircare", icon: ScissorsIcon },
];

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          "fixed inset-0 bg-charcoal/60 z-40 transition-opacity duration-300",
          {
            "opacity-100 pointer-events-auto": open,
            "opacity-0 pointer-events-none": !open,
          }
        )}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div
        className={clsx(
          "fixed top-0 left-0 z-50 min-h-screen w-80 flex-col bg-cream transition-transform duration-300",
          {
            "translate-x-0": open,
            "-translate-x-full": !open,
          }
        )}
      >
        {/* Header */}
        <div className="w-full flex items-center justify-between py-6 px-6 border-b border-stone/10">
          <span className="font-serif text-2xl text-charcoal tracking-wide">
            Gabi Fixes
          </span>
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="p-2 text-charcoal hover:text-forest transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-1 px-4 py-6">
          {categoryIcons.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="group flex items-center gap-4 px-4 py-4 hover:bg-cream-dark transition-colors"
              onClick={onClose}
            >
              <Icon className="text-stone h-5 w-5 group-hover:text-forest transition-colors" />
              <span className="text-charcoal text-sm tracking-wide group-hover:text-forest transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-stone/10 mx-6" />

        {/* Account Links */}
        <div className="flex flex-col gap-1 px-4 py-6">
          <Link
            href="/home/profile"
            className="group flex items-center gap-4 px-4 py-4 hover:bg-cream-dark transition-colors"
            onClick={onClose}
          >
            <UserIcon className="w-5 h-5 text-stone group-hover:text-forest transition-colors" />
            <span className="text-charcoal text-sm tracking-wide group-hover:text-forest transition-colors">
              Profile
            </span>
          </Link>
          <Link
            href="/home/profile"
            className="group flex items-center gap-4 px-4 py-4 hover:bg-cream-dark transition-colors"
            onClick={onClose}
          >
            <WrenchIcon className="w-5 h-5 text-stone group-hover:text-forest transition-colors" />
            <span className="text-charcoal text-sm tracking-wide group-hover:text-forest transition-colors">
              Settings
            </span>
          </Link>
          <Link
            href="/login"
            className="group flex items-center gap-4 px-4 py-4 hover:bg-cream-dark transition-colors"
            onClick={onClose}
          >
            <ArrowLeftEndOnRectangleIcon className="w-5 h-5 text-stone group-hover:text-forest transition-colors" />
            <span className="text-charcoal text-sm tracking-wide group-hover:text-forest transition-colors">
              Logout
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
