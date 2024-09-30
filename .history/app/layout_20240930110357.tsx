import type { Metadata } from "next";
import localFont from "next/font/local";
import { Open_Sans } from 'next/font/google';
import "./globals.css";

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['500'], // Medium weight
  variable: '--font-open-sans',
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const nikeFont = localFont({
  src: "./fonts/Futura-Condensed-Extra-Bold.otf",
  variable: "--font-nike",
});

export const metadata: Metadata = {
  title: "LemmaOne",
  description: "A space for semi-pro athletes. Growing the sport we love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${geistMono.variable} ${nikeFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
