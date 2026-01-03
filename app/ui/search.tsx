import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { ChangeEvent, useState, useEffect, useRef } from "react";
import { SearchModal } from "./search-modal";

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Search({ isOpen, onClose }: SearchProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  function handleText(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setText(e.target.value);
  }

  return (
    <div className="flex items-center justify-center">
      {/* Search Icon Trigger (Visible when closed) - Handled by parent or here? 
           The user wants icon beside text. Parent layout handles positioning.
           Here we manage the input expansion. 
       */}

      <div
        className={clsx(
          "flex items-center overflow-hidden transition-all duration-300 ease-in-out",
          { "w-64 opacity-100": isOpen, "w-0 opacity-0": !isOpen }
        )}
      >
        <div className="relative w-full max-w-md mx-auto flex items-center">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            className="w-full border-b-2 border-green-500 bg-transparent px-4 py-2 text-lg focus:outline-none placeholder-gray-400"
            value={text}
            onChange={handleText}
          />
          <button
            onClick={() => {
              setText("");
              onClose();
            }}
            className="absolute right-0 p-2 text-gray-500 hover:text-red-500"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Modal */}
        {isOpen && text && (
          <div className="absolute top-full left-0 w-full flex justify-center mt-2">
            <SearchModal text={text} onClose={onClose} />
          </div>
        )}
      </div>
    </div>
  );
}
