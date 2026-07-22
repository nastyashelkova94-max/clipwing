import { motion } from 'framer-motion'
import Reveal from './Reveal'
import circleX from '../assets/icons/circle-x.svg'
import logoMark from '../assets/logo/logo-mark.svg'

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="0.933" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 8l1.333 1.333L10 6.667" />
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
    title: 'Upwork',
    points: [
      'Post a job, run test project, screen strangers',
      'Re-explain your brand every time',
      'Chase files and deadlines',
      'Start over when they disappear',
    ],
  },
]

export default function ComparisonSection() {
  return (
    <section className="relative z-10 mx-auto max-w-[1240px] px-6 pb-[160px]">
      <Reveal className="mx-auto flex flex-col items-center gap-2 text-center">
        <h2 className="text-[32px] leading-[100%] font-medium text-slate-900 sm:text-[40px] lg:text-[48px] lg:leading-[1.15]">
          Get your clips without AI slop
          <br className="hidden lg:inline" /> or hiring hassle
        </h2>
      </Reveal>

      <div className="mx-auto mt-4 grid w-full grid-cols-1 items-center gap-4 lg:mt-16 lg:grid-cols-3">
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
                ? 'glass-indigo relative z-10 shadow-xl shadow-indigo-500/30 lg:-my-6 lg:scale-110'
                : 'glass-soft'
            }`}
          >
            <div
              className={`flex flex-col gap-6 rounded-2xl p-5 text-left ${
                card.highlighted
                  ? 'bg-indigo-500'
                  : 'border border-slate-100 bg-white'
              }`}
            >
              <h3
                className={
                  card.highlighted
                    ? 'flex items-center gap-2 text-2xl font-semibold leading-[100%] tracking-tight text-white'
                    : 'text-xl font-medium leading-[100%] text-[#21234e]'
                }
              >
                {card.highlighted && (
                  <img src={logoMark} alt="" className="h-6 w-6 shrink-0 invert" />
                )}
                {card.title}
              </h3>

              <ul className="flex flex-col gap-3">
                {card.points.map((point) => (
                  <li
                    key={point}
                    className={`flex items-start gap-2 text-base ${
                      card.highlighted ? 'text-white/90' : 'text-slate-500'
                    }`}
                  >
                    {card.highlighted ? (
                      <CheckIcon className="mt-1 size-4 shrink-0" />
                    ) : (
                      <img src={circleX} alt="" className="mt-1 h-4 w-4 shrink-0" />
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
                  className="mt-auto flex h-12 items-center justify-center whitespace-nowrap rounded-xl bg-white px-6 py-3 text-base font-medium text-indigo-600 shadow-[inset_0_1px_2px_0_rgba(59,24,237,0.1)] transition-colors hover:bg-indigo-50"
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
