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
    <>
      <div
        className={clsx(
          "fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300",
          {
            "opacity-50 pointer-events-auto": open,
            "opacity-0 pointer-events-none": !open,
          }
        )}
        onClick={onClose}
      />
      <div
        className={clsx(
          "fixed pt-4 top-0 right-0 z-50 min-h-screen h-full w-85 flex flex-col bg-white gap-4 px-3 transition-transform duration-300 overflow-y-auto",
          {
            "translate-x-0": open,
            "translate-x-full": !open,
          }
        )}
      >
        <div className="flex justify-between items-center gap-2 border-b-gray-400 pb-2">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <button onClick={onClose}>
            <XMarkIcon className="w-6 h-6 text-black mb-4" />
          </button>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Category</h3>
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
        <div className="mt-3 mb-3">
          <h3 className="font-semibold mb-3">Price Range</h3>
          <ul className="flex gap-2">
            <li className="mb-2">
              <label className="flex flex-col item-start gap-2">
                <span>Min</span>
                <input
                  type="input "
                  placeholder="$50"
                  className="p-4 h-8 w-35 rounded-b-sm text-sm font-semibold text-black outline-0 border border-gray-400"
                />
              </label>
            </li>
            <li>
              <label className="flex flex-col item-start gap-2">
                <span>Max</span>
                <input
                  type="input"
                  placeholder="$150"
                  className="p-4 h-8 w-35 rounded-b-sm text-sm font-semibold text-black outline-0 border border-gray-400"
                />
              </label>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Skin type</h3>
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

        <button className="w-full mt-auto mb-4 p-2 bg-green-700 text-white rounded">
          Apply Filters
        </button>
      </div>
    </>
  );
}
