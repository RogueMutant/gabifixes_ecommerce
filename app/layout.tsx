import type { Metadata } from "next";
import { montserrat, cormorant } from "./ui/fonts";
import "././ui/globals.css";

export const metadata: Metadata = {
  title: "Gabi Fixes | Premium Skincare",
  description: "Discover curated skincare essentials crafted for radiant, healthy skin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#FAF8F5]">
      <body
        className={`${montserrat.variable} ${cormorant.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
