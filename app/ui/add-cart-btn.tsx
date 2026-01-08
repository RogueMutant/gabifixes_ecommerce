import { IProduct } from "../lib/custom";
import { useCart } from "../store/cart";

export function AddToCartbtn({
  product,
  variant = "large",
}: {
  product: IProduct;
  variant?: "small" | "large";
}) {
  const addToCart = useCart((state) => state.addToCart);

  if (variant === "small") {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product, 1);
        }}
        className="h-8 px-4 bg-green-100 text-green-600 text-xs font-black uppercase tracking-widest rounded-full hover:bg-green-500 hover:text-white transition-all whitespace-nowrap active:scale-95"
      >
        Add to Cart
      </button>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        addToCart(product, 1);
      }}
      className="w-full mt-4 h-12 bg-green-500 text-white text-sm font-black uppercase tracking-widest rounded-xl hover:bg-green-600 transition-all active:scale-95 shadow-md shadow-green-500/20"
    >
      Add to Cart
    </button>
  );
}
