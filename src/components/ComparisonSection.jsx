import { motion } from 'framer-motion'
import Reveal from './Reveal'
import teamAvatars from '../assets/images/team-avatars.png'

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
                ? 'glass-indigo relative z-10 shadow-xl shadow-indigo-500/30 lg:-my-6 lg:scale-110'
                : 'glass-soft'
            }`}
          >
            <div
              className={`flex flex-col gap-6 rounded-2xl p-6 text-left ${
                card.highlighted
                  ? 'bg-indigo-600'
                  : 'border border-slate-100 bg-white'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3
                  className={
                    card.highlighted
                      ? 'text-2xl font-semibold leading-[100%] tracking-tight text-white'
                      : 'text-xl font-medium leading-[100%] text-[#21234e]'
                  }
                >
                  {card.title}
                </h3>
                {card.highlighted && (
                  <div className="flex shrink-0 items-center gap-2">
                    <img src={teamAvatars} alt="" className="h-8 w-auto" />
                    <span className="whitespace-nowrap text-sm text-indigo-100">
                      +15 creators
                    </span>
                  </div>
                )}
              </div>

              <ul className="flex flex-col gap-3">
                {card.points.map((point) => (
                  <li
                    key={point}
                    className={`text-base ${
                      card.highlighted ? 'text-white/90' : 'text-slate-500'
                    }`}
                  >
                    {point}
                  </li>
                ))}
              </ul>

              {card.highlighted && (
                <a
                  href="https://auto.clipwing.pro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto flex h-12 items-center justify-center rounded-xl bg-white text-base font-medium text-indigo-600 transition-colors hover:bg-indigo-50"
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
