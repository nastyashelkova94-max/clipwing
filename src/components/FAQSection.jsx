import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'
import plusIcon from '../assets/icons/plus.svg'

const faqs = [
  {
    q: 'Will the clips be generic?',
    a: 'No. AI gets the draft fast, a real editor makes it land. On-brand, in context, not a template cut.',
  },
  {
    q: 'Do I need to send timecodes or pick moments?',
    a: 'Never. Finding the best moments is our job. Most clients never send a single timecode.',
  },
  {
    q: 'How fast will I get clips?',
    a: 'Within 3 days of sending your link.',
  },
  {
    q: 'Who edits my clips?',
    a: 'A hand-picked editor from our vetted group. You never search for one or manage one.',
  },
  {
    q: 'Will it match my brand?',
    a: 'Yes. Captions, style, and pacing follow your look. Tell us once.',
  },
  {
    q: 'What can I send?',
    a: 'Right now, any video on YouTube: podcasts, webinars, demos, or product updates. Just paste the link.',
  },
  {
    q: 'How are you different from auto-clip tools?',
    a: 'Auto-clippers give you generic cuts you still have to fix. With us, a real, vetted editor makes the clips.',
  },
  {
    q: 'What about hiring a freelance editor?',
    a: 'No job posts, no managing, no chasing deadlines. Fixed monthly plan, predictable output.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="relative z-10 mx-auto max-w-[1200px] px-6 pb-40">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[540px_1fr]">
        <Reveal className="flex flex-col items-start gap-4">
          <h2 className="whitespace-nowrap text-[48px] font-medium text-slate-900">
            Have some questions?
          </h2>
        </Reveal>

        <div className="flex flex-col gap-5">
          {faqs.map((faq, i) => {
            const isOpen = i === openIndex
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -2 }}
                className="glass-soft overflow-hidden rounded-3xl p-2"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full rounded-2xl bg-white p-6 text-left"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-medium text-[#21234e]">{faq.q}</h3>
                    {isOpen ? (
                      <span className="block h-[2px] w-4 shrink-0 bg-slate-800" />
                    ) : (
                      <img src={plusIcon} alt="" className="h-6 w-6 shrink-0" />
                    )}
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && faq.a && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 text-base leading-snug text-[#21234e]">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
