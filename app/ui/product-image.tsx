"use client";

import Image from "next/image";
import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";

export default function ProductImage({
  url,
  alt,
  size = 40,
}: {
  url?: string;
  alt: string;
  size?: number;
}) {
  const [error, setError] = useState(false);

  if (!url || error) {
    return (
      <div
        style={{ width: size, height: size }}
        className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-400"
      >
        <PhotoIcon className="w-1/2 h-1/2" />
      </div>
    );
  }

  return (
    <Image
      src={url}
      alt={alt}
      width={size}
      height={size}
      className="rounded-lg object-cover"
      onError={() => setError(true)}
    />
  );
}
