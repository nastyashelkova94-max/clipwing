import { motion } from 'framer-motion'
import Reveal from './Reveal'
import circleCheck from '../assets/icons/circle-check-2.svg'
import circleX from '../assets/icons/circle-x.svg'
import logoMark from '../assets/logo/logo-mark.svg'
import teamAvatars from '../assets/images/team-avatars.png'

function PersonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" strokeLinecap="round" />
    </svg>
  )
}

const cards = [
  {
    key: 'ai',
    icon: circleX,
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
    icon: circleCheck,
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
    icon: circleX,
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

      <div className="mx-auto mt-4 grid w-full grid-cols-1 items-center gap-4 lg:mt-8 lg:grid-cols-3">
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
                ? 'glass-indigo relative z-10 border-2 border-indigo-400 shadow-xl shadow-indigo-500/20 lg:-my-4 lg:scale-105'
                : 'glass-soft'
            }`}
          >
            <div className="flex flex-col gap-6 rounded-2xl border border-slate-100 bg-white p-6 text-left">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {card.highlighted ? (
                    <img src={logoMark} alt="" className="h-7 w-7 shrink-0" />
                  ) : (
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-400">
                      <PersonIcon className="size-5" />
                    </span>
                  )}
                  <h3 className="text-2xl font-semibold leading-[100%] tracking-tight text-slate-900">
                    {card.title}
                  </h3>
                </div>
                {card.highlighted && (
                  <div className="flex shrink-0 items-center gap-2">
                    <img src={teamAvatars} alt="" className="h-8 w-auto" />
                    <span className="whitespace-nowrap text-sm text-slate-500">
                      +15 creators
                    </span>
                  </div>
                )}
              </div>

              <hr className="border-slate-100" />

              <ul className="flex flex-col gap-3">
                {card.points.map((point) => (
                  <li
                    key={point}
                    className={`flex items-start gap-2 text-base ${
                      card.highlighted ? 'text-slate-700' : 'text-slate-500'
                    }`}
                  >
                    <img src={card.icon} alt="" className="mt-1 h-4 w-4 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
