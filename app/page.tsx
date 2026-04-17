"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const intentCategories = [
  {
    title: "Hydration",
    description: "Deep moisture for lasting radiance",
    image: "/intent-hydration.jpg",
    href: "/home?category=hydration",
  },
  {
    title: "Glow",
    description: "Luminous skin from within",
    image: "/intent-glow.jpg",
    href: "/home?category=glow",
  },
  {
    title: "Repair",
    description: "Restore and rejuvenate",
    image: "/intent-repair.jpg",
    href: "/home?category=repair",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-sm">
        <div className="flex items-center justify-between px-8 py-6 max-w-[1800px] mx-auto">
          <Link href="/" className="font-serif text-2xl text-forest tracking-wide">
            Gabi Fixes
          </Link>
          <div className="hidden md:flex items-center gap-12">
            <Link href="/home" className="text-sm text-charcoal hover:text-forest transition-colors tracking-wide">
              Shop
            </Link>
            <Link href="/home" className="text-sm text-charcoal hover:text-forest transition-colors tracking-wide">
              Story
            </Link>
            <Link href="/home" className="text-sm text-charcoal hover:text-forest transition-colors tracking-wide">
              Rituals
            </Link>
          </div>
          <Link href="/home" className="text-sm text-charcoal hover:text-forest transition-colors">
            Cart (0)
          </Link>
        </div>
      </nav>

      {/* Hero Section - Split Layout */}
      <section className="min-h-screen pt-24 flex flex-col lg:flex-row">
        {/* Text Side */}
        <motion.div
          className="flex-1 flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-16 lg:py-0"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <span className="text-sm text-stone tracking-widest uppercase mb-6">
            New Arrival
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-charcoal leading-tight mb-8 text-balance">
            The Restorative
            <br />
            Radiance Serum
          </h1>
          <p className="text-stone text-base lg:text-lg max-w-md mb-10 leading-relaxed">
            A potent blend of botanical extracts and hyaluronic acid, designed
            to transform tired skin into luminous radiance overnight.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/home"
              className="px-8 py-4 bg-forest text-cream text-sm tracking-wide hover:bg-forest-light transition-colors"
            >
              Discover Now
            </Link>
            <Link
              href="/home"
              className="px-8 py-4 border border-charcoal text-charcoal text-sm tracking-wide hover:bg-charcoal hover:text-cream transition-colors"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        {/* Image Side */}
        <motion.div
          className="flex-1 relative min-h-[60vh] lg:min-h-screen"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Image
            src="/hero-serum.jpg"
            alt="Restorative Radiance Serum"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </section>

      {/* Shop by Intent Section */}
      <section className="py-24 lg:py-32">
        <motion.div
          className="px-8 lg:px-16 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-4">
            Shop by Intent
          </h2>
          <p className="text-stone max-w-lg">
            Every skin has a story. Find the ritual that speaks to yours.
          </p>
        </motion.div>

        <div className="flex flex-col">
          {intentCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
            >
              <Link href={category.href} className="group block relative">
                <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/30 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-center px-8 lg:px-16">
                    <div>
                      <span className="text-cream/70 text-sm tracking-widest uppercase mb-2 block">
                        0{index + 1}
                      </span>
                      <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream mb-3">
                        {category.title}
                      </h3>
                      <p className="text-cream/80 text-sm md:text-base">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Product Highlight - Story Section */}
      <section className="py-24 lg:py-32 bg-cream-dark">
        <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            {/* Image */}
            <motion.div
              className="flex-1 relative aspect-square w-full max-w-2xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <Image
                src="/product-highlight.jpg"
                alt="Botanical Face Cream"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Story Text */}
            <motion.div
              className="flex-1 max-w-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <span className="text-sm text-stone tracking-widest uppercase mb-6 block">
                Our Philosophy
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-8 leading-tight">
                Crafted with
                <br />
                Intention
              </h2>
              <p className="text-stone leading-relaxed mb-6">
                Each formulation begins with a single question: what does skin
                truly need? We source the finest botanicals from sustainable farms,
                blending ancient wisdom with modern science.
              </p>
              <p className="text-stone leading-relaxed mb-10">
                Our Botanical Face Cream embodies this philosophy. Rich yet
                weightless, it melts into skin to deliver deep nourishment
                without compromise. This is skincare as it should be.
              </p>
              <Link
                href="/home"
                className="inline-block text-forest text-sm tracking-wide border-b border-forest pb-1 hover:text-forest-light hover:border-forest-light transition-colors"
              >
                Explore the Collection
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Limited Drop Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
          <motion.div
            className="relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-0 items-center">
              {/* Image */}
              <div className="flex-1 relative aspect-[4/3] w-full">
                <Image
                  src="/limited-drop.jpg"
                  alt="Limited Edition Collection"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text */}
              <motion.div
                className="flex-1 lg:pr-24"
                variants={fadeInUp}
              >
                <span className="text-sm text-stone tracking-widest uppercase mb-6 block">
                  Limited Edition
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-6 leading-tight">
                  The Autumn
                  <br />
                  Collection
                </h2>
                <p className="text-stone leading-relaxed mb-10 max-w-md">
                  Three exceptional formulations, available for a limited time.
                  Each piece crafted to capture the essence of the season.
                </p>
                <Link
                  href="/home"
                  className="inline-block px-8 py-4 bg-forest text-cream text-sm tracking-wide hover:bg-forest-light transition-colors"
                >
                  Shop the Collection
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-stone/20">
        <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div>
              <Link href="/" className="font-serif text-2xl text-forest tracking-wide">
                Gabi Fixes
              </Link>
              <p className="text-stone text-sm mt-4 max-w-xs">
                Premium skincare crafted with intention, for skin that glows from within.
              </p>
            </div>
            <div className="flex gap-16">
              <div>
                <h4 className="text-charcoal text-sm font-medium mb-4">Shop</h4>
                <ul className="space-y-3">
                  <li><Link href="/home" className="text-stone text-sm hover:text-forest transition-colors">All Products</Link></li>
                  <li><Link href="/home" className="text-stone text-sm hover:text-forest transition-colors">Serums</Link></li>
                  <li><Link href="/home" className="text-stone text-sm hover:text-forest transition-colors">Moisturizers</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-charcoal text-sm font-medium mb-4">About</h4>
                <ul className="space-y-3">
                  <li><Link href="/home" className="text-stone text-sm hover:text-forest transition-colors">Our Story</Link></li>
                  <li><Link href="/home" className="text-stone text-sm hover:text-forest transition-colors">Ingredients</Link></li>
                  <li><Link href="/home" className="text-stone text-sm hover:text-forest transition-colors">Contact</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-stone/10">
            <p className="text-stone text-xs">
              &copy; 2025 Gabi Fixes. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
