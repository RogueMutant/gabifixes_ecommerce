import { ProductContainer } from "@/app/ui/shop/products/product";
import { fetchProductById } from "@/app/lib/actions";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ product: string }>;
}) {
  const params = await props.params;
  const productId = params.product;

  const selectedProduct = await fetchProductById(productId);

  if (!selectedProduct) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <ProductContainer product={selectedProduct} />
      </div>
    </div>
  );
}
