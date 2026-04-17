import type { Metadata } from "next";
import { montserrat, cormorant } from "./ui/fonts";
import "./ui/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Gabi Fixes | Premium Skincare & Beauty Products",
    template: "%s | Gabi Fixes",
  },
  description:
    "Discover curated skincare essentials and beauty products crafted for radiant, healthy skin. Shop premium serums, moisturizers, and more at Gabi Fixes.",
  keywords: [
    "skincare",
    "beauty products",
    "serums",
    "moisturizers",
    "premium skincare",
    "radiant skin",
    "natural beauty",
  ],
  authors: [{ name: "Gabi Fixes" }],
  creator: "Gabi Fixes",
  publisher: "Gabi Fixes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://gabifixes.com"), // Replace with actual domain
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/My-logo.png",
    shortcut: "/My-logo.png",
    apple: "/My-logo.png",
  },
  openGraph: {
    title: "Gabi Fixes | Premium Skincare & Beauty Products",
    description:
      "Discover curated skincare essentials and beauty products crafted for radiant, healthy skin.",
    url: "https://gabifixes.com",
    siteName: "Gabi Fixes",
    images: [
      {
        url: "/My-logo.png",
        width: 1200,
        height: 630,
        alt: "Gabi Fixes - Premium Skincare",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabi Fixes | Premium Skincare & Beauty Products",
    description:
      "Discover curated skincare essentials and beauty products crafted for radiant, healthy skin.",
    images: ["/og-image.jpg"],
    creator: "@gabifixes", // Replace with actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code", // Replace with actual code
  },
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
