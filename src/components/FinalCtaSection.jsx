import { motion } from 'framer-motion'
import Reveal from './Reveal'

export default function FinalCtaSection() {
  return (
    <section className="relative z-10 mx-auto max-w-[1200px] px-6 pb-[160px]">
      <Reveal className="mx-auto flex flex-col items-center gap-4 text-center">
        <h2 className="text-[32px] font-medium leading-[100%] text-slate-900 sm:text-[40px] lg:leading-[normal] lg:whitespace-nowrap lg:text-[48px]">
          Get clips without the{' '}
          <span className="font-serif text-[32px] font-medium italic leading-[100%] text-indigo-600 sm:text-[40px] lg:leading-[normal] lg:text-[48px]">
            editor hunt
          </span>
        </h2>
        <p className="max-w-[480px] text-xl font-normal leading-tight text-[#3f3f46]">
          Send a link and a hand-picked editor takes it from there. Pick a plan
          to start.
        </p>
      </Reveal>

      <div className="mx-auto mt-4 flex flex-col items-center gap-4 lg:mt-8">
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:flex-nowrap sm:items-center sm:justify-center">
          <motion.a
            href="https://auto.clipwing.pro/"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.97 }}
            className="flex h-12 w-full items-center justify-center whitespace-nowrap rounded-xl bg-indigo-500 px-6 py-3 text-base font-medium text-[#f6f5f4] shadow-[inset_0_2px_9px_0_rgba(254,254,254,0.25)] transition-colors hover:bg-[#4139E3] sm:w-auto"
          >
            Get my clips
          </motion.a>
          <motion.a
            href="https://cal.com/lera-clipwing/clipwing-autopilot-onboarding"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.97 }}
            className="glass-soft flex h-12 w-full items-center justify-center whitespace-nowrap rounded-xl border border-indigo-300! px-6 py-3 text-base font-medium text-[#21234e] shadow-[inset_0_1px_2px_0_rgba(59,24,237,0.25)] transition-colors hover:bg-[#6565F0]/30 sm:w-auto"
          >
            Book a call
          </motion.a>
        </div>
      </div>
    </section>
  )
}
