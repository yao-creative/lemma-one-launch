import type { Metadata } from "next";
import { Open_Sans } from 'next/font/google';
import "./globals.css";

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Regular, Medium, SemiBold, Bold
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  title: "LemmaOne",
  description: "An all in one. Growing the sport we love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
