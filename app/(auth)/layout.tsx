// app/(auth)/layout.tsx
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col bg-[#faf9fb] text-gray-900">
      {/* Header */}
      <header className="w-full border-b border-gray-200">
        <nav className="max-w-6xl mx-auto flex items-center justify-between p-4 md:p-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/My-logo.png"
              alt="Gabi Fixes Logo"
              width={40}
              height={40}
              className="rounded-sm object-cover"
            />
            <span className="font-bold text-lg">Gabi Fixes</span>
          </Link>

          {/* Nav links (desktop only) */}
          <ul className="hidden md:flex gap-8 font-medium text-gray-700">
            <li className="hover:text-green-600 transition">
              <Link href="#">Shop</Link>
            </li>
            <li className="hover:text-green-600 transition">
              <Link href="#">Brands</Link>
            </li>
            <li className="hover:text-green-600 transition">
              <Link href="#">Offers</Link>
            </li>
            <li className="hover:text-green-600 transition">
              <Link href="#">Stories</Link>
            </li>
          </ul>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-full bg-green-500 text-white font-medium hover:bg-green-600 transition"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile menu icon (optional for later) */}
          <div className="md:hidden flex items-center">
            <button aria-label="Menu">
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Page content */}
      <section className="flex-grow flex items-center justify-center p-4">
        {children}
      </section>
    </main>
  );
}
