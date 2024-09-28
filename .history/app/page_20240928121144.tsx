'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { signUpWithGoogle, signUpWithFacebook, signUpWithPhone } from './lib/auth';
import { ApplicationVerifier } from 'firebase/auth';

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

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "Why LemmaOne?",
      answer: "A Lemma is a term in mathematics for an intermediate result or tool to prove a theorem. We are creating LemmaOne to prove that semi-pro sports is possible in South East Asia."
    },
    {
      question: "When are we planning to launch?",
      answer: "We plan on launching end of October or sometime in November with initial features and then add more features as we grow."
    },
    {
      question: "How can I join the wait list?",
      answer: "You can join the wait list by clicking on either the 'Players' or 'Organizers' button in the 'Join the Wait List' section and filling the form. We'll create an account for you upon soft launch."
    },
    {
      question: "What sports do you intend to add?",
      answer: "Currently Badminton, Volleyball, Basketball, Football, and Futsal, but we're open to suggestions"
    },
    {
      question: "What Features do we intend to add?",
      answer: "We're currently building a platform for sports hosting, but would like to grow into an interactive community to help build local tournaments to create a more immersive tournament experience, broaden their reach, and find new monetization methods. This way we can help grow a sustainable semi-pro sports community in South East Asia. "
    },
    {
      question: "Feature Suggestions?",
      answer: "We're always looking for new ideas an feature improvements. Join the Discord to build a community with us."
    },
    {
      question: "Have something to contribute?",
      answer: (
        <div className="flex flex-col items-center">
          <p>We're always looking for passionate web developers, designers, people with ideas, and passionate athletes to grow the community. You can contact us through our email or team member linkedin pages.</p>
          <a href="mailto:yytanwork@gmail.com" className="mt-2">
            <Image src="/icons/email.svg" alt="Email" width={24} height={24} />
          </a>
        </div>
      ),
    }

  ];

  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const [showOrganizerForm, setShowOrganizerForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    sports: [] as string[], // Changed from 'sport' to 'sports' and made it an array
    interestLevel: '',
    features: '',
    interestedFeatures: [] as string[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, options, type } = e.target as HTMLSelectElement;
  
    if (type === 'select-multiple') {
      // Collect selected values
      const selectedOptions = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
        
      setFormData(prevData => ({
        ...prevData,
        [name]: selectedOptions,
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const toggleForm = (formType: 'player' | 'organizer') => {
    if (formType === 'player') {
      setShowPlayerForm(true);
      setShowOrganizerForm(false);
    } else {
      setShowPlayerForm(false);
      setShowOrganizerForm(true);
    }
    // Reset form data when switching between forms
    setFormData({ name: '', sports: [], interestLevel: '', features: '', interestedFeatures: [] });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would handle the form submission, including OAuth authentication
    console.log('Form submitted:', formData);
    // Reset form and hide it after submission
    setFormData({ name: '', sports: [], interestLevel: '', features: '', interestedFeatures: [] });
    setShowPlayerForm(false);
    setShowOrganizerForm(false);
  };

  const handleSignUp = async (method: 'google' | 'facebook' | 'phone') => {
    try {
      let user;
      switch (method) {
        case 'google':
          user = await signUpWithGoogle(formData);
          break;
        case 'facebook':
          user = await signUpWithFacebook(formData);
          break;
        case 'phone':
          // You'll need to implement a way to get the phone number and set up the ApplicationVerifier
          const phoneNumber = '+1234567890'; // Replace with actual phone number input
          const appVerifier = {} as ApplicationVerifier; // Replace with actual ApplicationVerifier
          user = await signUpWithPhone(phoneNumber, appVerifier, formData);
          break;
      }
      console.log('User signed up:', user);
      // Handle successful sign-up (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle sign-up error (e.g., show an error message)
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
            <h1 className="text-2xl font-bold font-nike">LemmaOne</h1>
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
          <h2 className="text-4xl md:text-5xl font-bold font-nike mb-4">LemmaOne</h2>
          <p className="text-lg md:text-xl max-w-2xl">An all-in-one tournament space. Grow the sport you love.</p>
        </section>

        <section ref={platformRef} className="text-center flex flex-col items-center justify-center w-full max-w-4xl section-glass rounded-3xl p-8 my-16">
          <h3 className="text-2xl md:text-3xl font-semibold font-nike mb-4">A Platform for Athletes and Tournament Organizers</h3>
          <p className="text-base md:text-lg max-w-2xl">
            Introducing an all-in-one sports tournament platform. LemmaOne connects athletes and organizers, providing a space to grow the sport from amateur to semi-pro athletes by working together with organizers to create a more immersive tournament experience and scale their reach. We're also on a mission make semi-pro sports a reality in South East Asia.
          </p>
        </section>

        <section ref={waitListRef} className="text-center flex flex-col items-center justify-center w-full max-w-4xl section-glass rounded-3xl p-8 my-16">
          <h3 className="text-2xl md:text-3xl font-semibold font-nike mb-4">Join the Wait List</h3>
          <p className="text-base md:text-lg mb-6 max-w-2xl">
            By joining the wait list we'll create an account for you upon soft launch.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <button 
              onClick={() => toggleForm('player')} 
              className={`px-12 py-6 rounded-full text-xl font-semibold text-white transition-all duration-300 animate-pulse-subtle glow-button ${
                showPlayerForm ? 'bg-gradient-to-r from-orange-600 to-yellow-500' : 'bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500'
              }`}
            >
              Players
            </button>
            <button 
              onClick={() => toggleForm('organizer')}
              className={`px-12 py-6 rounded-full text-xl font-semibold text-white transition-all duration-300 animate-pulse-subtle glow-button ${
                showOrganizerForm ? 'bg-gradient-to-r from-purple-700 to-pink-600' : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600'
              }`}
            >
              Organizers
            </button>
          </div>

          {(showPlayerForm || showOrganizerForm) && (
            <div className="mt-8 w-full max-w-md">
              <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={showPlayerForm ? "Name" : "Organization Name"}
                  className="w-full p-2 mb-4 bg-black/50 text-white rounded"
                  required
                />
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Select Sports (Multiple)</label>
                  <select
  name="sports"
  value={formData.sports}
  onChange={handleInputChange}
  className="w-full p-2 mb-4 bg-black/50 text-white rounded"
  multiple
  required
>
  <option value="basketball">Basketball</option>
  <option value="football">Football</option>
  <option value="futsal">Futsal</option>
  <option value="badminton">Badminton</option>
  <option value="volleyball">Volleyball</option>
</select>
                  <p className="text-sm mt-2">Selected: {formData.sports.join(', ')}</p>
                </div>
                <select
                  name="interestLevel"
                  value={formData.interestLevel}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 bg-black/50 text-white rounded"
                  required
                >
                  <option value="">Select Interest Level</option>
                  <option value="amateur">Amateur</option>
                  <option value="competitive">Competitive</option>
                  <option value="semi-pro">Semi-Pro</option>
                  <option value="pro">Pro</option>
                </select>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Interested Features (Select multiple)</label>
                  <div className="bg-black/50 rounded-lg p-4">
                    <select
                      name="interestedFeatures"
                      value={formData.interestedFeatures}
                      onChange={handleInputChange}
                      className="w-full bg-transparent text-white"
                      multiple
                    >
                      {showOrganizerForm ? (
                        <>
                          <option value="tournament hosting">Tournament Hosting</option>
                          <option value="ticketing">Ticketing</option>
                          <option value="tournament monetization">Tournament Monetization</option>
                          <option value="merchandize sales">Merchandize Sales</option>
                          <option value="in-tournament features and updates">In-Tournament Features and Updates</option>
                          <option value="social media">Social Media</option>
                          <option value="pre-tournament previews">Pre-Tournament Previews</option>
                        </>
                      ) : (
                        <>
                          <option value="social media">Social Media</option>
                          <option value="pre-tournament previews">Pre-Tournament Previews</option>
                          <option value="merchandize sales">Merchandize Sales</option>
                          <option value="ticketing">Ticketing</option>
                          <option value="in-tournament features and updates">In-Tournament Features and Updates</option>
                          <option value="rankings">Rankings</option>
                          <option value="tournament earnings">Tournament Earnings</option>
                        </>
                      )}
                    </select>
                  </div>
                  <p className="text-sm mt-2">Selected: {formData.interestedFeatures.join(', ')}</p>
                </div>
                
                <textarea
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  placeholder="Any other features you'd like to see? (Optional)"
                  className="w-full p-2 mb-4 bg-black/50 text-white rounded"
                />
                <div className="flex flex-col space-y-2">
                  <button type="button" onClick={() => handleSignUp('google')} className="bg-blue-600 text-white p-2 rounded">
                    Sign up with Google
                  </button>
                  <button type="button" onClick={() => handleSignUp('facebook')} className="bg-blue-800 text-white p-2 rounded">
                    Sign up with Facebook
                  </button>
                  <button type="button" onClick={() => handleSignUp('phone')} className="bg-green-600 text-white p-2 rounded">
                    Sign up with Mobile
                  </button>
                </div>
                <button type="submit" className="w-full mt-4 bg-purple-600 text-white p-2 rounded">
                  Submit
                </button>
              </form>
            </div>
          )}
        </section>

        <section ref={communityRef} className="text-center flex flex-col items-center justify-center w-full max-w-4xl section-glass rounded-3xl p-8 my-16">
          <h3 className="text-2xl md:text-3xl font-semibold font-nike mb-4">The Community</h3>
          <p className="text-base md:text-lg mb-6 max-w-2xl">
            Help us grow the sports community in South East Asia which you love. Suggest features and get involved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://discord.gg/QztR7ZPM" className="inline-block px-8 py-4 rounded-full text-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300 neon-button-purple">
              Join Discord
            </a>
            <a href="#" className="inline-block px-8 py-4 rounded-full text-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors duration-300 neon-button-green">
              WhatsApp Channel
            </a>
            <a href="#" className="inline-block px-8 py-4 rounded-full text-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-300 neon-button-blue">
              Telegram Channel
            </a>
          </div>
        </section>

        <section ref={supportRef} className="text-center flex flex-col items-center justify-center w-full max-w-4xl section-glass rounded-3xl p-8 my-16">
          <h3 className="text-2xl md:text-3xl font-semibold font-nike mb-4">Support Us</h3>
          <p className="text-base md:text-lg mb-6 max-w-2xl">
            We're realising a limited kit for the launch. Help us continue to grow and support semi-pro sports scene in South East Asia.
          </p>
          <a href="#" className="inline-block px-12 py-6 rounded-full text-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors duration-300">
            Visit Our Merch Store
          </a>
        </section>

        <section ref={aboutRef} className="text-center flex flex-col items-center justify-center w-full max-w-4xl section-glass rounded-3xl p-8 my-16">
          <h3 className="text-2xl md:text-3xl font-semibold font-nike mb-4">About Us</h3>
          <p className="text-base md:text-lg max-w-2xl mb-8">
            In South East Asia, relative to the size of the population, especially that of the youth, and the fanbase for sports, there is a huge gap in both federation funding and professional funding for sports. LemmaOne is put together by a team of passionate athletes who want to build a community and a possibility for the next generation to realize their dreams in competitive sports.
          </p>
          <div className="flex flex-col items-center w-full">
            <h3 className="text-xl font-semibold mb-4 text-center">Yao</h3>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="relative w-28 h-28 flex-shrink-0 mb-4 md:mb-0">
                <Image
                  src="/about/profile.jpg"
                  alt="Yao"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <p className="text-sm opacity-70 text-center md:text-left md:pr-4 max-w-prose">
                Hi my name is Yao. I've been playing volleyball competitively since I was 14. I've competed in the largest national tournament when I was 17. After that, the notion of going pro for sports was almost non-existent in my country. I took a gamble and went abroad for a gap year. I ended up majoring in mathematics and computer science in university and, five years later, I'm back in this corner of the world to build things.
              </p>
            </div>
            <div className="flex flex-row items-center justify-center mt-4">
              <a href="https://www.linkedin.com/in/yi-yao-tan-9719301a3/" className="flex items-center mx-2">
                <Image src="/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} className="hover:opacity-80" />
              </a>
              <a href="mailto:yytanwork@gmail.com" className="flex items-center mx-2">
                <Image src="/icons/email.svg" alt="Email" width={24} height={24} className="hover:opacity-80" />
              </a>
            </div>
          </div>
        </section>

        <section ref={faqRef} className="text-center flex flex-col items-center justify-center w-full max-w-4xl section-glass rounded-3xl p-8 my-16">
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
