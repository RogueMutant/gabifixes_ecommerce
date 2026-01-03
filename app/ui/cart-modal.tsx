import { IProduct } from "../lib/custom";

export const CartModal = ({ product }: { product: Partial<IProduct> }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
          <h2 className="text-xl font-semibold mb-2">Added to Cart</h2>
          <p className="text-gray-600 mb-4">
            {product.name} has been added to your cart.
          </p>

          <button className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Close
          </button>
        </div>
      </div>
      ;
    </>
  );
};
