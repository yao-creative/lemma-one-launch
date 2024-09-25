'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const platformRef = useRef<HTMLElement>(null);
  const communityRef = useRef<HTMLElement>(null);
  const supportRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-10">
        <div className="mx-auto max-w-6xl mt-4 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full flex justify-between items-center">
        <div className="mx-auto max-w-4xl mt-4 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full flex justify-between items-center">
          <h1 className="text-2xl font-bold">LemmaOne</h1>
          <div className="space-x-4">
            <button onClick={() => scrollToSection(platformRef)} className="text-sm hover:text-gray-300">Platform</button>
            <button onClick={() => scrollToSection(communityRef)} className="text-sm hover:text-gray-300">Community</button>
            <button onClick={() => scrollToSection(supportRef)} className="text-sm hover:text-gray-300">Support</button>
            <button onClick={() => scrollToSection(aboutRef)} className="text-sm hover:text-gray-300">About</button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-24 space-y-24">
        <section className="text-center">
          <h2 className="text-5xl font-bold mb-4">LemmaOne</h2>
          <p className="text-xl">A space for semi-pro athletes. Growing the sport we love.</p>
        </section>

        <section ref={platformRef}>
          <h3 className="text-3xl font-semibold mb-4">A Platform for Semi-Pro Athletes and Tournament Organizers</h3>
          <p className="text-lg">
            LemmeOne connects athletes and organizers, providing a space to grow and showcase talent in the semi-professional sports world.
          </p>
        </section>

        <section ref={communityRef}>
          <h3 className="text-3xl font-semibold mb-4">The Community</h3>
          <p className="text-lg mb-6">
            Join our vibrant community of athletes, coaches, and sports enthusiasts. Share experiences, find opportunities, and grow together.
          </p>
          <a href="#" className="inline-block px-6 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300 neon-button">
            Join the Discord
          </a>
        </section>

        <section ref={supportRef}>
          <h3 className="text-3xl font-semibold mb-4">Support Us</h3>
          <p className="text-lg mb-6">
            Help us continue to grow and support semi-pro athletes by purchasing our merchandise.
          </p>
          <a href="#" className="inline-block px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors duration-300">
            Visit Our Merch Store
          </a>
        </section>

        <section ref={aboutRef}>
          <h3 className="text-3xl font-semibold mb-4">About Us</h3>
          <p className="text-lg">
            LemmaOne was founded by a group of passionate semi-pro athletes who saw the need for a dedicated platform to support and grow their community. Our mission is to provide resources, connections, and opportunities for athletes and organizers alike.
          </p>
        </section>
      </main>
    </div>
  );
}
