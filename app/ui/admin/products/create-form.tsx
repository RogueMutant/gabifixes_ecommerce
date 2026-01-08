"use client";

import Link from "next/link";
import { createProduct, updateProduct } from "@/app/lib/actions";
import { ICategory } from "@/app/lib/custom";

interface Product {
  _id?: string;
  name?: string;
  price?: number;
  stock?: number;
  category?: string;
  description?: string;
  image?: string[];
  ingredients?: string;
  howToUse?: string;
}

export default function ProductForm({
  product,
  categories,
}: {
  product?: Product;
  categories: ICategory[];
}) {
  const updateProductWithId = product?._id
    ? updateProduct.bind(null, product._id)
    : createProduct;

  const handleSubmit = async (formData: FormData) => {
    const result = await updateProductWithId(formData);
    if (result?.message) {
      alert(result.message);
    }
  };

  return (
    <form
      action={handleSubmit}
      className="rounded-md bg-gray-50 dark:bg-gray-900 p-4 md:p-6 text-gray-900 dark:text-gray-100"
    >
      {/* Product Name */}
      <div className="mb-4">
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Product Name
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={product?.name}
            placeholder="Enter product name"
            className="peer block w-full rounded-md border border-gray-200 dark:border-gray-700 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 bg-white dark:bg-gray-800"
            required
          />
        </div>
      </div>

      {/* Category */}
      <div className="mb-4">
        <label htmlFor="category" className="mb-2 block text-sm font-medium">
          Category
        </label>
        <div className="relative mt-2 rounded-md">
          <select
            id="category"
            name="category"
            defaultValue={product?.category || ""}
            className="peer block w-full rounded-md border border-gray-200 dark:border-gray-700 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 bg-white dark:bg-gray-800"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price & Stock */}
      <div className="flex gap-4 mb-4">
        <div className="w-1/2">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            Price ($)
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              defaultValue={product?.price}
              placeholder="0.00"
              className="peer block w-full rounded-md border border-gray-200 dark:border-gray-700 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 bg-white dark:bg-gray-800"
              required
            />
          </div>
        </div>
        <div className="w-1/2">
          <label htmlFor="stock" className="mb-2 block text-sm font-medium">
            Stock
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="stock"
              name="stock"
              type="number"
              defaultValue={product?.stock}
              placeholder="0"
              className="peer block w-full rounded-md border border-gray-200 dark:border-gray-700 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 bg-white dark:bg-gray-800"
              required
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <label htmlFor="description" className="mb-2 block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={product?.description}
          className="peer block w-full rounded-md border border-gray-200 dark:border-gray-700 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 bg-white dark:bg-gray-800"
          required
        />
      </div>

      {/* Image URL */}
      <div className="mb-4">
        <label htmlFor="image" className="mb-2 block text-sm font-medium">
          Image URL
        </label>
        <input
          id="image"
          name="image"
          type="text"
          defaultValue={product?.image?.[0]}
          placeholder="/images/product.jpg"
          className="peer block w-full rounded-md border border-gray-200 dark:border-gray-700 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 bg-white dark:bg-gray-800"
        />
        <p className="text-xs text-gray-500 mt-1">Enter a valid path or URL.</p>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/products"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          {product ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
}
