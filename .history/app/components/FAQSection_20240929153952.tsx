import React from 'react';

interface FAQ {
  question: string;
  answer: string | JSX.Element;
}

interface FAQSectionProps {
  faqs: FAQ[];
  openFAQ: number | null;
  toggleFAQ: (index: number) => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs, openFAQ, toggleFAQ }) => {
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