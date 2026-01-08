import { fetchOrders } from "@/app/lib/actions";
import OrdersTable from "@/app/ui/admin/orders/table";
import Pagination from "@/app/ui/pagination";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || ""; // Query not yet implemented in fetchOrders
  const currentPage = Number(searchParams?.page) || 1;

  const { orders, totalPages } = await fetchOrders(query, currentPage);

  return (
    <main className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Orders
        </h1>
      </div>
      <OrdersTable orders={orders} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
