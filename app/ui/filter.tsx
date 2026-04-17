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

  const clearFilters = () => {
    setLocalFilters({
      category: "",
      minPrice: "0",
      maxPrice: "200",
      skintype: "",
      brand: "",
    });
    const params = new URLSearchParams();
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  };

  const content = (
    <div className={clsx("flex flex-col gap-8", { "p-6": !inline })}>
      {!inline && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-serif text-2xl text-charcoal">
            Filters
          </h2>
          <button onClick={onClose} className="p-2 text-charcoal hover:text-forest transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
      )}

      {inline && (
        <h2 className="font-serif text-2xl text-charcoal mb-4">
          Filters
        </h2>
      )}

      {/* Category Section */}
      <div>
        <h3 className="text-xs tracking-[0.15em] uppercase text-charcoal font-medium mb-5">
          Category
        </h3>
        <div className="space-y-3">
          {["Makeup", "Skincare", "Fragrance", "Haircare"].map((cat) => (
            <label key={cat} className="group flex items-center cursor-pointer">
              <div className="relative flex items-center justify-center w-4 h-4">
                <input
                  type="radio"
                  name="category"
                  className="peer sr-only"
                  checked={localFilters.category === cat}
                  onChange={() => handleFilterChange("category", cat)}
                />
                <div className="w-4 h-4 border border-stone/40 peer-checked:border-forest peer-checked:bg-forest transition-all" />
                <svg
                  className="absolute w-2.5 h-2.5 text-cream scale-0 peer-checked:scale-100 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="ml-3 text-sm text-stone group-hover:text-charcoal transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      <div>
        <h3 className="text-xs tracking-[0.15em] uppercase text-charcoal font-medium mb-5">
          Price Range
        </h3>
        <div>
          <input
            type="range"
            min="0"
            max="200"
            step="10"
            value={localFilters.maxPrice}
            onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            className="w-full h-1 bg-stone/20 appearance-none cursor-pointer accent-forest"
          />
          <div className="flex justify-between mt-3 text-xs text-stone">
            <span>$0</span>
            <span className="text-charcoal font-medium">${localFilters.maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Skin Type Section */}
      <div>
        <h3 className="text-xs tracking-[0.15em] uppercase text-charcoal font-medium mb-5">
          Skin Type
        </h3>
        <div className="space-y-3">
          {["Oily", "Dry", "Combination", "Sensitive"].map((type) => (
            <label key={type} className="group flex items-center cursor-pointer">
              <div className="relative flex items-center justify-center w-4 h-4">
                <input
                  type="radio"
                  name="skintype"
                  className="peer sr-only"
                  checked={localFilters.skintype === type}
                  onChange={() => handleFilterChange("skintype", type)}
                />
                <div className="w-4 h-4 border border-stone/40 peer-checked:border-forest peer-checked:bg-forest transition-all" />
                <svg
                  className="absolute w-2.5 h-2.5 text-cream scale-0 peer-checked:scale-100 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="ml-3 text-sm text-stone group-hover:text-charcoal transition-colors">
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mt-4">
        <button
          onClick={applyFilters}
          className="w-full py-4 bg-forest text-cream text-xs tracking-[0.15em] uppercase font-medium hover:bg-forest-light transition-colors"
        >
          Apply Filters
        </button>
        <button
          onClick={clearFilters}
          className="w-full py-4 border border-stone/30 text-charcoal text-xs tracking-[0.15em] uppercase font-medium hover:border-charcoal transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>
  );

  if (inline) return content;

  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 bg-charcoal/50 z-40 transition-opacity duration-300",
          {
            "opacity-100 pointer-events-auto": open,
            "opacity-0 pointer-events-none": !open,
          }
        )}
        onClick={onClose}
      />
      <div
        className={clsx(
          "fixed top-0 right-0 z-50 h-full w-80 bg-cream transition-transform duration-300 overflow-y-auto",
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
