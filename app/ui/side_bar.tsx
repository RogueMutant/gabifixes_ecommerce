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
  { href: "/products/makeup", label: "MakeUp", icon: PaintBrushIcon },
  { href: "/products/skincare", label: "Skincare", icon: SparklesIcon },
  { href: "/products/haircare", label: "HairCare", icon: ScissorsIcon },
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
      <div
        className={clsx(
          "fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300",
          {
            "opacity-50 pointer-events-auto": open,
            "opacity-0 pointer-events-none": !open,
          }
        )}
        onClick={onClose}
      />
      <div
        className={clsx(
          "fixed top-0 left-0 z-50 min-h-screen w-72 flex-col bg-black gap-4 px-3 transition-transform duration-300",
          {
            "translate-x-0": open,
            "-translate-x-full": !open,
          }
        )}
      >
        <div className="w-full flex items-center justify-between py-4 mb-6">
          <h2 className="text-white font-bold">Gabi Fixes</h2>
          <button onClick={onClose} aria-label="Close sidebar">
            <XMarkIcon className="w-6 h-6 text-white" />
          </button>
        </div>

        {categoryIcons.map(({ href, label, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 mb-4"
          >
            <Icon className="text-white h-5 w-5 mb-1" />
            <span className="text-green-600 font-light">{label}</span>
          </Link>
        ))}
        <div className="border-t border-gray-700 pt-4">
          <Link href={"/home/profile"} className="flex items-center gap-3">
            <UserIcon className="w-5 h-5 text-white" />
            <span className="text-green-600 font-medium">Profile</span>
          </Link>
          <Link
            href={"accounts/settings"}
            className="flex items-center gap-3 mt-4"
          >
            <WrenchIcon className="w-5 h-5 text-white" />
            <span className="text-green-600 font-medium">Settings</span>
          </Link>
          <Link href={"/signup"} className="flex items-center gap-3 mt-4">
            <ArrowLeftEndOnRectangleIcon className="w-5 h-5 text-white" />
            <span className="text-green-600 font-medium">Logout</span>
          </Link>
        </div>
      </div>
    </>
  );
}
