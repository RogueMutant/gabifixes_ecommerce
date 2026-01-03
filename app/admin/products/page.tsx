import { fetchProducts } from "@/app/lib/actions";
import ProductsTable from "@/app/ui/admin/products/table";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Metadata } from "next";
import { Suspense } from "react";
import ToastListener from "@/app/ui/toast-listener";

export const metadata: Metadata = {
  title: "Products | Gabi Fixes Admin",
};

export default async function Page() {
  // Search params could be added here
  const products = await fetchProducts();

  return (
    <main className="w-full">
      <Suspense fallback={null}>
        <ToastListener />
      </Suspense>
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Products
        </h1>
        <Link
          href="/admin/products/create"
          className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          <span className="hidden md:block">Create Product</span>
          <PlusIcon className="h-5 md:ml-4" />
        </Link>
      </div>
      <ProductsTable products={products} />
    </main>
  );
}
