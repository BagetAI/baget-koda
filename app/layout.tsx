import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["700"]
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"]
});

export const metadata: Metadata = {
  title: "Koda | Tailored Packs for Dogs",
  description: "Hyper-local, breed-compatible group walks for your dog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${inter.variable} font-sans bg-[#F0EEE9] text-[#2D2D2D]`}>
        {children}
      </body>
    </html>
  );
}