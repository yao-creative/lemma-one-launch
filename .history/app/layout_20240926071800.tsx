import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
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
        className={`${geistSans.variable} ${geistMono.variable} ${nikeFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
