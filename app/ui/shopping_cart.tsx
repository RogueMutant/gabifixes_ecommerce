import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCart } from "../store/cart";
import { useEffect, useState } from "react";

export function ShoppingCartIcon() {
  const { cart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative">
      <ShoppingBagIcon className="w-6 h-6 text-green-900" />
      {mounted && itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] flex justify-center items-center shadow-sm">
          {itemCount}
        </span>
      )}
    </div>
  );
}
