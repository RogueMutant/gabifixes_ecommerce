"use client";

import { updateOrderStatus } from "@/app/lib/actions";
import { clsx } from "clsx";
import { useState } from "react";

interface Order {
  _id: string;
  customer: {
    name: string;
    email: string;
  } | null;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-2 md:pt-0">
          <table className="min-w-full text-gray-900 dark:text-gray-100">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {order.customer?.name || "Unknown Customer"}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {order.customer?.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-gray-500 dark:text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 font-medium">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <StatusSelector
                      orderId={order._id}
                      currentStatus={order.status}
                    />
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-gray-500">
                    No orders found.
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

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500",
    Processing:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500",
    Shipped:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500",
    Delivered:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500",
    Cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        styles[status] || "bg-gray-100 text-gray-800"
      )}
    >
      {status}
    </span>
  );
}

function StatusSelector({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    await updateOrderStatus(orderId, e.target.value);
    setLoading(false);
  };

  return (
    <select
      disabled={loading}
      className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:max-w-xs sm:text-sm sm:leading-6 disabled:opacity-50"
      defaultValue={currentStatus}
      onChange={handleChange}
    >
      <option value="Pending">Pending</option>
      <option value="Processing">Processing</option>
      <option value="Shipped">Shipped</option>
      <option value="Delivered">Delivered</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  );
}
