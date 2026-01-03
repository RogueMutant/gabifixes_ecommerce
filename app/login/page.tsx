"use client";

import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";
import {
  ExclamationCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <main className="flex min-h-screen bg-white dark:bg-gray-950">
      {/* Left Side - Visual/Brand */}
      <div className="hidden lg:flex w-1/2 bg-green-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>{" "}
        {/* Abstract pattern placeholder */}
        <div className="relative z-10 text-center px-10">
          <h1 className="text-5xl font-bold text-white mb-6">Gabi Fixes</h1>
          <p className="text-green-100 text-xl max-w-md mx-auto">
            Manage your e-commerce platform with ease. Secure, fast, and
            reliable admin dashboard.
          </p>
        </div>
        {/* Decorational Circles */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Please enter your details to sign in.
            </p>
          </div>

          <form action={dispatch} className="mt-8 space-y-6">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email address
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:border-green-500 focus:ring-green-500 sm:text-sm transition-colors"
                    placeholder="admin@gabifixes.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    minLength={6}
                    className="block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:border-green-500 focus:ring-green-500 sm:text-sm transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div>
              <LoginButton />
            </div>

            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage && (
                <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </div>

            {/* Footer Links/Info */}
            <div className="mt-6 text-center text-sm">
              <p className="text-gray-500 dark:text-gray-400">
                Having trouble?{" "}
                <a
                  href="#"
                  className="font-semibold text-green-600 hover:text-green-500"
                >
                  Contact Support
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="group relative flex w-full justify-center rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Signing in...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          Sign in
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      )}
    </button>
  );
}
