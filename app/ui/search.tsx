import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export function Search({ open }: { open: boolean }) {
  return (
    <div
      className={clsx(
        "flex overflow-hidden w-0 items-center transition-width duration-300 ease-in-out rounded-full px-3 py-1 gap-2",
        { "w-64 ": open },
        { "scale-100": open, "transition scale-0 w-0": !open }
      )}
    >
      <input
        type="text"
        placeholder="Search products..."
        className={
          "border border-gray-300 w-64 rounded-full px-4 py-2 focus:ring-2 focus:ring-green-400  focus:outline-none"
        }
      />
      <MagnifyingGlassIcon className="h-5 w-5 text-green-900" />
    </div>
  );
}
