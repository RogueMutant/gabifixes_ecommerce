import type { Metadata } from "next";
import { montserrat, poppins } from "./ui/fonts";
import "././ui/globals.css";

export const metadata: Metadata = {
  title: "Gabi fixes ecommerce",
  description: "an ecommerce app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} ${poppins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
