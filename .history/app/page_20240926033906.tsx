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
  const faqRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "Why LemmaOne?",
      answer: "A Le"
    },
    {
      question: "How can I join the waiting list?",
      answer: "You can join the waiting list by clicking on either the 'Players' or 'Organizers' button in the 'Join the Waiting List' section. We'll create an account for you upon soft launch."
    },
    {
      question: "Is LemmaOne free to use?",
      answer: "Details about pricing will be announced closer to our launch date. Join our waiting list to stay updated on all the latest information."
    },
    {
      question: "What sports does LemmaOne support?",
      answer: "LemmaOne aims to support a wide range of sports. We're constantly expanding our offerings, so make sure to check back regularly for updates."
    }
  ];

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
            <button onClick={() => scrollToSection(waitingListRef)} className="block w-full text-left px-6 py-2 hover:bg-white/10">Join Waiting List</button>
            <button onClick={() => scrollToSection(communityRef)} className="block w-full text-left px-6 py-2 hover:bg-white/10">Community</button>
            <button onClick={() => scrollToSection(supportRef)} className="block w-full text-left px-6 py-2 hover:bg-white/10">Support</button>
            <button onClick={() => scrollToSection(aboutRef)} className="block w-full text-left px-6 py-2 hover:bg-white/10">About</button>
          </div>
        )}
      </nav>

      <main className="container mx-auto px-4 py-24 space-y-24">
        <section className="text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold font-nike mb-4">LemmaOne</h2>
          <p className="text-lg md:text-xl max-w-2xl">A space for semi-pro athletes. Growing the sport we love.</p>
        </section>

        <section ref={platformRef} className="text-center flex flex-col items-center">
          <h3 className="text-2xl md:text-3xl font-semibold font-nike mb-4">A Platform for Semi-Pro Athletes and Tournament Organizers</h3>
          <p className="text-base md:text-lg max-w-2xl">
            LemmaOne connects athletes and organizers, providing a space to grow and showcase talent in the semi-professional sports world.
          </p>
        </section>

        <section ref={waitingListRef} className="text-center flex flex-col items-center">
          <h3 className="text-2xl md:text-3xl font-semibold font-nike mb-4">Join the Waiting List</h3>
          <p className="text-base md:text-lg mb-6 max-w-2xl">
            By joining the waiting list we'll create an account for you upon soft launch
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <button className="px-12 py-6 rounded-full text-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 transition-all duration-300 animate-pulse-subtle glow-button">
              Players
            </button>
            <button className="px-12 py-6 rounded-full text-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 animate-pulse-subtle glow-button">
              Organizers
            </button>
          </div>
        </section>

        <section ref={communityRef} className="text-center flex flex-col items-center">
          <h3 className="text-2xl md:text-3xl font-semibold font-nike mb-4">The Community</h3>
          <p className="text-base md:text-lg mb-6 max-w-2xl">
            Join our vibrant community of athletes, coaches, and sports enthusiasts. Share experiences, find opportunities, and grow together.
          </p>
          <a href="#" className="inline-block px-12 py-6 rounded-full text-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300 neon-button">
            Join the Discord
          </a>
        </section>

        <section ref={supportRef} className="text-center flex flex-col items-center">
          <h3 className="text-2xl md:text-3xl font-semibold font-nike mb-4">Support Us</h3>
          <p className="text-base md:text-lg mb-6 max-w-2xl">
            Help us continue to grow and support semi-pro athletes by purchasing our merchandise.
          </p>
          <a href="#" className="inline-block px-12 py-6 rounded-full text-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors duration-300">
            Visit Our Merch Store
          </a>
        </section>

        <section ref={aboutRef} className="text-center flex flex-col items-center">
          <h3 className="text-2xl md:text-3xl font-semibold font-nike mb-4">About Us</h3>
          <p className="text-base md:text-lg max-w-2xl">
            LemmaOne was founded by a group of passionate semi-pro athletes who saw the need for a dedicated platform to support and grow their community. Our mission is to provide resources, connections, and opportunities for athletes and organizers alike.
          </p>
        </section>

        <section ref={faqRef} className="text-center flex flex-col items-center">
          <h3 className="text-2xl md:text-3xl font-semibold font-nike mb-8">Frequently Asked Questions</h3>
          <div className="w-full max-w-2xl">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  className="flex justify-between items-center w-full text-left px-4 py-2 bg-gray-800 hover:bg-gray-700 transition-colors duration-300 rounded-lg"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg font-semibold">{faq.question}</span>
                  <span className="text-2xl">{openFAQ === index ? '−' : '+'}</span>
                </button>
                {openFAQ === index && (
                  <div className="mt-2 px-4 py-2 bg-gray-900 rounded-lg">
                    <p className="text-base">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
