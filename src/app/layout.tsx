import type { Metadata } from "next";
import { Noto_Sans, Yeseva_One } from "next/font/google";
import "../style/globals.css";
import NavbarHome from "@/components/navbar/NavbarHome";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const yesevaOne = Yeseva_One({
  variable: "--font-yeseva-one",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Exploria Adven",
  description: "Find Your Perfect Escape.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${yesevaOne.variable} antialiased`}>
      <body className={`${notoSans.className} bg-primary`}>{children}</body>
    </html>
  );
}
