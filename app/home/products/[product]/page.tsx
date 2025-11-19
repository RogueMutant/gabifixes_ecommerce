"use client";

import { ProductContainer } from "@/app/ui/shop/products/product";
import { useParams } from "next/navigation";
import { productData } from "@/app/lib/data";

export default function Page() {
  const { product } = useParams();

  const selectedProduct = productData.find((p) => p.id === product);

  if (!selectedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ProductContainer product={selectedProduct} />
    </div>
  );
}
