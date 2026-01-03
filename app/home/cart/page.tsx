"use client";
import ShoppingCart from "@/app/ui/shop/cart/cart";
import { CardSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { useCart } from "@/app/store/cart";

export default function Page() {
  const cart = useCart();

  return (
    <div>
      <Suspense fallback={<CardSkeleton />}>
        <ShoppingCart cartItems={cart.cart} />
      </Suspense>
    </div>
  );
}
