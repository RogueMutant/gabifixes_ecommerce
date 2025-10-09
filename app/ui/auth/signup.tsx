// app/(auth)/login/page.tsx
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 md:p-10">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-black">
        Welcome Back
      </h1>
      <p className="text-center text-gray-500 mt-1 mb-6">
        Sign in to continue your beauty journey.
      </p>

      <form className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email or Username
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Link href="#" className="text-sm text-green-500 hover:underline">
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white rounded-lg py-2 font-semibold transition"
        >
          Sign In
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        New to Gabi Fixes?{" "}
        <Link
          href="/signup"
          className="text-green-500 font-medium hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
