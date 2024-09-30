import React, { useState } from 'react';
import Image from 'next/image';

interface FAQ {
  question: string;
  answer: string | JSX.Element;
}

const FAQSection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs: FAQ[] = [
    {
      question: "Why the name LemmaOne?",
      answer: "A 'lemma' is a term in mathematics for an intermediate result or tool to prove a theorem. We are creating LemmaOne to prove that semi-pro sports is possible in South East Asia and that SEA has one of the most vibrant sports communities in the world."
    },
    {
      question: "When are we planning to launch?",
      answer: "We plan on launching end of October or sometime in November with initial features and then add more features as we grow."
    },
    {
      question: ""
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


  return (
    <section className="text-center flex flex-col items-center justify-center w-full max-w-4xl section-glass rounded-3xl p-8 my-16">
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
  );
};

export default FAQSection;