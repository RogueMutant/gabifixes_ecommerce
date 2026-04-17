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
        className="h-10 px-5 bg-forest text-cream text-xs tracking-[0.1em] uppercase font-semibold hover:bg-forest-light transition-all whitespace-nowrap active:scale-[0.98] shadow-md shadow-forest/25 hover:shadow-lg hover:shadow-forest/35 disabled:bg-stone/30 disabled:shadow-none disabled:cursor-not-allowed"
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
      className="w-full mt-4 py-4 bg-forest text-cream text-sm tracking-[0.15em] uppercase font-semibold hover:bg-forest-light transition-all active:scale-[0.98] shadow-lg shadow-forest/30 hover:shadow-xl hover:shadow-forest/40 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md disabled:bg-stone/30 disabled:shadow-none disabled:cursor-not-allowed"
    >
      {product.stock === 0 ? "Sold Out" : "Add to Cart"}
    </button>
  );
}
