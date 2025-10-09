import ShoppingCart from "@/app/ui/shop/cart/cart";
import { CardSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <Suspense fallback={<CardSkeleton />}>
        <ShoppingCart />
      </Suspense>
    </div>
  );
}
