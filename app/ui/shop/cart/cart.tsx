"use client";
import React, { useState } from "react";
import { PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { CartItem } from "@/app/lib/custom";

const ShoppingCart = ({ cartItems }: { cartItems: CartItem[] }) => {
  const [cart, setCartItems] = useState<CartItem[]>(cartItems);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Cart Items Section */}
          <div className="p-6 sm:p-8">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center gap-6 py-6 border-b border-gray-100 last:border-b-0"
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{item.size}</p>
                    <p className="text-green-600 font-bold mt-2">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 bg-gray-50 p-1.5 rounded-full border border-gray-100">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 transition text-gray-600"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-bold w-6 text-center text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 transition text-gray-600"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <p className="hidden sm:block text-xl font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                      title="Remove item"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-gray-500">
                Your cart is empty.
              </div>
            )}
          </div>

          {/* Subtotal & Checkout Section */}
          {cart.length > 0 && (
            <div className="bg-gray-50 px-6 py-8 sm:px-8 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="space-y-1">
                  <p className="text-gray-500 text-sm font-medium">
                    Order Subtotal
                  </p>
                  <p className="text-3xl font-extrabold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </p>
                </div>

                <button className="sm:w-auto w-full bg-green-500 text-white px-10 py-3.5 rounded-xl text-lg font-semibold hover:bg-green-600 transition-all shadow-md active:scale-95">
                  Proceed to Checkout
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center sm:text-left">
                Taxes and shipping calculated at checkout
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
