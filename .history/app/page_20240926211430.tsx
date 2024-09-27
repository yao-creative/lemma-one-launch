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
      question: "Why the name LemmaOne?",
      answer: "A Lemma is a term in mathematics for an intermediate result or tool to prove a theorem. We are creating LemmaOne to prove that semi-pro sports is possible in South East Asia."
    },
    {
      question: "How can I join the waiting list?",
      answer: "You can join the waiting list by clicking on either the 'Players' or 'Organizers' button in the 'Join the Waiting List' section. We'll create an account for you upon soft launch."
    },
    {
      question: "What Features do we intend to add?",
      answer: "We're currently building a platform for sports hosting, but would like to grow into an interactive community to help build local tournaments to create a more immersive tournament experience, broaden their reach, and find new monetization methods. This way we can help grow a sustainable semi-pro sports community in South East Asia. "
    },
    {
      question: "Feature Suggestions?",
      answer: "We're always looking for new ideas an feature improvements. Join the Discord to build a community with us."
    },
    {}
    
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-10">
        <div className="mx-auto max-w-6xl mt-4 px-4 sm:px-6 py-3 bg-white/10 backdrop-blur-md rounded-full flex justify-between items-center">
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

      <main className="pt-24 flex flex-col items-center justify-between p-4 sm:p-6 md:p-24 space-y-16 sm:space-y-24">
        <section className="text-center flex flex-col items-center w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-nike mb-4">LemmaOne</h2>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl">A space for semi-pro athletes. Growing the sport you love.</p>
        </section>

        <section ref={platformRef} className="text-center flex flex-col items-center w-full">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold font-nike mb-4">A Platform for Athletes and Tournament Organizers</h3>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl">
            LemmaOne connects athletes and organizers, providing a space to grow the sport from amateur to semi-pro athletes by working together with organizers to create a more immersive tournament experience and scale their reach.
          </p>
        </section>

        <section ref={waitingListRef} className="text-center flex flex-col items-center w-full">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold font-nike mb-4">Join the Waiting List</h3>
          <p className="text-sm sm:text-base md:text-lg mb-6 max-w-2xl">
            By joining the waiting list we'll create an account for you upon soft launch.
          </p>
          <div className="flex flex-col sm:flex-row justify-center w-full sm:w-auto space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 rounded-full text-lg sm:text-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 transition-all duration-300 animate-pulse-subtle glow-button">
              Players
            </button>
            <button className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 rounded-full text-lg sm:text-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 animate-pulse-subtle glow-button">
              Organizers
            </button>
          </div>
        </section>

        <section ref={communityRef} className="text-center flex flex-col items-center w-full">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold font-nike mb-4">The Community</h3>
          <p className="text-sm sm:text-base md:text-lg mb-6 max-w-2xl">
            Help us grow the sports community in South East Asia which you love. Suggest features and get involved.
          </p>
          <a href="https://discord.gg/QztR7ZPM" className="w-full sm:w-auto inline-block px-8 sm:px-12 py-4 sm:py-6 rounded-full text-lg sm:text-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300 neon-button">
            Join the Discord
          </a>
        </section>

        <section ref={supportRef} className="text-center flex flex-col items-center w-full">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold font-nike mb-4">Support Us</h3>
          <p className="text-sm sm:text-base md:text-lg mb-6 max-w-2xl">
            We're realising a limited kit for the launch. Help us continue to grow and support semi-pro sports scene in South East Asia.
          </p>
          <a href="#" className="w-full sm:w-auto inline-block px-8 sm:px-12 py-4 sm:py-6 rounded-full text-lg sm:text-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors duration-300">
            Visit Our Merch Store
          </a>
        </section>

        <section ref={aboutRef} className="text-center flex flex-col items-center w-full max-w-4xl px-4 sm:px-6">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold font-nike mb-4">About Us</h3>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mb-8">
            In South East Asia, relative to the size of the population, especially that of the youth, and the fanbase for sports, there is a huge gap in both federation funding and professional funding for sports. LemmaOne is put together by a team of passionate athletes who want to build a community and a possibility for the next generation to realize their dreams in sports.
          </p>
          <div className="w-full">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center">Yao</h3>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
              <div className="w-32 h-32 flex-shrink-0">
                <Image
                  src="/about/profile.jpg"
                  alt="Yao"
                  width={128}
                  height={128}
                  className="rounded-full object-cover"
                />
              </div>
              <p className="text-xs sm:text-sm opacity-70 text-left sm:text-justify max-w-prose">
                Hi my name is Yao. I'm from Malaysia and have been playing volleyball competitively since I was 14. I've competed in the largest national tournament of Malaysia SUKMA when I was 17, which is a competition for the U21 age bracket nationally. After that, there was no notion of going pro for volleyball in Malaysia. I took a gamble and went abroad for a gap year in search of a dream. I ended up majoring in mathematics and computer science in university and five years later I'm back in this corner of the world to build things.
              </p>
            </div>
          </div>
        </section>

        <section ref={faqRef} className="text-center flex flex-col items-center w-full">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold font-nike mb-8">Frequently Asked Questions</h3>
          <div className="w-full max-w-2xl">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  className="flex justify-between items-center w-full text-left px-4 py-2 bg-gray-800 hover:bg-gray-700 transition-colors duration-300 rounded-lg"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-base sm:text-lg font-semibold">{faq.question}</span>
                  <span className="text-xl sm:text-2xl">{openFAQ === index ? '−' : '+'}</span>
                </button>
                {openFAQ === index && (
                  <div className="mt-2 px-4 py-2 bg-gray-900 rounded-lg">
                    <p className="text-sm sm:text-base">{faq.answer}</p>
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
