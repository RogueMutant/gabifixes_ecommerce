"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export function Filter({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={clsx(
        "fixed pt-4 top-0 right-0 z-50 min-h-screen w-72 flex-col bg-white gap-4 px-3 transition-transform duration-300",
        {
          "translate-x-0": open,
          "-translate-x-full": !open,
        }
      )}
    >
      <div className="flex justify-between items-center gap-2 mb-4 border-b-gray-400 pb-2">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <button onClick={onClose}>
          <XMarkIcon className="w-6 h-6 text-black mb-4" />
        </button>
      </div>

      <div className={clsx({ "hidden ": !open })}>
        <h3 className="font-semibold mb-2">Category</h3>
        <ul>
          <li>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox rounded-full" />
              <span className="ml-2">Skincare</span>
            </label>
          </li>
          <li>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox rounded-full" />
              <span className="ml-2">Makeup</span>
            </label>
          </li>
          <li>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox rounded-full" />
              <span className="ml-2">Haircare</span>
            </label>
          </li>
        </ul>
      </div>
      <div className="mt-4 mb-4">
        <h3 className="font-semibold mb-2">Price Range</h3>
        <ul>
          <li className="mb-2">
            <label className="flex flex-col item-start gap-2">
              <span>min</span>
              <input
                type="input "
                placeholder="$50"
                className="p-5 h-10 w-30 rounded-b-sm text-sm font-semibold text-black outline-0 border border-gray-400"
              />
            </label>
          </li>
          <li>
            <label className="flex flex-col item-start gap-2">
              <span>max</span>
              <input
                type="input"
                placeholder="$150"
                className="p-5 h-10 w-30 rounded-b-sm text-sm font-semibold text-black outline-0 border border-gray-400"
              />
            </label>
          </li>
        </ul>
      </div>

      <div>
        <h3>Skin type</h3>
        <ul>
          <li>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox rounded-full" />
              <span className="ml-2">Oily</span>
            </label>
          </li>
          <li>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox rounded-full" />
              <span className="ml-2">Dry</span>
            </label>
          </li>
          <li>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox rounded-full" />
              <span className="ml-2">Combination</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}
