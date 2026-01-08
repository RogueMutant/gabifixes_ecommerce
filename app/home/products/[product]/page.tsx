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
    <div className="min-h-screen bg-gray-50 p-6">
      <ProductContainer product={selectedProduct} />
    </div>
  );
}
