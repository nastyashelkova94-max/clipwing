import { motion } from 'framer-motion'
import Reveal from './Reveal'
import logoMark from '../assets/logo/logo-mark.svg'
import card2Bg from '../assets/images/card2.png'

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="0.933" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 8l1.333 1.333L10 6.667" />
      <circle cx="8" cy="8" r="6.667" />
    </svg>
  )
}

function CrossIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="0.933" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 6L6 10M6 6l4 4" />
      <circle cx="8" cy="8" r="6.667" />
    </svg>
  )
}

const cards = [
  {
    key: 'ai',
    highlighted: false,
    title: (
      <>
        AI <span className="text-slate-500 line-through">Clippers</span> Slopers
      </>
    ),
    points: [
      'Picks random moments',
      'Misses the key idea',
      'Makes generic edits',
      'You still have to fix everything',
    ],
  },
  {
    key: 'clipwing',
    highlighted: true,
    title: 'Clipwing Autopilot',
    points: [
      'Upload your video',
      'Get matched with a real editor',
      'Get consistent, high-quality edits',
      'Review, approve, and publish in one app',
    ],
  },
  {
    key: 'upwork',
    highlighted: false,
    title: 'Freelance editor',
    points: [
      'Post a job, screen strangers',
      'Re-explain your brand every time',
      'Chase files and deadlines',
      'Start over when they disappear',
    ],
  },
]

export default function ComparisonSection() {
  return (
    <section className="relative z-10 mx-auto max-w-[1200px] px-6 pb-[160px]">
      <Reveal className="mx-auto flex flex-col items-center gap-2 text-center">
        <h2 className="text-[32px] leading-[100%] font-medium text-slate-900 sm:text-[40px] lg:text-[48px] lg:leading-[1.15]">
          Get your clips without AI slop
          <br className="hidden lg:inline" /> or hiring hassle
        </h2>
      </Reveal>

      <div className="mx-auto mt-4 grid w-full grid-cols-1 items-center gap-4 lg:mt-16 lg:grid-cols-3 lg:gap-8">
        {cards.map((card, i) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
            className={`overflow-hidden rounded-[20px] p-1 lg:rounded-3xl lg:p-2 ${
              card.highlighted
                ? 'glass-indigo relative z-10 shadow-[0_24px_48px_-16px_rgba(79,70,229,0.35)] lg:-my-6 lg:scale-105'
                : 'glass-soft lg:mx-3'
            }`}
          >
            <div
              className={`relative flex flex-col gap-6 overflow-hidden rounded-2xl text-left ${
                card.highlighted
                  ? 'bg-white px-5 pb-[140px] pt-[30px]'
                  : 'border border-slate-100 bg-white/70 p-5'
              }`}
            >
              {card.highlighted && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 overflow-hidden"
                >
                  <img
                    src={card2Bg}
                    alt=""
                    className="absolute inset-0 h-full w-full scale-125 object-cover object-bottom"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: 'linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0) 55%)',
                    }}
                  />
                </div>
              )}

              <h3
                className={
                  card.highlighted
                    ? 'relative flex items-center gap-2 text-2xl font-semibold leading-[100%] tracking-tight text-[#21234e]'
                    : 'text-xl font-medium leading-[100%] text-slate-500'
                }
              >
                {card.highlighted && (
                  <img src={logoMark} alt="" className="h-6 w-6 shrink-0" />
                )}
                {card.title}
              </h3>

              <ul className="relative flex flex-col gap-3">
                {card.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-base text-slate-500"
                  >
                    {card.highlighted ? (
                      <CheckIcon className="mt-1 size-4 shrink-0 text-indigo-600" />
                    ) : (
                      <CrossIcon className="mt-1 size-4 shrink-0 text-slate-500" />
                    )}
                    {point}
                  </li>
                ))}
              </ul>

              {card.highlighted && (
                <a
                  href="https://auto.clipwing.pro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-auto flex h-12 items-center justify-center whitespace-nowrap rounded-xl bg-indigo-500 px-6 py-3 text-base font-medium text-white shadow-[inset_0_2px_9px_0_rgba(254,254,254,0.25)] transition-colors hover:bg-indigo-600"
                >
                  Get my clips
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
