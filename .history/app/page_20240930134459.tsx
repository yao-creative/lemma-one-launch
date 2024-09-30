'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import WaitListForm from './components/WaitListForm';
import FAQSection from './components/FAQSection';
import AboutSection from './components/AboutSection';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const platformRef = useRef<HTMLElement>(null);
  const waitListRef = useRef<HTMLElement>(null);
  const communityRef = useRef<HTMLElement>(null);
  const supportRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const [showOrganizerForm, setShowOrganizerForm] = useState(false);

  const toggleForm = (formType: 'player' | 'organizer') => {
    if (formType === 'player') {
      setShowPlayerForm(true);
      setShowOrganizerForm(false);
    } else {
      setShowPlayerForm(false);
      setShowOrganizerForm(true);
    }
  };

  return (
    <div className="min-h-screen bg-darkBlue text-white relative overflow-hidden">
      {/* Background layer with glass morphism effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="glassmorphism-bg"></div>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-6xl mt-4 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image src="/logo192.png" alt="LemmaOne Logo" width={48} height={40} />
            <h1 className="text-2xl font-bold font-open-sans">LemmaOne</h1>
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <button onClick={() => scrollToSection(platformRef)} className="text-sm hover:text-gray-300">Platform</button>
            <button onClick={() => scrollToSection(waitListRef)} className="text-sm hover:text-gray-300">Wait List</button>
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
            <button onClick={() => scrollToSection(waitListRef)} className="block w-full text-left px-6 py-2 hover:bg-white/10">Join Wait List</button>
            <button onClick={() => scrollToSection(communityRef)} className="block w-full text-left px-6 py-2 hover:bg-white/10">Community</button>
            <button onClick={() => scrollToSection(supportRef)} className="block w-full text-left px-6 py-2 hover:bg-white/10">Support</button>
            <button onClick={() => scrollToSection(aboutRef)} className="block w-full text-left px-6 py-2 hover:bg-white/10">About</button>
          </div>
        )}
      </nav>

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-between p-4 md:p-24 space-y-16 md:space-y-24 pt-24 md:pt-32">
        <section className="text-center flex flex-col items-center title-section">
          <h2 className="text-4xl md:text-5xl font-bold font-open-sans mb-4">LemmaOne</h2>
          <p className="text-lg md:text-xl max-w-2xl">An all-in-one sports tournament space. Players, Organizers: this is your space. Grow the sport you love.</p>
        </section>

        <section ref={platformRef} className="text-center flex flex-col items-center justify-center w-full max-w-4xl section-glass rounded-3xl p-8 my-16">
          <h3 className="text-2xl md:text-3xl font-semibold font-open-sans mb-4">A Platform for Athletes and Tournament Organizers</h3>
          <p className="text-base md:text-lg max-w-2xl mb-8">
            Introducing an all-in-one sports tournament hosting platform. LemmaOne connects athletes and organizers, providing a space to grow the sport from amateur to semi-pro levels by collaborating with organizers to create a more immersive tournament experience and scale their reach.
          </p>
          <h4 className="text-xl md:text-2xl font-semibold font-open-sans mb-4">Players</h4>
          <p className="text-base md:text-lg max-w-2xl mb-4">
            Amateurs: Immerse yourself in the Tournament experience. Join Tournaments. Join Teams. Engage in the Sports Community.   \n
            Semi-Pros: Up your game to a new level. Join Tournaments. Join Teams. Get Discovered. Tournament . 
          </p>
          <h4 className="text-xl md:text-2xl font-semibold font-open-sans mb-4">Organizers</h4>
          <p className="text-base md:text-lg max-w-2xl mb-4">
            Organizers:
          </p>
        </section>

        <section ref={waitListRef} className="text-center flex flex-col items-center justify-center w-full max-w-4xl section-glass rounded-3xl p-8 my-16">
          <h3 className="text-2xl md:text-3xl font-semibold font-open-sans mb-4">Join the Wait List</h3>
          <p className="text-base md:text-lg mb-6 max-w-2xl">
            By joining the wait list we'll create an account for you upon soft launch.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <button 
              onClick={() => toggleForm('player')} 
              className={`px-12 py-6 rounded-full text-xl font-semibold text-white transition-all duration-300 animate-pulse-subtle ${
                showPlayerForm ? 'bg-gradient-to-r from-orange-600 to-yellow-500' : 'bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500'
              }`}
            >
              Players
            </button>
            <button 
              onClick={() => toggleForm('organizer')}
              className={`px-12 py-6 rounded-full text-xl font-semibold text-white transition-all duration-300 animate-pulse-subtle ${
                showOrganizerForm ? 'bg-gradient-to-r from-purple-700 to-pink-600' : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600'
              }`}
            >
              Organizers
            </button>
          </div>

          {(showPlayerForm || showOrganizerForm) && (
            <WaitListForm showPlayerForm={showPlayerForm} />
          )}
        </section>

        <section ref={communityRef} className="text-center flex flex-col items-center justify-center w-full max-w-4xl section-glass rounded-3xl p-8 my-16">
          <h3 className="text-2xl md:text-3xl font-semibold font-open-sans mb-4">The Community</h3>
          <p className="text-base md:text-lg mb-6 max-w-2xl">
            Help us grow the sports community in South East Asia. Grow the sport you love. Suggest features and give a pitch on the development on the Discord. Get updates on the development on Telegram and Whatsapp.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://discord.gg/q8RxTuKQXV" className="inline-block px-8 py-4 rounded-full text-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300 neon-button-purple">
              Join Discord
            </a>
            <a href="https://chat.whatsapp.com/FTkystI1sUFImgSzjzgezv" className="inline-block px-8 py-4 rounded-full text-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors duration-300 neon-button-green">
              WhatsApp Channel
            </a>
            <a href="https://t.me/+zumEyTka9SQwNjFk" className="inline-block px-8 py-4 rounded-full text-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-300 neon-button-blue">
              Telegram Channel
            </a>
          </div>
        </section>

        <section ref={supportRef} className="text-center flex flex-col items-center justify-center w-full max-w-4xl section-glass rounded-3xl p-8 my-16">
          <h3 className="text-2xl md:text-3xl font-semibold font-open-sans mb-4">Support Us</h3>
          <p className="text-base md:text-lg mb-6 max-w-2xl">
            We're realising a limited kit for the launch. Help us continue to grow and support semi-pro sports scene in South East Asia.
          </p>
          <a href="#" className="inline-block px-12 py-6 rounded-full text-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors duration-300">
            Visit Our Merch Store
          </a>
        </section>

        <AboutSection />
        <FAQSection />
      </main>
    </div>
  );
}