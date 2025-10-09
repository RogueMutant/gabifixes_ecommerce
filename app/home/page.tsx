"use client";
import ProductWrapper from "../ui/product_card";
import { productData } from "../lib/data";
import { Filter } from "../ui/filter";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { Suspense, useState } from "react";
import { CardSkeleton } from "../ui/skeletons";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <section className="mb-4 flex flex-wrap justify-center">
        <div className="w-full flex items-center justify-between mb-3">
          <h2 className="text-xl text-black font-semibold">All Products</h2>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 shadow-gray-700 pb-2"
          >
            <FunnelIcon className="w-6 h-6 text-green-900" />
            <span className="text-lg font-medium">Filters</span>
          </button>
        </div>
        <Filter open={isOpen} onClose={() => setIsOpen(false)} />
        <Suspense fallback={<CardSkeleton />}>
          <ProductWrapper products={productData} />
        </Suspense>
      </section>
    </div>
  );
}
