"use client";

import { useToast } from "@/app/ui/toast";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ToastListener() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const status = searchParams.get("status");

    if (status === "created") {
      showToast("Product created successfully", "success");
    } else if (status === "updated") {
      showToast("Product updated successfully", "success");
    }

    if (status) {
      // Clean up params
      router.replace(pathname);
    }
  }, [searchParams, showToast, router, pathname]);

  return null;
}
