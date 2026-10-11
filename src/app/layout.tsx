import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer.tsx/page";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
    title: "বাজার দর | আজকের বাজারের দাম",
    description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
   
  openGraph: {
    title: "Bazar Dor",
    description: "প্রতিদিনের বাজারদর এক জায়গায়",
    images: ["/logo-icon.png"],
    type: "website",
  },
};
export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode;
}>)  {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      
      <body className="min-h-full flex flex-col">
        <Navbar></Navbar>
        
        
        
        {children}
        
        <Toaster position="top-center" />
        <Footer></Footer>
        </body>
    </html>
  );
}
