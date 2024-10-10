import React, { forwardRef } from 'react';
import Image from 'next/image';
import GrowingButton from './ui/GrowingButton';


const AboutSection = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="text-center flex flex-col items-center justify-center w-full max-w-4xl section-glass rounded-3xl p-8 my-16">
      <h3 className="text-2xl md:text-3xl font-semibold font-open-sans mb-4">About Us</h3>
      <p className="text-base md:text-lg max-w-2xl mb-8">
        In South East Asia, relative to the size of the population, especially that of the youth, and the fanbase for sports, there is a huge gap in both federation funding and professional funding for sports. LemmaOne envisions to build a strong and inclusive sports community and democratize access to competitive sports.
      </p>
      <div className="flex flex-col items-center w-full">
        <h3 className="text-xl font-semibold mb-4 text-center">Yao</h3>
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
            Hi my name is Yao. I've been playing volleyball competitively since I was 14. I've competed in the largest national tournament when I was 17. After that, the notion of going pro for sports was almost non-existent in my country. I took a gamble and went abroad for a gap year. I ended up majoring in mathematics and computer science in university and, five years later, I'm back in this corner of the world to build things.
          </p>
        </div>
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
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;