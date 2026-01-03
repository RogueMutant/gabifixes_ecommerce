import { fetchAnalytics } from "@/app/lib/actions";
import { RevenueChart, OrdersChart } from "@/app/ui/admin/analytics/charts";
import {
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Metadata } from "next";
import ProductImage from "@/app/ui/product-image";

export const metadata: Metadata = {
  title: "Analytics | Gabi Fixes Admin",
};

export default async function Page() {
  const { totalRevenue, totalOrders, totalCustomers, salesData, topProducts } =
    await fetchAnalytics();

  return (
    <main className="w-full">
      <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
        Analytics
      </h1>

      {/* Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-3 mb-8">
        <Card
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={CurrencyDollarIcon}
        />
        <Card
          title="Total Orders"
          value={totalOrders.toString()}
          icon={ShoppingBagIcon}
        />
        <Card
          title="Total Customers"
          value={totalCustomers.toString()}
          icon={UsersIcon}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <RevenueChart data={salesData} />
        <OrdersChart data={salesData} />
      </div>

      {/* Top Products */}
      <div className="w-full rounded-lg bg-white dark:bg-gray-800 p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
          Top Selling Products
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="font-normal text-gray-500 dark:text-gray-400 py-3">
                  Product
                </th>
                <th className="font-normal text-gray-500 dark:text-gray-400 py-3 text-right">
                  Sold
                </th>
                <th className="font-normal text-gray-500 dark:text-gray-400 py-3 text-right">
                  Revenue (Est.)
                </th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product: any) => (
                <tr
                  key={product._id}
                  className="border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/20"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <ProductImage
                        url={product.image}
                        alt={product.name}
                        size={32}
                      />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-right text-gray-700 dark:text-gray-300">
                    {product.quantity}
                  </td>
                  <td className="py-4 text-right text-gray-700 dark:text-gray-300">
                    ${(product.quantity * product.price).toFixed(2)}
                  </td>
                </tr>
              ))}
              {topProducts.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

function Card({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: any;
}) {
  return (
    <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center">
        <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 mr-4">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {value}
          </h3>
        </div>
      </div>
    </div>
  );
}
