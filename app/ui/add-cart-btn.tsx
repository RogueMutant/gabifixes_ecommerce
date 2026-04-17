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
        disabled={product.stock === 0}
        className="h-10 px-5 bg-forest text-cream text-xs tracking-[0.1em] uppercase font-medium hover:bg-forest-light transition-colors whitespace-nowrap active:scale-[0.98] disabled:bg-stone/30 disabled:cursor-not-allowed"
      >
        {product.stock === 0 ? "Sold Out" : "Add"}
      </button>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        addToCart(product, 1);
      }}
      disabled={product.stock === 0}
      className="w-full mt-4 py-4 bg-forest text-cream text-sm tracking-[0.15em] uppercase font-medium hover:bg-forest-light transition-colors active:scale-[0.98] disabled:bg-stone/30 disabled:cursor-not-allowed"
    >
      {product.stock === 0 ? "Sold Out" : "Add to Cart"}
    </button>
  );
}
