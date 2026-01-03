import { fetchOrders } from "@/app/lib/actions";
import OrdersTable from "@/app/ui/admin/orders/table";

export default async function Page() {
  const orders = await fetchOrders();

  return (
    <main className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Orders
        </h1>
      </div>
      <OrdersTable orders={orders} />
    </main>
  );
}
