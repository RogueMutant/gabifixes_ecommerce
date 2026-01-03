"use client";
import { IProduct, IReview } from "@/app/lib/custom";
import { reviewsData } from "@/app/lib/data";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/app/store/cart";

export const ProductImage = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col items-center w-full md:w-1/2">
      <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-md">
        <Image
          src={selectedImage}
          alt="Product image"
          fill
          className="object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex mt-4 gap-3 justify-center flex-wrap">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImage(img)}
            className={`relative w-16 h-16 rounded-md overflow-hidden cursor-pointer border-2 ${
              selectedImage === img ? "border-green-500" : "border-transparent"
            }`}
          >
            <Image src={img} alt="Thumbnail" fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProductDescription = ({ product }: { product: IProduct }) => {
  return (
    <div className="w-full md:w-1/2 md:pl-6 space-y-3">
      <span className="text-sm text-gray-500 uppercase tracking-widest font-semibold">
        {product.category}
      </span>
      <h2 className="text-2xl font-semibold">{product.name}</h2>
      <p className="text-lg font-medium text-green-600">${product.price}</p>
      <p className="text-gray-700 leading-relaxed">{product.description}</p>
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
    <div className="w-full bg-gray-50 rounded-lg p-4 my-2 shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left font-medium text-gray-800 hover:text-green-600"
      >
        {title}
      </button>
      {open && (
        <p className="mt-2 text-sm md:text-base text-gray-700 leading-relaxed">
          {content}
        </p>
      )}
    </div>
  );
};

export const ReviewContainer = () => {
  return (
    <div className="w-full mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviewsData.map((r, idx) => (
        <ReviewsCard key={idx} {...r} />
      ))}
    </div>
  );
};

export const ReviewsCard = (review: IReview) => {
  const date = new Date(review.created_at);
  const formatted = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-4">
      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
        <Image
          src={review.image}
          alt={`${review.name}'s image`}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 text-center sm:text-left">
        <p className="font-semibold text-gray-800">{review.name}</p>

        <p className="text-xs text-gray-500 mb-1">{formatted}</p>

        <div className="text-yellow-500 text-sm mb-1">⭐ {review.rating}</div>
        <p className="text-sm text-gray-600">{review.review}</p>
      </div>
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
    <div className="relative max-w-6xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md">
      {/* SUCCESS MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold mb-2">Added to Cart</h2>
            <p className="text-gray-600 mb-4">
              {product.name} has been added to your cart.
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-start gap-8">
        <ProductImage images={product.image} />

        <div className="flex flex-col w-full md:w-1/2">
          <ProductDescription product={product} />

          <ProductInfoSection
            title="Description"
            content={product.description}
          />
          <ProductInfoSection
            title="Ingredients"
            content={product.ingredients}
          />
          <ProductInfoSection title="How to Use" content={product.howToUse} />

          {/* QUANTITY */}
          <div className="flex items-center space-x-4 mt-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-16 text-center border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />

              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>

      <ReviewContainer />
    </div>
  );
};
