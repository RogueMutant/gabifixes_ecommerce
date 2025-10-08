import { ICategory } from "@/app/lib/custom";
import Image from "next/image";

interface CategoryWrapperProps {
  categories: ICategory[];
}

export function CategoryWrapper({ categories }: CategoryWrapperProps) {
  return (
    <div className="flex gap-4 w-full overflow-x-auto scrollbar-hide">
      {categories.map((category) => (
        <CategoryCard
          key={category.name}
          name={category.name}
          image={category.image}
        />
      ))}
    </div>
  );
}

export function CategoryCard({ name, image }: { name: string; image: string }) {
  return (
    <div className="flex-shrink-0 w-50 overflow-hidden bg-white">
      <div className="relative w-full h-40">
        <Image
          src={image}
          alt={name}
          fill
          className="rounded-2xl object-cover object-center"
        />
      </div>

      <div className="py-2 text-left">
        <h3 className="text-black text-base font-semibold">{name}</h3>
      </div>
    </div>
  );
}
