import { IProduct } from "../lib/custom";
import { useCart } from "../store/cart";

export const AddToCartbtn = ({
  product,
  quantity = 1,
}: {
  product: IProduct;
  quantity?: number;
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <>
      {/* ADD TO CART */}
      <button
        onClick={handleAddToCart}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
        disabled={product.stock === 0}
      >
        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    </>
  );
};
