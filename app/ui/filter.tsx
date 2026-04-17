"use client";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const CATEGORIES = ["Makeup", "Skincare", "Fragrance", "Haircare"];
const SKIN_TYPES = ["Oily", "Dry", "Combination", "Sensitive", "All"];

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

  // Initialize from URL params
  const getInitialFilters = useCallback(() => ({
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "0",
    maxPrice: searchParams.get("maxPrice") || "200",
    skintype: searchParams.get("skintype") || "",
  }), [searchParams]);

  const [localFilters, setLocalFilters] = useState(getInitialFilters);

  // Sync state when URL changes
  useEffect(() => {
    setLocalFilters(getInitialFilters());
  }, [getInitialFilters]);

  const handleFilterChange = (name: string, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    // Category filter
    if (localFilters.category) {
      params.set("category", localFilters.category);
    } else {
      params.delete("category");
    }

    // Price filters
    if (localFilters.minPrice && localFilters.minPrice !== "0") {
      params.set("minPrice", localFilters.minPrice);
    } else {
      params.delete("minPrice");
    }

    if (localFilters.maxPrice && localFilters.maxPrice !== "200") {
      params.set("maxPrice", localFilters.maxPrice);
    } else {
      params.delete("maxPrice");
    }

    // Skin type filter
    if (localFilters.skintype && localFilters.skintype !== "All") {
      params.set("skintype", localFilters.skintype);
    } else {
      params.delete("skintype");
    }

    replace(`${pathname}?${params.toString()}`);
    if (!inline) onClose();
  };

  const clearFilters = () => {
    setLocalFilters({
      category: "",
      minPrice: "0",
      maxPrice: "200",
      skintype: "",
    });
    const params = new URLSearchParams();
    const query = searchParams.get("query");
    if (query) params.set("query", query);
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  };

  const hasActiveFilters =
    localFilters.category ||
    localFilters.skintype ||
    localFilters.minPrice !== "0" ||
    localFilters.maxPrice !== "200";

  const content = (
    <div className={clsx("flex flex-col gap-8", { "p-6": !inline })}>
      {!inline && (
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-serif text-2xl text-charcoal">Refine</h2>
          <button
            onClick={onClose}
            className="p-2 text-charcoal hover:text-forest transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
      )}

      {inline && (
        <h2 className="font-serif text-2xl text-charcoal mb-2">Refine</h2>
      )}

      {/* Category Section */}
      <div>
        <h3 className="text-xs tracking-[0.15em] uppercase text-charcoal font-medium mb-4">
          Category
        </h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="group flex items-center cursor-pointer py-1">
              <div className="relative flex items-center justify-center w-5 h-5">
                <input
                  type="radio"
                  name="category"
                  className="peer sr-only"
                  checked={localFilters.category === cat}
                  onChange={() => handleFilterChange("category", localFilters.category === cat ? "" : cat)}
                />
                <div className="w-5 h-5 border border-stone/40 peer-checked:border-forest peer-checked:bg-forest transition-all" />
                {localFilters.category === cat && (
                  <CheckIcon className="absolute w-3 h-3 text-cream" strokeWidth={3} />
                )}
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
        <h3 className="text-xs tracking-[0.15em] uppercase text-charcoal font-medium mb-4">
          Price Range
        </h3>
        <div className="space-y-4">
          <div>
            <input
              type="range"
              min="0"
              max="200"
              step="10"
              value={localFilters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              className="w-full h-1 bg-stone/20 appearance-none cursor-pointer accent-forest [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-forest [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <div className="flex justify-between mt-3 text-xs text-stone">
              <span>$0</span>
              <span className="text-charcoal font-medium">Up to ${localFilters.maxPrice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skin Type Section */}
      <div>
        <h3 className="text-xs tracking-[0.15em] uppercase text-charcoal font-medium mb-4">
          Skin Type
        </h3>
        <div className="space-y-2">
          {SKIN_TYPES.map((type) => (
            <label key={type} className="group flex items-center cursor-pointer py-1">
              <div className="relative flex items-center justify-center w-5 h-5">
                <input
                  type="radio"
                  name="skintype"
                  className="peer sr-only"
                  checked={localFilters.skintype === type}
                  onChange={() => handleFilterChange("skintype", localFilters.skintype === type ? "" : type)}
                />
                <div className="w-5 h-5 border border-stone/40 peer-checked:border-forest peer-checked:bg-forest transition-all" />
                {localFilters.skintype === type && (
                  <CheckIcon className="absolute w-3 h-3 text-cream" strokeWidth={3} />
                )}
              </div>
              <span className="ml-3 text-sm text-stone group-hover:text-charcoal transition-colors">
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-stone/10">
        <button
          onClick={applyFilters}
          className="w-full py-4 bg-forest text-cream text-xs tracking-[0.15em] uppercase font-medium hover:bg-forest-light transition-colors"
        >
          Apply Filters
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="w-full py-4 border border-stone/30 text-charcoal text-xs tracking-[0.15em] uppercase font-medium hover:border-charcoal transition-colors"
          >
            Clear All
          </button>
        )}
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
