import { productData } from "../lib/data";
import { ProductWrapper } from "./product_card";

export function SearchModal({
  text,
  onClose,
}: {
  text: string;
  onClose: () => void;
}) {
  const data = productData.filter(
    (t) =>
      t.name.toLowerCase().includes(text.toLowerCase()) ||
      t.category.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <div className="w-[90vw] max-w-3xl bg-white shadow-2xl rounded-xl border border-gray-100 overflow-hidden flex flex-col max-h-[50vh] z-50">
      <div className="p-4 bg-gray-50 border-b flex justify-between items-center sticky top-0">
        <h3 className="font-semibold text-gray-700">Search Results</h3>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500">{data.length} found</span>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <span className="sr-only">Close</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-y-auto p-4">
        {data.length > 0 ? (
          <ProductWrapper products={data} />
        ) : (
          <div className="text-center py-8 text-gray-500">
            No products found matching &quot;{text}&quot;
          </div>
        )}
      </div>
    </div>
  );
}
