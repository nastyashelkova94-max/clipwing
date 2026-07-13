import { motion } from 'framer-motion'
import Reveal from './Reveal'
import frameSlop from '../assets/images/frame-slop.gif'
import frameClipwing from '../assets/images/frame-clipwing.gif'
import frameUpwork from '../assets/images/frame-upwork.gif'
import circleCheck from '../assets/icons/circle-check-2.svg'
import circleX from '../assets/icons/circle-x.svg'
import logoMark from '../assets/logo/logo-mark.svg'

const cards = [
  {
    key: 'ai',
    image: frameSlop,
    imageHeight: 'h-[244px]',
    icon: circleX,
    highlighted: false,
    title: (
      <>
        AI <span className="text-slate-500 line-through">Clippers</span>{' '}
        <span className="inline-block -rotate-2 font-serif italic text-indigo-600">
          Sloppers
        </span>
      </>
    ),
    points: [
      'Cuts at random, misses the point',
      'Captions jump, transitions glitch',
      'Cheap, and it looks cheap',
      'You fix it all by hand anyway',
    ],
  },
  {
    key: 'clipwing',
    image: frameClipwing,
    imageHeight: 'h-[352px]',
    icon: circleCheck,
    highlighted: true,
    title: 'Clipwing',
    points: [
      'Send a link, a real editor makes it',
      'AI draft plus human taste',
      'Same editor, your brand kit',
      'Ready in 3 days, all in one app',
    ],
  },
  {
    key: 'upwork',
    image: frameUpwork,
    imageHeight: 'h-[258px]',
    icon: circleX,
    highlighted: false,
    title: 'An Upwork editor',
    points: [
      'Post a job, run test edits, screen strangers',
      'Ghosts you, then misses the deadline',
      'Re-explain your brand every time',
      'Quality is a coin flip',
    ],
  },
]

export default function ComparisonSection() {
  return (
    <section className="relative z-10 mx-auto max-w-[1200px] px-6 pb-[160px]">
      <Reveal className="mx-auto flex flex-col items-center gap-2 text-center">
        <h2 className="text-[32px] leading-[1.15] font-medium text-slate-900 sm:text-[40px] lg:text-[48px]">
          <span className="block">Three ways to get clips.</span>
          <span className="block font-serif italic text-indigo-600">
            Two are a pain
          </span>
        </h2>
      </Reveal>

      <div className="mx-auto mt-6 grid max-w-[1280px] grid-cols-1 items-end gap-4 lg:mt-8 lg:grid-cols-3 lg:gap-[90px]">
        {cards.map((card, i) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
            className={`overflow-hidden rounded-[20px] p-1 shadow-sm lg:rounded-3xl lg:p-2 ${
              card.highlighted ? 'glass-indigo lg:-mt-8' : 'glass-soft'
            }`}
          >
            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
              <img
                src={card.image}
                alt=""
                className={`w-full object-cover ${card.imageHeight}`}
              />
              <div className="flex flex-col items-start gap-6 p-4 text-left lg:px-6 lg:py-8">
                <h3 className="flex items-center gap-2 text-2xl font-semibold leading-[100%] tracking-tight text-slate-900">
                  {card.highlighted && (
                    <img src={logoMark} alt="" className="h-6 w-6" />
                  )}
                  {card.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {card.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-base text-slate-700"
                    >
                      <img src={card.icon} alt="" className="h-4 w-4 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
