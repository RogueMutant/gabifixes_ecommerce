import Image from "next/image";
import Link from "next/link";

export interface IProduct {
  name: string;
  stock: number;
  price: number;
  image: [string];
  description: string;
}

export function ProductCard({ product }: { product: IProduct }) {
  return (
    <div className="bg-white flex flex-col justify-between items-start w-40 h-90">
      <div className="relative w-full h-40 mb-3">
        <Image
          src={product.image[0]}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
      <p className="text-gray-500 text-sm mb-2 line-clamp-2">
        {product.description}
      </p>
      <div className="flex items-center justify-between w-full">
        <span className="text-green-700 font-bold">
          ${product.price.toFixed(2)}
        </span>
        <span className="text-xs text-gray-400">
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </span>
      </div>
      <button className="bg-green-800 w-full p-2 rounded-2xl text-white font-medium my-4 hover:bg-green-700">
        Add to cart
      </button>
    </div>
  );
}

export default function ProductWrapper({ products }: { products: IProduct[] }) {
  return (
    <div className="flex flex-col justify-start gap-4">
      <div className="flex flex-wrap gap-6">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
      <div className="flex gap-2 justify-center items-center">
        <p className="bg-green-500 text-white px-3 py-2 rounded-full">1</p>
        <p className="bg-green-200 text-gray-400 px-3 py-2 rounded-full">2</p>
        <p className="bg-green-200 text-gray-400 px-3 py-2 rounded-full">3</p>
        <p className="bg-green-200 text-gray-400 px-3 py-2 rounded-full">...</p>
        <p className="bg-green-200 text-gray-400 px-3 py-2 rounded-full">8</p>
      </div>
    </div>
  );
}
