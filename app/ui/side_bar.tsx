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
          "fixed top-0 left-0 z-50 min-h-screen w-72 flex-col bg-black gap-4 px-6 transition-transform duration-300",
          {
            "translate-x-0": open,
            "-translate-x-full": !open,
          }
        )}
      >
        <div className="w-full flex items-center justify-between py-6 mb-6">
          <h2 className="text-white font-bold text-xl">Gabi Fixes</h2>
          <button onClick={onClose} aria-label="Close sidebar">
            <XMarkIcon className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {categoryIcons.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="group flex items-center gap-4"
              onClick={onClose}
            >
              <div className="w-6 flex justify-center">
                <Icon className="text-white h-6 w-6 group-hover:text-green-500 transition-colors" />
              </div>
              <span className="text-green-600 font-medium group-hover:text-white transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col gap-6">
          <Link
            href={"/home/profile"}
            className="group flex items-center gap-4"
            onClick={onClose}
          >
            <div className="w-6 flex justify-center">
              <UserIcon className="w-6 h-6 text-white group-hover:text-green-500 transition-colors" />
            </div>
            <span className="text-green-600 font-medium group-hover:text-white transition-colors">
              Profile
            </span>
          </Link>
          <Link
            href={"/home/profile"}
            className="group flex items-center gap-4"
            onClick={onClose}
          >
            <div className="w-6 flex justify-center">
              <WrenchIcon className="w-6 h-6 text-white group-hover:text-green-500 transition-colors" />
            </div>
            <span className="text-green-600 font-medium group-hover:text-white transition-colors">
              Settings
            </span>
          </Link>
          <Link
            href={"/login"}
            className="group flex items-center gap-4"
            onClick={onClose}
          >
            <div className="w-6 flex justify-center">
              <ArrowLeftEndOnRectangleIcon className="w-6 h-6 text-white group-hover:text-green-500 transition-colors" />
            </div>
            <span className="text-green-600 font-medium group-hover:text-white transition-colors">
              Logout
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
