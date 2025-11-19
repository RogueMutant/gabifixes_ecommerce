import { create } from "zustand";
import { CartItem, IProduct } from "@/app/lib/custom";

interface CartStore {
  cart: CartItem[];
  addToCart: (product: IProduct, quantity: number) => void;
}

export const useCart = create<CartStore>((set) => ({
  cart: [],
  addToCart: (product, quantity) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);

      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        cart: [
          ...state.cart,
          {
            id: product.id,
            name: product.name,
            image: product.image[0],
            price: product.price,
            quantity,
          },
        ],
      };
    }),
}));
