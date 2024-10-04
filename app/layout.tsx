import type { Metadata } from "next";
import { Open_Sans } from 'next/font/google';
import "./globals.css";

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Regular, Medium, SemiBold, Bold
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  title: "LemmaOne - All-in-One Tournament Platform",
  description: "Join the waitlist for LemmaOne, an all-in-one tournament platform for athletes and organizers.",
  keywords: "Malaysia, South East Asia, tournament hosting, tournament platform, sports, athletes, organizers, badminton, basketball, football, volleyball",
  openGraph: {
    title: {
      default: "LemmaOne - All-in-One Tournament Platform",
      template: "%s | LemmaOne",
    },
    description: "Grow the sport you love with LemmaOne's sports hosting and immersive tournament experience.",
    url: "https://www.lemmaone.com",
    siteName: "LemmaOne",
    images: [
      {
        url: "https://www.lemmaone.com/logo192.jpg",
        width: 1200,
        height: 630,
        alt: "LemmaOne Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LemmaOne - All-in-One Tournament Platform",
    description: "Grow the sport you love with LemmaOne's sports hosting and immersive tournament experience.",
    images: ["https://www.lemmaone.com/logo192.jpg"],
  },

  
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
