"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function Filter({
  open,
  onClose,
  inline = false,
}: {
  open: boolean;
  onClose: () => void;
  inline?: boolean;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [localFilters, setLocalFilters] = useState({
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "0",
    maxPrice: searchParams.get("maxPrice") || "200",
    skintype: searchParams.get("skintype") || "",
    brand: searchParams.get("brand") || "",
  });

  const handleFilterChange = (name: string, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (localFilters.category) params.set("category", localFilters.category);
    else params.delete("category");

    if (localFilters.minPrice) params.set("minPrice", localFilters.minPrice);
    if (localFilters.maxPrice) params.set("maxPrice", localFilters.maxPrice);

    if (localFilters.skintype) params.set("skintype", localFilters.skintype);
    else params.delete("skintype");

    if (localFilters.brand) params.set("brand", localFilters.brand);
    else params.delete("brand");

    replace(`${pathname}?${params.toString()}`);
    if (!inline) onClose();
  };

  const content = (
    <div className={clsx("flex flex-col gap-10", { "p-6": !inline })}>
      {!inline && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">
            Filters
          </h2>
          <button onClick={onClose}>
            <XMarkIcon className="w-8 h-8 text-gray-900" />
          </button>
        </div>
      )}

      {inline && (
        <h2 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tighter">
          Filters
        </h2>
      )}

      {/* Category Section */}
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-6 uppercase tracking-widest">
          Category
        </h3>
        <div className="space-y-4">
          {["Makeup", "Skincare", "Fragrance", "Haircare"].map((cat) => (
            <label key={cat} className="group flex items-center cursor-pointer">
              <div className="relative flex items-center justify-center w-5 h-5">
                <input
                  type="radio"
                  name="category"
                  className="peer sr-only"
                  checked={localFilters.category === cat}
                  onChange={() => handleFilterChange("category", cat)}
                />
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-green-500 transition-all" />
                <div className="absolute w-2.5 h-2.5 bg-green-500 rounded-full scale-0 peer-checked:scale-100 transition-transform" />
              </div>
              <span className="ml-3 text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-6 uppercase tracking-widest">
          Price Range
        </h3>
        <div className="px-2">
          <input
            type="range"
            min="0"
            max="200"
            step="10"
            value={localFilters.maxPrice}
            onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
          <div className="flex justify-between mt-4 text-xs font-bold text-gray-400">
            <span>$0</span>
            <span>${localFilters.maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Brand Section (Design match) */}
      <div className="hidden">
        {" "}
        {/* Hide brands as per user request to remove from nav, if applicable here too */}
        <h3 className="text-base font-bold text-gray-900 mb-6 uppercase tracking-widest">
          Brand
        </h3>
        <div className="space-y-4">
          {["Retro Cosmetics", "Vintage Beauty", "Glamour Co."].map((brand) => (
            <label
              key={brand}
              className="group flex items-center cursor-pointer"
            >
              <div className="relative flex items-center justify-center w-5 h-5">
                <input
                  type="radio"
                  name="brand"
                  className="peer sr-only"
                  checked={localFilters.brand === brand}
                  onChange={() => handleFilterChange("brand", brand)}
                />
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-green-500 transition-all" />
                <div className="absolute w-2.5 h-2.5 bg-green-500 rounded-full scale-0 peer-checked:scale-100 transition-transform" />
              </div>
              <span className="ml-3 text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Skin Type Section (Design match) */}
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-6 uppercase tracking-widest">
          Skin Type
        </h3>
        <div className="space-y-4">
          {["Oily", "Dry", "Combination", "Sensitive"].map((type) => (
            <label
              key={type}
              className="group flex items-center cursor-pointer"
            >
              <div className="relative flex items-center justify-center w-5 h-5">
                <input
                  type="radio"
                  name="skintype"
                  className="peer sr-only"
                  checked={localFilters.skintype === type}
                  onChange={() => handleFilterChange("skintype", type)}
                />
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-green-500 transition-all" />
                <div className="absolute w-2.5 h-2.5 bg-green-500 rounded-full scale-0 peer-checked:scale-100 transition-transform" />
              </div>
              <span className="ml-3 text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="w-full h-14 bg-green-500 text-white rounded-full text-sm font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-lg active:scale-95 mt-4"
      >
        Apply Filters
      </button>
    </div>
  );

  if (inline) return content;

  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 backdrop-blur-sm",
          {
            "opacity-100 pointer-events-auto": open,
            "opacity-0 pointer-events-none": !open,
          }
        )}
        onClick={onClose}
      />
      <div
        className={clsx(
          "fixed top-0 right-0 z-50 h-full w-80 bg-white transition-transform duration-300 overflow-y-auto",
          {
            "translate-x-0": open,
            "translate-x-full": !open,
          }
        )}
      >
        {content}
      </div>
    </>
  );
}
