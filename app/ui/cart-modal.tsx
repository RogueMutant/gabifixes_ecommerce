import { IProduct } from "../lib/custom";

export const CartModal = ({ 
  product, 
  onClose 
}: { 
  product: Partial<IProduct>;
  onClose?: () => void;
}) => {
  return (
    <div 
      className="fixed inset-0 bg-charcoal/90 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-cream p-8 md:p-12 max-w-md w-full text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 mx-auto mb-6 bg-forest flex items-center justify-center">
          <svg
            className="w-8 h-8 text-cream"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="font-serif text-2xl text-charcoal mb-2">
          Added to Cart
        </h2>
        <p className="text-stone mb-8">
          {product.name} has been added to your cart.
        </p>
        <div className="flex flex-col gap-3">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-forest text-cream text-sm tracking-[0.15em] uppercase font-semibold hover:bg-forest-light transition-all shadow-lg shadow-forest/30"
          >
            Continue Shopping
          </button>
          <a 
            href="/home/cart"
            className="w-full py-3 border border-charcoal text-charcoal text-xs tracking-[0.15em] uppercase font-medium hover:bg-charcoal hover:text-cream transition-all block"
          >
            View Cart
          </a>
        </div>
      </div>
    </div>
  );
};
