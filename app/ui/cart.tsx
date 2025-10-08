"use client";
import React, { useState } from "react";
import {
  ArrowLeftIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";

interface CartItem {
  id: number;
  name: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
}

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Hydrating Face Serum",
      size: "100ml",
      quantity: 1,
      price: 45,
      image: "/api/placeholder/80/80",
    },
    {
      id: 2,
      name: "Nourishing Night Cream",
      size: "50ml",
      quantity: 1,
      price: 38,
      image: "/api/placeholder/80/80",
    },
    {
      id: 3,
      name: "Gentle Cleansing Milk",
      size: "200ml",
      quantity: 1,
      price: 37,
      image: "/api/placeholder/80/80",
    },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-6 mb-6 lg:mb-0">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center mb-6 pb-6 border-b last:border-b-0"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-amber-100 rounded-2xl mr-4 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-200 rounded-lg"></div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold mb-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base">
                    {item.size}
                  </p>
                  <p className="text-gray-900 font-semibold mt-2 lg:hidden">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 ml-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                  >
                    <MinusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <span className="text-base sm:text-lg font-semibold w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                  >
                    <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Subtotal Section */}
            <div className="mt-8 pt-6">
              <h2 className="text-2xl font-bold mb-6">Subtotal</h2>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-lg">Subtotal</span>
                <span className="text-2xl font-bold">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="px-6 pb-6 pt-4">
              <button className="w-full bg-red-500 text-white py-4 rounded-2xl text-lg font-semibold hover:bg-red-600 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
