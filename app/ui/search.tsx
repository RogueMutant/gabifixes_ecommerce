import clsx from "clsx";

export function Search({ open }: { open: boolean }) {
  return (
    <div
      className={clsx(
        "flex overflow-hidden w-0 justify-center transition-width duration-300 ease-in-out rounded-full py-1 ",
        { "w-53 ": open },
        { "scale-100": open, "transition scale-0 w-0": !open }
      )}
    >
      <input
        type="text"
        placeholder="Search products..."
        className={
          "border border-gray-300 w-50 rounded-full px-4 py-1 focus:ring-2 focus:ring-green-400  focus:outline-none"
        }
      />
    </div>
  );
}
