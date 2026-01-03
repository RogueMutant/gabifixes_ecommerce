import { fetchCustomers } from "@/app/lib/actions";
import CustomersTable from "@/app/ui/admin/customers/table";
import TableSearch from "@/app/ui/admin/table-search";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers | Gabi Fixes Admin",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  const customers = await fetchCustomers(query);

  return (
    <main className="w-full">
      <div className="flex w-full items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Customers
        </h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Suspense fallback={<div>Loading search...</div>}>
          <TableSearch placeholder="Search customers..." />
        </Suspense>
      </div>
      <CustomersTable customers={customers} />
    </main>
  );
}
