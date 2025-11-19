"use client";
import Image from "next/image";
import { IProduct } from "../lib/custom";
import { useRouter } from "next/navigation";

export function ProductCard({ product }: { product: IProduct }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/home/products/${product.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white border-2 shadow-md rounded-lg p-4 hover:shadow-lg transition-all duration-200 flex flex-col items-center w-72"
    >
      <div className="relative w-48 h-48 mb-3">
        <Image
          src={product.image[0]}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-green-600 font-medium mt-1">${product.price}</p>
      {product.stock > 0 ? (
        <span className="text-sm text-gray-500">In stock</span>
      ) : (
        <span className="text-sm text-red-500">Out of stock</span>
      )}
    </div>
  );
}

export function ProductWrapper({ products }: { products: IProduct[] }) {
  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="flex flex-wrap justify-center gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination placeholder */}
      <div className="flex gap-2 justify-center items-center">
        <p className="bg-green-500 text-white px-4 py-2 rounded-full">1</p>
        <p className="bg-green-200 text-gray-400 px-4 py-2 rounded-full">2</p>
        <p className="bg-green-200 text-gray-400 px-4 py-2 rounded-full">3</p>
        <p className="bg-green-200 text-gray-400 px-4 py-2 rounded-full">...</p>
        <p className="bg-green-200 text-gray-400 px-4 py-2 rounded-full">8</p>
      </div>
    </div>
  );
}
