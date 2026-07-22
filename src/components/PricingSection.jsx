import { motion } from 'framer-motion'
import Reveal from './Reveal'
import circleCheck from '../assets/icons/circle-check.svg'
import circleCheckGray from '../assets/icons/circle-check-gray.svg'

const studioFeatures = [
  'Everything in Autopilot',
  'A dedicated editing team',
  'Full-length episodes',
  'Priority turnaround',
]

const autopilotFeatures = [
  'Unlimited tasks',
  'Vertical clips with captions, ready in 3 days',
  'Review, comment, and approve in the app',
  'Post to your socials from the app',
  'Your brand kit on every clip',
]

export default function PricingSection() {
  return (
    <section className="relative z-10 mx-auto max-w-[1200px] px-6 pb-[160px]">
      <Reveal className="mx-auto flex max-w-[626px] flex-col items-center gap-4 text-center">
        <h2 className="text-[32px] font-medium leading-[100%] text-slate-900 sm:text-[40px] lg:leading-[normal] lg:text-[48px]">
          Simple{' '}
          <span className="font-serif text-[32px] font-medium italic leading-[100%] text-indigo-600 sm:text-[40px] lg:leading-[normal] lg:text-[48px]">
            pricing
          </span>
        </h2>
        <p className="max-w-[379px] text-xl font-normal leading-tight text-[#3f3f46]">
          Start on Autopilot. Move to Studio when you need more
        </p>
      </Reveal>

      <div className="mx-auto mt-4 grid max-w-[900px] grid-cols-1 gap-4 lg:mt-8 lg:items-center lg:gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6 }}
          className="glass-indigo relative rounded-[20px] p-1 lg:rounded-3xl lg:p-2"
        >
          <div className="relative flex h-full flex-col gap-6 rounded-2xl border border-white/60 bg-white p-4 lg:p-5">
            <div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-2xl font-medium leading-[100%] text-slate-900">Autopilot</h3>
                <span className="shrink-0 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600">
                  Most popular
                </span>
              </div>
              <p className="mt-1 text-[15px] text-[#52525c] lg:whitespace-nowrap">
                A real editor on every video you send
              </p>
            </div>
            <div>
              <p className="flex items-end gap-2">
                <span className="text-xl text-slate-600 line-through">$399</span>
                <span className="text-3xl font-semibold tracking-tight text-slate-900">
                  $299
                </span>
                <span className="text-base text-[#52525c]">/month</span>
              </p>
              <p className="mt-1 text-xs font-medium text-indigo-600">1 slot available</p>
            </div>
            <ul className="flex flex-col gap-3">
              {autopilotFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-base text-slate-700 lg:whitespace-nowrap"
                >
                  <img src={circleCheck} alt="" className="mt-1 h-4 w-4 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3">
              <motion.a
                href="https://auto.clipwing.pro/"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.98 }}
                className="flex h-12 items-center justify-center rounded-xl border border-indigo-400 bg-indigo-500 text-base font-medium text-[#f6f5f4] shadow-[inset_0_2px_9px_0_rgba(254,254,254,0.25)] transition-colors hover:bg-[#4139E3]"
              >
                Get my clips
              </motion.a>
              <motion.a
                href="https://cal.com/lera-clipwing/clipwing-autopilot-onboarding"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.98 }}
                className="glass-soft flex h-12 items-center justify-center rounded-xl border border-indigo-300! text-base font-medium text-[#21234e] shadow-[inset_0_1px_2px_0_rgba(59,24,237,0.25)] transition-colors hover:bg-[#6565F0]/30"
              >
                Book a call
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6 }}
          className="glass-soft rounded-[20px] p-1 lg:rounded-3xl lg:p-2"
        >
          <div className="flex h-full flex-col gap-6 rounded-2xl border border-white/60 bg-white p-4 lg:p-5">
            <div>
              <h3 className="text-2xl font-medium leading-[100%] text-slate-900">Studio</h3>
              <p className="mt-1 text-[15px] text-[#52525c] lg:whitespace-nowrap">
                Higher volume and full-service production for teams
              </p>
            </div>
            <p className="text-3xl font-semibold tracking-tight text-slate-900">
              Custom
            </p>
            <ul className="flex flex-col gap-3">
              {studioFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-base text-slate-500 lg:whitespace-nowrap"
                >
                  <img src={circleCheckGray} alt="" className="mt-1 h-4 w-4 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3">
              <motion.a
                href="https://clipwing.pro/custom-video-production"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.98 }}
                className="flex h-12 items-center justify-center rounded-xl border border-slate-800 bg-slate-800 text-base font-medium text-white transition-colors hover:bg-[#0F172A]"
              >
                See Studio
              </motion.a>
              <motion.a
                href="https://cal.com/lera-clipwing/clipwing-autopilot-onboarding"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.98 }}
                className="glass-soft flex h-12 items-center justify-center rounded-xl border border-indigo-300! text-base font-medium text-[#21234e] shadow-[inset_0_1px_2px_0_rgba(59,24,237,0.25)] transition-colors hover:bg-[#6565F0]/30"
              >
                Book a call
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
