import ProductForm from "@/app/ui/admin/products/create-form";
import { fetchCategories } from "@/app/lib/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Product | Gabi Fixes Admin",
};

export default async function Page() {
  const categories = await fetchCategories();

  return (
    <main className="w-full max-w-4xl mx-auto">
      <h1 className="mb-8 text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
        Create Product
      </h1>
      <ProductForm categories={categories} />
    </main>
  );
}
