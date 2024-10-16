import React, { forwardRef, useState } from 'react';
import Image from 'next/image';
import GrowingButton from './ui/GrowingButton';

interface AboutSectionProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AboutSection = forwardRef<HTMLElement, AboutSectionProps>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section ref={ref} className="text-center flex flex-col items-center justify-center w-full max-w-4xl section-glass rounded-3xl p-8 my-16">
      <h3 className="text-2xl md:text-3xl font-semibold font-open-sans mb-4">About Us</h3>
      <p className="text-base md:text-lg max-w-2xl mb-8">
        In South East Asia, relative to the size of the population, especially that of the youth, and the fanbase for sports, there is a huge gap in both federation funding and professional funding for sports. LemmaOne envisions to build a strong and inclusive sports community and democratize access to competitive sports.
      </p>
      <div className="flex flex-col items-center w-full">
        <h3 
          className="text-xl font-semibold mb-4 text-center cursor-pointer flex items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          Yao
          <svg
            className={`ml-2 h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </h3>
        {isOpen && (
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="relative w-28 h-28 flex-shrink-0 mb-4 md:mb-0">
              <Image
                src="/about/profile.jpg"
                alt="Yao"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-full"
              />
            </div>
            <p className="text-sm opacity-70 text-center md:text-left md:pr-4 max-w-prose">
              &nbsp;&nbsp;&nbsp;&nbsp;Hi my name is Yao. I've been playing volleyball competitively since I was 14. I've competed in the largest national tournament when I was 17. After that, the notion of going pro for sports was almost non-existent in Malaysia.<br /> <br /> &nbsp;&nbsp;&nbsp;&nbsp; I took a gamble, in pursuit of a dream, and went abroad in France for a gap year. Having only 2 months of Duolingo and 150 words under my belt, I emailed 40 different clubs with google translate. The first night in Paris, before even seeing the Eiffel Tower from afar, I found myself in a volleyball club which I enjoyed so much and stayed with them for the rest of the year. In the end, the French men made a historic back-to-back Olympic title (2021 and 2024), I wasn't wrong; but, on the other hand, I didn't end up playing professionally. At least I learnt to speak fluent French from club volleyball. <br /> <br /> &nbsp;&nbsp;&nbsp;&nbsp;I ended up majoring in mathematics and computer science in École Polytechnique and Oxford and, five years later, I'm back in this corner of the world to build things.
            </p>
            <div className="flex flex-row items-center justify-center mt-4">
              <GrowingButton
                onClick={() => window.open('https://www.linkedin.com/in/yi-yao-tan-9719301a3/', '_blank')}
                className="flex items-center mx-2"
              >
                <Image src="/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} className="hover:opacity-80" />
              </GrowingButton>
              <GrowingButton
                onClick={() => window.open('mailto:yytanwork@gmail.com', '_blank')}
                className="flex items-center mx-2"
              >
                <Image src="/icons/email.svg" alt="Email" width={24} height={24} className="hover:opacity-80" />
                </GrowingButton>
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;