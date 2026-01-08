import { ProductWrapper } from "../ui/product_card";
import { Suspense } from "react";
import { CardSkeleton } from "../ui/skeletons";
import { fetchProducts } from "../lib/actions";
import Pagination from "../ui/pagination";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    skintype?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const category = searchParams?.category;
  const minPrice = searchParams?.minPrice
    ? Number(searchParams.minPrice)
    : undefined;
  const maxPrice = searchParams?.maxPrice
    ? Number(searchParams.maxPrice)
    : undefined;
  const skinType = searchParams?.skintype;

  const { products, totalPages } = await fetchProducts(query, currentPage, {
    category,
    minPrice,
    maxPrice,
    skinType,
  });

  return (
    <section className="w-full">
      <Suspense fallback={<CardSkeleton />}>
        <ProductWrapper products={products} />
      </Suspense>
      <div className="mt-16 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </section>
  );
}
