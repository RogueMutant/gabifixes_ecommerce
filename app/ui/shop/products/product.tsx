"use client";
import { IProduct, IReview } from "@/app/lib/custom";
import { reviewsData } from "@/app/lib/data";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/app/store/cart";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export const ProductImage = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-6 w-full lg:w-1/2">
      {/* Main Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
        <Image
          src={selectedImage}
          alt="Product image"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`relative w-20 h-20 overflow-hidden transition-all duration-300 ${
                selectedImage === img
                  ? "ring-2 ring-forest ring-offset-2 ring-offset-cream"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={img} alt="Thumbnail" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const ProductDescription = ({ product }: { product: IProduct }) => {
  return (
    <div className="space-y-6">
      {/* Category */}
      <span className="text-xs tracking-[0.2em] uppercase text-stone font-medium">
        {product.category}
      </span>

      {/* Title */}
      <h1 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight">
        {product.name}
      </h1>

      {/* Price */}
      <p className="text-2xl text-charcoal font-light">
        ${product.price.toFixed(2)}
      </p>

      {/* Description */}
      <p className="text-stone leading-relaxed text-base max-w-md">
        {product.description}
      </p>
    </div>
  );
};

export const ProductInfoSection = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-stone/20">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="text-sm tracking-[0.1em] uppercase text-charcoal font-medium">
          {title}
        </span>
        <span className="text-stone text-xl transition-transform duration-300 group-hover:text-charcoal">
          {open ? "−" : "+"}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-stone leading-relaxed text-sm">
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ReviewContainer = () => {
  return (
    <section className="mt-24 pt-16 border-t border-stone/20">
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-3">
          What Our Customers Say
        </h2>
        <p className="text-stone text-sm tracking-wide">
          Real reviews from real people
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviewsData.map((r, idx) => (
          <ReviewsCard key={idx} {...r} />
        ))}
      </div>
    </section>
  );
};

export const ReviewsCard = (review: IReview) => {
  const date = new Date(review.created_at);
  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-cream-dark p-8">
      <div className="flex items-start gap-4 mb-6">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={review.image}
            alt={`${review.name}'s image`}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-medium text-charcoal">{review.name}</p>
          <p className="text-xs text-stone">{formatted}</p>
        </div>
      </div>

      {/* Star Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < review.rating ? "text-forest" : "text-stone/30"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <p className="text-stone leading-relaxed text-sm italic">
        &quot;{review.review}&quot;
      </p>
    </div>
  );
};

export const ProductContainer = ({ product }: { product: IProduct }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-stone">
          <li>
            <Link href="/home" className="hover:text-charcoal transition-colors">
              Shop
            </Link>
          </li>
          <li>/</li>
          <li>
            <span className="text-charcoal">{product.name}</span>
          </li>
        </ol>
      </nav>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/50 flex justify-center items-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-cream p-8 md:p-12 max-w-md w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-forest/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-forest"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="font-serif text-2xl text-charcoal mb-2">
                Added to Cart
              </h2>
              <p className="text-stone mb-8">
                {product.name} has been added to your cart.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/home"
                  className="w-full py-4 bg-forest text-cream text-sm tracking-[0.15em] uppercase font-medium hover:bg-forest-light transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  Continue Shopping
                </Link>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-4 border border-stone/30 text-charcoal text-sm tracking-[0.15em] uppercase font-medium hover:border-charcoal transition-colors"
                >
                  View Cart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Layout */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        <ProductImage images={product.image} />

        <div className="flex-1 lg:max-w-lg">
          <ProductDescription product={product} />

          {/* Quantity Selector */}
          <div className="mt-8 mb-6">
            <label className="text-xs tracking-[0.15em] uppercase text-stone block mb-3">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="w-12 h-12 flex items-center justify-center border border-stone/30 text-charcoal hover:border-charcoal transition-colors disabled:opacity-40"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <span className="text-xl">−</span>
              </button>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-16 h-12 text-center border border-stone/30 text-charcoal bg-transparent focus:outline-none focus:border-charcoal transition-colors"
              />

              <button
                type="button"
                className="w-12 h-12 flex items-center justify-center border border-stone/30 text-charcoal hover:border-charcoal transition-colors"
                onClick={() => setQuantity(quantity + 1)}
              >
                <span className="text-xl">+</span>
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full py-5 bg-forest text-cream text-sm tracking-[0.2em] uppercase font-medium hover:bg-forest-light transition-colors disabled:bg-stone/50 disabled:cursor-not-allowed"
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>

          {/* Stock Indicator */}
          {product.stock > 0 && product.stock <= 10 && (
            <p className="mt-3 text-sm text-stone text-center">
              Only {product.stock} left in stock
            </p>
          )}

          {/* Accordions */}
          <div className="mt-10">
            <ProductInfoSection
              title="Description"
              content={product.description}
            />
            <ProductInfoSection
              title="Ingredients"
              content={product.ingredients}
            />
            <ProductInfoSection title="How to Use" content={product.howToUse} />
          </div>
        </div>
      </div>

      {/* Reviews */}
      <ReviewContainer />
    </div>
  );
};
