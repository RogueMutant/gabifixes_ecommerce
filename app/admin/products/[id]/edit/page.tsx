import ProductForm from "@/app/ui/admin/products/create-form";
import { fetchProductById, fetchCategories } from "@/app/lib/actions";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Product | Gabi Fixes Admin",
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [product, categories] = await Promise.all([
    fetchProductById(id),
    fetchCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <main className="w-full max-w-4xl mx-auto">
      <h1 className="mb-8 text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
        Edit Product
      </h1>
      <ProductForm product={product} categories={categories} />
    </main>
  );
}
