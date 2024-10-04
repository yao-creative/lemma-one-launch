'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import WaitListForm from './components/WaitListForm';
import FAQSection from './components/FAQSection';
import AboutSection from './components/AboutSection';
import GrowingButton from './components/ui/GrowingButton';

function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "LemmaOne - Waitlist",
    "applicationCategory": "SportsApplication",
    "operatingSystem": "Web",
    "url": "https://www.lemmaone.sea",
    "description": "Join the waitlist for LemmaOne, an all-in-one tournament platform for athletes and organizers.",
    "potentialAction": {
      "@type": "JoinAction",
      "target": "https://www.lemmaone.sea/waitlist",
      "name": "Join Waitlist"
    }
  };
}

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

  const [showWaitListForm, setShowWaitListForm] = useState(false);

  const toggleWaitListForm = () => {
    setShowWaitListForm(!showWaitListForm);
  };

  const [playerSectionOpen, setPlayerSectionOpen] = useState(false);
  const [organizersSectionOpen, setOrganizersSectionOpen] = useState(false);

  return (
    <div className="min-h-screen bg-darkBlue text-white relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData()) }}
      />

      {/* Background layer with glass morphism effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="glassmorphism-bg"></div>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-6xl mt-4 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image src="/logo192.png" alt="LemmaOne Logo" width={48} height={40} />
            <h1 className="text-2xl font-bold font-open-sans">LemmaOne</h1>
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <GrowingButton onClick={() => scrollToSection(platformRef)} className="text-sm hover:text-gray-300">Platform</GrowingButton>
            <GrowingButton onClick={() => scrollToSection(waitListRef)} className="text-sm hover:text-gray-300">Wait List</GrowingButton>
            <GrowingButton onClick={() => scrollToSection(communityRef)} className="text-sm hover:text-gray-300">Community</GrowingButton>
            <GrowingButton onClick={() => scrollToSection(supportRef)} className="text-sm hover:text-gray-300">Support Us</GrowingButton>
            <GrowingButton onClick={() => scrollToSection(aboutRef)} className="text-sm hover:text-gray-300">About</GrowingButton>
            <GrowingButton onClick={() => scrollToSection(faqRef)} className="text-sm hover:text-gray-300">FAQ</GrowingButton>
          </div>
          <GrowingButton onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </GrowingButton>
        </div>
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md py-4">
            <GrowingButton onClick={() => scrollToSection(platformRef)} className="block w-full text-left px-6 py-2 hover:bg-white/10">Platform</GrowingButton>
            <GrowingButton onClick={() => scrollToSection(waitListRef)} className="block w-full text-left px-6 py-2 hover:bg-white/10">Join Wait List</GrowingButton>
            <GrowingButton onClick={() => scrollToSection(communityRef)} className="block w-full text-left px-6 py-2 hover:bg-white/10">Community</GrowingButton>
            <GrowingButton onClick={() => scrollToSection(supportRef)} className="block w-full text-left px-6 py-2 hover:bg-white/10">Support Us</GrowingButton>
            <GrowingButton onClick={() => scrollToSection(aboutRef)} className="block w-full text-left px-6 py-2 hover:bg-white/10">About</GrowingButton>
            <GrowingButton onClick={() => scrollToSection(faqRef)} className="block w-full text-left px-6 py-2 hover:bg-white/10">FAQ</GrowingButton>
          </div>
        )}
      </nav>

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-between p-4 md:p-24 space-y-16 md:space-y-24 pt-24 md:pt-32">
        <section className="text-center flex flex-col items-center title-section">
          <h2 className="text-4xl md:text-5xl font-bold font-open-sans mb-4">LemmaOne</h2>
          <p className="text-lg md:text-xl max-w-2xl mb-4">An All-In-One Sports Tournament Platform. A Space for Players and Organizers. Grow the Sport You Love.</p>
          <div className="flex flex-row justify-center space-x-4 mb-4">
            <img src="/sports/badminton.png" alt="Badminton" className="w-16 h-16" />
            <img src="/sports/basketball.png" alt="Basketball" className="w-16 h-16" />
            <img src="/sports/football.png" alt="Football" className="w-16 h-16" />
            <img src="/sports/volleyball.png" alt="Volleyball" className="w-16 h-16" />
            
          </div>
        </section>

        <section ref={platformRef} className="text-center flex flex-col items-center justify-center w-full max-w-4xl section-glass rounded-3xl p-8 my-16">
          <h3 className="text-2xl md:text-3xl font-semibold font-open-sans mb-4">A Platform for Athletes and Tournament Organizers</h3>
          <p className="text-base md:text-lg max-w-2xl mb-8">
            Introducing an all-in-one sports tournament hosting platform. LemmaOne connects athletes and organizers, providing a space to grow the sport from amateur to semi-pro levels by collaborating with organizers to create a more immersive tournament experience and scale their reach.
          </p>
          <div className="flex flex-col space-y-8 w-full">
            <div className="space-y-6">
              <GrowingButton 
                onClick={() => setPlayerSectionOpen(!playerSectionOpen)} 
                className="text-xl md:text-2xl font-semibold font-open-sans py-3 px-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {playerSectionOpen ? 'Close Player Section' : 'For Players'}
              </GrowingButton>
              {playerSectionOpen && (
                <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-8">
                  <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-6">
                    <h4 className="text-xl font-semibold mb-4">Amateurs</h4>
                    <ul className="text-base max-w-2xl mb-4 list-disc list-inside text-left space-y-2">
                      <li>Immerse in the Tournament Experience</li>
                      <li>Join Tournaments</li>
                      <li>Join Teams</li>
                      <li>Engage in the Sports Community</li>
                    </ul>
                  </div>
                  <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-6">
                    <h4 className="text-xl font-semibold mb-4">Competitive Athletes</h4>
                    <ul className="text-base max-w-2xl mb-4 list-disc list-inside text-left space-y-2">
                      <li>Up Your Game to a New Level</li>
                      <li>Join Tournaments</li>
                      <li>Compete as Teams</li>
                      <li>Join Teams</li>
                      <li>Get Discovered</li>
                      <li>Earn from Tournaments</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <GrowingButton 
                onClick={() => setOrganizersSectionOpen(!organizersSectionOpen)} 
                className="text-xl md:text-2xl font-semibold font-open-sans py-3 px-6 rounded-full bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {organizersSectionOpen ? 'Close Organizer Section' : 'For Organizers'}
              </GrowingButton>
              {organizersSectionOpen && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                  <ul className="text-base md:text-lg max-w-2xl mb-4 list-disc list-inside text-left mx-auto space-y-2">
                    <li>Reach a New Audience</li>
                    <li>Earn from Hosting Tournaments</li>
                    <li>Scale Your Tournaments</li>
                    <li>Find New Ways of Monetization</li>
                    <li>Pre-Tournament Hype</li>
                    <li>Super-Charge the Experience with Tournament Media</li>
                    <li>Grow Your Community</li>
                    <li>Grow the Sport You Love</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        <section ref={waitListRef} className="text-center flex flex-col items-center justify-center w-full max-w-4xl section-glass rounded-3xl p-8 my-16">
          <h3 className="text-2xl md:text-3xl font-semibold font-open-sans mb-4">Join the Wait List</h3>
          <p className="text-base md:text-lg mb-6 max-w-2xl">
            By joining the wait list we'll create an account for you upon soft launch. Players and Organizers sign up here.
          </p>
          <GrowingButton 
            onClick={toggleWaitListForm} 
            className={`px-12 py-6 rounded-full text-xl font-semibold text-white transition-all duration-300 animate-pulse-subtle ${
              showWaitListForm ? 'bg-gradient-to-r from-purple-700 to-pink-600' : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600'
            }`}
          >
            {showWaitListForm ? 'Hide Form' : 'Join Wait List'}
          </GrowingButton>

          {showWaitListForm && <WaitListForm />}
        </section>

        <section ref={communityRef} className="text-center flex flex-col items-center justify-center w-full max-w-4xl section-glass rounded-3xl p-8 my-16">
          <h3 className="text-2xl md:text-3xl font-semibold font-open-sans mb-4">The Community</h3>
          <p className="text-base md:text-lg mb-6 max-w-2xl">
            Help us grow the sports community in South East Asia. Suggest features and give a pitch on the development on the Discord. Get updates on the development on Telegram and Whatsapp.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <GrowingButton
              onClick={() => window.open('https://discord.gg/q8RxTuKQXV', '_blank')}
              className="inline-flex items-center px-8 py-4 rounded-full text-lg bg-[#5865F2] text-white font-semibold hover:bg-[#5865F2] transition-colors duration-300 bg-discord"
            >
              Discord Channel <Image src="/icons/discord.svg" alt="Discord" width={40} height={40} className="ml-2" />
            </GrowingButton>
            <GrowingButton
              onClick={() => window.open('https://chat.whatsapp.com/FTkystI1sUFImgSzjzgezv', '_blank')}
              className="inline-flex items-center px-8 py-4 rounded-full text-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors duration-300"
            >
              WhatsApp Channel <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={40} height={40} className="ml-2" />
            </GrowingButton>
            <GrowingButton
              onClick={() => window.open('https://t.me/+zumEyTka9SQwNjFk', '_blank')}
              className="inline-flex items-center px-8 py-4 rounded-full text-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-300"
            >
              Telegram Channel <Image src="/icons/telegram.svg" alt="Telegram" width={40} height={40} className="ml-2" />
            </GrowingButton>
          </div>
        </section>
        <section className="text-center flex flex-col items-center justify-center w-full max-w-4xl section-glass rounded-3xl p-8 my-16">
          <h3 className="text-2xl md:text-3xl font-semibold font-open-sans mb-4">Follow Us</h3>
          <p className="text-base md:text-lg mb-6 max-w-2xl">
            Stay updated on the latest news, features, and updates from LemmaOne.
          </p>
          <div className="flex flex-col items-center">
            <h4 className="text-xl md:text-2xl font-semibold font-open-sans mb-4">Instagram:</h4>
            <GrowingButton
              onClick={() => window.open('https://www.instagram.com/the_lemma_one/', '_blank')}
              className="px-8 py-4 rounded-full text-lg font-semibold"
            >
              <Image src="/icons/instagram.svg" alt="Instagram" width={100} height={100} />
            </GrowingButton>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="text-xl md:text-2xl font-semibold font-open-sans mb-4">Facebook:</h4>
            <GrowingButton
              onClick={() => window.open('https://www.facebook.com/profile.php?id=61566848275702', '_blank')}
              className="px-8 py-4 rounded-full text-lg font-semibold"
            >
              <Image src="/icons/facebook_bubble.svg" alt="Facebook" width={100} height={100} />
            </GrowingButton>
          </div>
        </section>
        <section ref={supportRef} className="text-center flex flex-col items-center justify-center w-full max-w-4xl section-glass rounded-3xl p-8 my-16">
          <h3 className="text-2xl md:text-3xl font-semibold font-open-sans mb-4">Support Us</h3>
          <p className="text-base md:text-lg mb-6 max-w-2xl">
            We're realising a limited kit for the launch. Help us continue to grow and support semi-pro sports scene in South East Asia.
          </p>
          <p className="text-base md:text-lg mb-6 max-w-2xl">
            Merch Store: Coming Soon...!
          </p>
        </section>

        <AboutSection ref={aboutRef} />
        <FAQSection ref={faqRef} />
      </main>

      <footer className="text-center text-gray-400 text-sm mt-4">
        <p>&copy; {new Date().getFullYear()} LemmaOne. All rights reserved.</p>
        <p>Icons used: <a href="https://www.flaticon.com/free-icons/sports-and-competition" title="sports and competition icons">Sports and competition icons created by Maan Icons - Flaticon</a></p>
      </footer>
    </div>
  );
}