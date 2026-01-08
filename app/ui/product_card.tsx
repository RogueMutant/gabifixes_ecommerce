"use client";
import Image from "next/image";
import { IProduct } from "../lib/custom";
import { useRouter } from "next/navigation";
import { AddToCartbtn } from "./add-cart-btn";

export function ProductCard({ product }: { product: IProduct }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/home/products/${product.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer flex flex-col w-full"
    >
      <div className="relative aspect-square mb-5 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm transition-shadow group-hover:shadow-md">
        <Image
          src={product.image[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col gap-1 px-1">
        <h3 className="text-base font-bold text-gray-900 leading-tight group-hover:text-green-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <p className="text-lg font-black text-green-600 tracking-tight">
            ${product.price.toFixed(2)}
          </p>
          <div onClick={(e) => e.stopPropagation()}>
            <AddToCartbtn product={product} variant="small" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductWrapper({ products }: { products: IProduct[] }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
          All Products
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest hidden sm:block">
            Sort by
          </span>
          <select
            className="bg-transparent text-sm font-bold text-gray-900 border-2 border-gray-100 rounded-full py-2 px-6 pr-10 outline-none focus:border-green-500 transition-all appearance-none cursor-pointer"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23111827'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 1rem center",
              backgroundSize: "1rem",
            }}
          >
            <option>popularity</option>
            <option>newest</option>
            <option>price: low to high</option>
            <option>price: high to low</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
