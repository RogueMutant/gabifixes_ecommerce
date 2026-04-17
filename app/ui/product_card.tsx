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
      {/* Image Container */}
      <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-cream-dark">
        <Image
          src={product.image[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-300" />
        
        {/* Out of Stock Badge */}
        {product.stock === 0 && (
          <div className="absolute top-4 left-4 bg-cream px-3 py-1.5">
            <span className="text-xs tracking-[0.15em] uppercase text-stone font-medium">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-2 px-1">
        {/* Category */}
        <span className="text-xs tracking-[0.15em] uppercase text-stone">
          {product.category}
        </span>
        
        {/* Name */}
        <h3 className="font-serif text-xl text-charcoal leading-tight group-hover:text-forest transition-colors duration-300">
          {product.name}
        </h3>
        
        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg text-charcoal">
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
            All Products
          </h2>
          <p className="text-stone text-sm mt-2">
            Curated essentials for radiant skin
          </p>
        </div>
        
        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <span className="text-xs tracking-[0.1em] uppercase text-stone hidden sm:block">
            Sort by
          </span>
          <select
            className="bg-transparent text-sm text-charcoal border border-stone/30 py-2.5 px-4 pr-10 outline-none focus:border-charcoal transition-colors cursor-pointer appearance-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B6B6B'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1rem",
            }}
          >
            <option>Popularity</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
