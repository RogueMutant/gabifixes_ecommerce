"use client";

import { deleteUser } from "@/app/lib/actions";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { ConfirmationModal } from "@/app/ui/confirmation-modal";
import { useToast } from "@/app/ui/toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  registrationDate: string;
}

export default function CustomersTable({ customers }: { customers: User[] }) {
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
                  Role
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Joined
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {customers.map((customer) => (
                <tr
                  key={customer._id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {customer.image ? (
                          <Image
                            src={customer.image}
                            alt={customer.name}
                            width={32}
                            height={32}
                            className="object-cover h-full w-full"
                          />
                        ) : (
                          <span className="text-xs font-medium text-gray-500">
                            {customer.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {customer.name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-700/10">
                      {customer.role}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-gray-500 dark:text-gray-400">
                    {new Date(customer.registrationDate).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <DeleteCustomerButton
                        id={customer._id}
                        name={customer.name}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-gray-500">
                    No customers found.
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

function DeleteCustomerButton({ id, name }: { id: string; name: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    const result = await deleteUser(id);
    setIsOpen(false);
    if (result.message.includes("Error")) {
      showToast(result.message, "error");
    } else {
      showToast(`Deleted ${name}`, "success");
      router.refresh();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md border p-2 hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600 text-red-600 hover:text-red-500"
      >
        <TrashIcon className="w-5" />
      </button>

      <ConfirmationModal
        isOpen={isOpen}
        title="Delete Customer"
        message={`Are you sure you want to delete "${name}"? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
}
