'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend booking at least 3-7 days in advance for regular celebrations. For peak dates (Valentine\'s Day, New Year\'s Eve), book 2-4 weeks ahead to secure your preferred slot.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'You can cancel or reschedule for free up to 24 hours before your booking. Cancellations within 24 hours are subject to a 50% charge. No-shows are charged the full amount.',
  },
  {
    question: 'Can I bring my own food and decorations?',
    answer: 'Absolutely! You\'re welcome to bring your own decorations and food. We also offer premium decor packages and gourmet catering if you prefer a hassle-free experience.',
  },
  {
    question: 'What movies can we watch?',
    answer: 'You can choose from our extensive library of 5000+ movies, or bring your own content on a USB drive. We support all major formats including Netflix, Prime Video, and Disney+ Hotstar.',
  },
  {
    question: 'Is there a minimum or maximum group size?',
    answer: 'Our rooms accommodate 2 to 50 guests. The Intimate Corner is perfect for 2-4 people, while the Party Zone can host up to 50 guests with dance floor and karaoke.',
  },
  {
    question: 'What are your operating hours?',
    answer: 'We\'re open daily from 10:00 AM to 11:00 PM. Late night slots (after 9 PM) are available with prior arrangement for an additional charge.',
  },
  {
    question: 'Do you offer photography services?',
    answer: 'Yes! Our Gold and Diamond packages include professional photography. You can also add photography as an à la carte service starting at ₹1,499 for 20 edited shots.',
  },
  {
    question: 'Is parking available?',
    answer: 'Yes, all our locations offer complimentary valet parking. We also have tie-ups with nearby parking facilities for overflow during peak hours.',
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative section-padding bg-transparent">
      <div className="mx-auto max-w-[800px] px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-accent uppercase tracking-[0.3em] text-amber">FAQ</span>
          <h2 className="mt-4 font-display text-4xl font-bold text-ivory md:text-5xl text-balance">
            Common <span className="text-gradient-amber">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div
                  className={`rounded-card border transition-all duration-300 ${
                    isOpen 
                      ? 'border-amber/20 bg-amber/5' 
                      : 'border-amber/10 bg-white/60 hover:border-amber/20'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors ${
                        isOpen ? 'bg-amber/20' : 'bg-amber/10'
                      }`}>
                        <HelpCircle className={`h-4 w-4 transition-colors ${
                          isOpen ? 'text-amber' : 'text-amber/60'
                        }`} />
                      </div>
<span className="font-medium text-ink">
                          {faq.question}
                        </span>
                    </div>
                    <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-amber' : 'text-ink-secondary'
                    }`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-0">
                          <div className="border-t border-amber/10 pt-4">
                            <p className="text-ink leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}