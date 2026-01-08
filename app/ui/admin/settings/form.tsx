"use client";

import { updateProfile } from "@/app/lib/actions";

import { useFormStatus } from "react-dom";
import { useActionState, useEffect } from "react";
import { useToast } from "@/app/ui/toast";

interface User {
  _id: string;
  name: string;
  email: string;
}

export default function SettingsForm({ user }: { user: User }) {
  const [state, dispatch] = useActionState(updateProfile, null);
  const { showToast } = useToast();

  useEffect(() => {
    if (state?.message) {
      if (state.message.startsWith("Success")) {
        showToast(state.message, "success");
      } else {
        showToast(state.message, "error");
      }
    }
  }, [state, showToast]);

  return (
    <form
      action={dispatch}
      className="space-y-6 max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
    >
      <input type="hidden" name="id" value={user._id} />

      <div className="border-b border-gray-900/10 dark:border-gray-700/50 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
          Profile Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
          Update your account&apos;s profile information and email address.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={user.name}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white bg-white dark:bg-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 pl-3"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={user.email}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white bg-white dark:bg-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 pl-3"
              />
            </div>
          </div>

          <div className="col-span-full">
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-start">
                <span className="bg-white dark:bg-gray-800 pr-2 text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Change Password
                </span>
              </div>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              Current Password <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white bg-white dark:bg-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 pl-3"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Required to make changes.
            </p>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              New Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Leave blank to keep current"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white bg-white dark:bg-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 pl-3"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-50"
      disabled={pending}
    >
      {pending ? "Saving..." : "Save"}
    </button>
  );
}
