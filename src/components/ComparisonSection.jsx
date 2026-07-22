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
    image: frameClipwing,
    imageHeight: 'h-[352px]',
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
    image: frameUpwork,
    imageHeight: 'h-[244px]',
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
            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
              <img
                src={card.image}
                alt=""
                className={`w-full object-cover ${card.imageHeight}`}
              />
              <div className="flex flex-col items-start gap-6 p-4 text-left lg:px-4 lg:py-8">
                <h3
                  className={`flex items-center gap-2 text-2xl font-semibold leading-[100%] tracking-tight ${
                    card.highlighted ? 'text-slate-900' : 'text-slate-500'
                  }`}
                >
                  {card.highlighted && (
                    <img src={logoMark} alt="" className="h-6 w-6" />
                  )}
                  {card.title}
                </h3>
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
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
