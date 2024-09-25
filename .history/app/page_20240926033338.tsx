'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const platformRef = useRef<HTMLElement>(null);
  const waitingListRef = useRef<HTMLElement>(null);
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
          <div className="flex items-center space-x-2">
            <Image src="/logo192.png" alt="LemmaOne Logo" width={32} height={32} />
            <h1 className="text-2xl font-bold font-nike">LemmaOne</h1>
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <button onClick={() => scrollToSection(platformRef)} className="text-sm hover:text-gray-300">Platform</button>
            <button onClick={() => scrollToSection(waitingListRef)} className="text-sm hover:text-gray-300">Join Waiting List</button>
            <button onClick={() => scrollToSection(communityRef)} className="text-sm hover:text-gray-300">Community</button>
            <button onClick={() => scrollToSection(supportRef)} className="text-sm hover:text-gray-300">Support</button>
            <button onClick={() => scrollToSection(aboutRef)} className="text-sm hover:text-gray-300">About</button>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md py-4">
            <button onClick={() => scrollToSection(platformRef)} className="block w-full text-left px-6 py-2 hover:bg-white/10">Platform</button>
            <button onClick={() => scrollToSection(communityRef)} className="block w-full text-left px-6 py-2 hover:bg-white/10">Community</button>
            <button onClick={() => scrollToSection(supportRef)} className="block w-full text-left px-6 py-2 hover:bg-white/10">Support</button>
            <button onClick={() => scrollToSection(aboutRef)} className="block w-full text-left px-6 py-2 hover:bg-white/10">About</button>
          </div>
        )}
      </nav>

      <main className="container mx-auto px-4 py-24 space-y-24">
        <section className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-nike mb-4">LemmaOne</h2>
          <p className="text-lg md:text-xl">A space for semi-pro athletes. Growing the sport we love.</p>
        </section>

        <section ref={platformRef}>
          <h3 className="text-2xl md:text-3xl font-semibold font-nike mb-4">A Platform for Semi-Pro Athletes and Tournament Organizers</h3>
          <p className="text-base md:text-lg">
            LemmaOne connects athletes and organizers, providing a space to grow and showcase talent in the semi-professional sports world.
          </p>
        </section>

        <section ref={waitingListRef} className="text-center">
          <h3 className="text-2xl md:text-3xl font-semibold font-nike mb-4">Join the Waiting List</h3>
          <p className="text-base md:text-lg mb-6">
            By joining the waiting list we'll create an account for you upon soft launch
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <button className="px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-red-600 to-green-500 hover:from-red-700 hover:to-green-600 transition-all duration-300 animate-pulse-subtle glow-button">
              Players
            </button>
            <button className="px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-yellow-400 hover:from-purple-700 hover:to-yellow-500 transition-all duration-300 animate-pulse-subtle glow-button">
              Organizers
            </button>
          </div>
        </section>

        <section ref={communityRef}>
          <h3 className="text-2xl md:text-3xl font-semibold font-nike mb-4">The Community</h3>
          <p className="text-base md:text-lg mb-6">
            Join our vibrant community of athletes, coaches, and sports enthusiasts. Share experiences, find opportunities, and grow together.
          </p>
          <a href="#" className="inline-block px-6 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300 neon-button">
            Join the Discord
          </a>
        </section>

        <section ref={supportRef}>
          <h3 className="text-2xl md:text-3xl font-semibold font-nike mb-4">Support Us</h3>
          <p className="text-base md:text-lg mb-6">
            Help us continue to grow and support semi-pro athletes by purchasing our merchandise.
          </p>
          <a href="#" className="inline-block px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors duration-300">
            Visit Our Merch Store
          </a>
        </section>

        <section ref={aboutRef}>
          <h3 className="text-2xl md:text-3xl font-semibold font-nike mb-4">About Us</h3>
          <p className="text-base md:text-lg">
            LemmaOne was founded by a group of passionate semi-pro athletes who saw the need for a dedicated platform to support and grow their community. Our mission is to provide resources, connections, and opportunities for athletes and organizers alike.
          </p>
        </section>
      </main>
    </div>
  );
}
