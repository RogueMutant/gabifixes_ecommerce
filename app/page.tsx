import Image from "next/image";
import Link from "next/link";
import { CategoryWrapper } from "./ui/landing_page/category_card";
import categories from "./lib/data";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full flex items-center justify-center text-center p-4">
        <Image
          src="/hero-image-1.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative top-10 z-10 flex flex-col gap-4 items-start text-left">
          <h1 className="text-white text-4xl font-bold">
            Discover Your Beauty Essentials
          </h1>
          <p className="text-white opacity-90 text-base max-w-md">
            Explore our curated collections of skincare, makeup, and more. Find
            your perfect match today.
          </p>
          <Link href="/home">
            <button className="px-5 py-2 bg-green-600 text-black font-semibold rounded-sm hover:bg-green-700 cursor-pointer">
              Shop Now
            </button>
          </Link>
        </div>
      </section>

      {/* Categories + Promotions Section */}
      <section className="w-full bg-white flex flex-col items-start justify-start gap-2 p-4">
        <h2 className="text-lg text-black font-bold">Featured Categories</h2>

        {<CategoryWrapper categories={categories} />}

        {/* Promotions */}
        <div className="w-full flex flex-col gap-2 mt-2">
          <h2 className="font-medium text-lg">Promotions</h2>

          <div className="flex items-start justify-between gap-6 w-full">
            <p className="font-light w-full md:w-1/2 text-gray-700">
              Limited time offer —{" "}
              <span className="font-bold text-black">
                20% off all skincare!
              </span>{" "}
              Pamper your skin with our premium skincare range. Offer ends soon!
            </p>

            <div className="relative w-full md:w-1/2 h-40">
              <Image
                src="/My-logo.png"
                alt="promotion"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            &copy; 2025 Beauty App. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
}
