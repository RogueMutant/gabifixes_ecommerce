"use client";
import ProductWrapper from "../ui/product_card";
import { productData } from "../lib/data";
import { Filter } from "../ui/filter";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Page() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      {/* New arrivals section */}
      <section className="mb-4 flex flex-wrap justify-center">
        <button
          onClick={() => {}}
          className="flex items-center gap-2 mb-4 border-b-gray-400 pb-2"
        >
          <h2 className="text-xl text-black font-bold mb-6">All Products</h2>
          <h2 className="text-lg font-bold mb-4">Filters</h2>
          <FunnelIcon className="w-6 h-6 text-green-900 mb-4" />
        </button>
        {/* <Filter open={isOpen} onClose={() => setIsOpen(false)} /> */}
        <ProductWrapper products={productData} />
      </section>
      {/* Best sellers section */}
      {/* <section className="mb-4 flex flex-wrap justify-center">
        <h2 className="text-xl text-black font-bold mb-6">Best Sellers</h2>
        <ProductWrapper
          products={productData.filter((product) => product.stock > 0)}
        />
      </section> */}
    </div>
  );
}
