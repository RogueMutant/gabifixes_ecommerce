import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-charcoal text-cream pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col col-span-1 md:col-span-1">
            <Link href="/home" className="flex items-center gap-2 mb-6">
              <span className="font-serif text-3xl text-cream tracking-wide">
                Gabi Fixes
              </span>
            </Link>
            <p className="text-stone text-sm leading-relaxed mb-8 max-w-xs">
              Curated skincare essentials crafted for radiant, healthy skin.
              Discover the ritual of self-care.
            </p>
            <div className="flex gap-5">
              <a
                href="#"
                className="text-stone hover:text-cream transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.616.074-2.736.33-3.596 1.189-.86.86-1.116 1.98-1.19 3.596-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.074 1.616.33 2.736 1.19 3.596.86.86 1.98 1.116 3.596 1.19 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.616-.074 2.736-.33 3.596-1.189.86-.86 1.116-1.98 1.19-3.596.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.074-1.616-.33-2.736-1.189-3.596-.86-.86-1.98-1.116-3.596-1.19-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.441s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.441-1.441-1.441z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-stone hover:text-cream transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-stone hover:text-cream transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-8.74h-2.94v-3.403h2.94v-2.511c0-2.91 1.777-4.493 4.371-4.493 1.242 0 2.311.092 2.622.134v3.04l-1.799.001c-1.412 0-1.686.671-1.686 1.656v2.173h3.366l-.438 3.403h-2.928v8.741h6.066c.731 0 1.325-.593 1.325-1.324v-21.351c0-.732-.594-1.325-1.325-1.325z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div className="flex flex-col">
            <h3 className="text-xs tracking-[0.2em] uppercase text-cream font-medium mb-8">
              Shop
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/home"
                  className="text-sm text-stone hover:text-cream transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/home"
                  className="text-sm text-stone hover:text-cream transition-colors"
                >
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link
                  href="/home"
                  className="text-sm text-stone hover:text-cream transition-colors"
                >
                  Sale
                </Link>
              </li>
              <li>
                <Link
                  href="/home"
                  className="text-sm text-stone hover:text-cream transition-colors"
                >
                  Gift Sets
                </Link>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div className="flex flex-col">
            <h3 className="text-xs tracking-[0.2em] uppercase text-cream font-medium mb-8">
              About
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-sm text-stone hover:text-cream transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-stone hover:text-cream transition-colors"
                >
                  Ingredients
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-stone hover:text-cream transition-colors"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-stone hover:text-cream transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Column */}
          <div className="flex flex-col">
            <h3 className="text-xs tracking-[0.2em] uppercase text-cream font-medium mb-8">
              Help
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-sm text-stone hover:text-cream transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-stone hover:text-cream transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-stone hover:text-cream transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-stone hover:text-cream transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-stone/20 pt-8 gap-4">
          <p className="text-xs text-stone">
            &copy; {new Date().getFullYear()} Gabi Fixes. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-stone">
            <span>Free shipping on orders over $75</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
