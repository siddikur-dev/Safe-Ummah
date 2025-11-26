'use client'
import { useState } from 'react';

const faqs = [
  {
    question: 'How do I create an account?',
    answer: 'Click the Sign In button and use Google login or your credentials to create a secure account instantly.',
    icon: '👤'
  },
  {
    question: 'How can I add a new product?',
    answer: 'After logging in, go to the Dashboard and use the Add Product form. Fill in the details and submit.',
    icon: '➕'
  },
  {
    question: 'Are my personal details safe?',
    answer: 'Yes, we use secure authentication and never share your information with third parties.',
    icon: '🔒'
  },
  {
    question: 'How do I view product details?',
    answer: 'Click on any product card or the Details button to see full information, including the seller.',
    icon: '👁️'
  },
  {
    question: 'Can I edit or delete my products?',
    answer: 'Currently, you can add products. Editing and deleting features are coming soon!',
    icon: '✏️'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and secure online payment gateways for your convenience.',
    icon: '💳'
  },
  {
    question: 'How fast is your shipping?',
    answer: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery.',
    icon: '🚚'
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for all products in their original condition.',
    icon: '↩️'
  }
];

export default function Faqs() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-16 px-4 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full text-red-600 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            FAQ
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our products, services, and platform.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${
                open === idx ? 'ring-2 ring-red-500 border-red-200' : ''
              }`}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                onClick={() => setOpen(open === idx ? null : idx)}
                aria-expanded={open === idx}
                aria-controls={`faq-answer-${idx}`}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{faq.icon}</span>
                  <span className="font-semibold text-gray-900 text-lg group-hover:text-red-600 transition-colors">
                    {faq.question}
                  </span>
                </div>
                <div className={`flex-shrink-0 ml-4 transition-all duration-300 ${
                  open === idx ? 'rotate-180 text-red-500' : 'text-gray-400 group-hover:text-red-500'
                }`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div
                id={`faq-answer-${idx}`}
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  open === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 pt-0">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-600 text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-8 border border-red-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Please chat to our friendly team.
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all duration-200 border-2 border-red-500 hover:border-red-600 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
