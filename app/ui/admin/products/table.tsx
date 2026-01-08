"use client";

import { deleteProduct } from "@/app/lib/actions";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ProductImage from "@/app/ui/product-image";
import { useState } from "react";
import { ConfirmationModal } from "@/app/ui/confirmation-modal";
import { useToast } from "@/app/ui/toast";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string[];
}

export default function ProductsTable({ products }: { products: Product[] }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-2 md:pt-0">
          <table className="min-w-full text-gray-900 dark:text-gray-100">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Product
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Category
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Price
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Stock
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <ProductImage
                        url={product.image[0] || "/public/My-logo.png"}
                        alt={product.name}
                        size={40}
                      />
                      <p className="font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-gray-500 dark:text-gray-400">
                    {product.category}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 font-medium">
                    ${product.price}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.stock}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="rounded-md border p-2 hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"
                      >
                        <PencilSquareIcon className="w-5" />
                      </Link>
                      <DeleteProductButton
                        id={product.id}
                        name={product.name}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    const result = await deleteProduct(id);
    setIsOpen(false);
    if (result.message.includes("Error")) {
      showToast(result.message, "error");
    } else {
      showToast(`Deleted ${name}`, "success");
      // Revalidation happens on server, but router.refresh ensures client sees it if using soft nav
      router.refresh();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md border p-2 hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600 text-red-600 hover:text-red-500"
      >
        <TrashIcon className="w-5" />
      </button>

      <ConfirmationModal
        isOpen={isOpen}
        title="Delete Product"
        message={`Are you sure you want to delete "${name}"? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
}
