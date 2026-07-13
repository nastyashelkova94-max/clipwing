import { motion } from 'framer-motion'
import Reveal from './Reveal'

export default function FinalCtaSection() {
  return (
    <section className="relative z-10 mx-auto max-w-[1200px] px-6 pb-[160px]">
      <Reveal className="mx-auto flex flex-col items-center gap-4 text-center">
        <h2 className="text-[32px] font-medium text-slate-900 sm:text-[40px] lg:whitespace-nowrap lg:text-[48px]">
          Get clips without the{' '}
          <span className="font-serif text-[32px] font-medium italic text-indigo-600 sm:text-[40px] lg:text-[48px]">
            editor hunt
          </span>
        </h2>
        <p className="max-w-[480px] text-xl font-normal leading-tight text-slate-900">
          Send a link and a hand-picked editor takes it from there. Pick a plan
          to start.
        </p>
      </Reveal>

      <div className="mx-auto mt-6 flex flex-col items-center gap-4 lg:mt-8">
        <div className="flex flex-nowrap items-center justify-center gap-4">
          <motion.a
            href="#"
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex h-12 items-center justify-center whitespace-nowrap rounded-xl bg-indigo-500 px-6 py-3 text-base font-medium text-[#f6f5f4] shadow-[inset_0_2px_9px_0_rgba(254,254,254,0.25)]"
          >
            Get my clips
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="glass-soft flex h-12 items-center justify-center whitespace-nowrap rounded-xl border border-indigo-300! px-6 py-3 text-base font-medium text-[#21234e] shadow-[inset_0_1px_2px_0_rgba(59,24,237,0.25)]"
          >
            Book a call
          </motion.a>
        </div>
        <p className="text-base text-slate-500">
          Free to sign up · 3000+ creators
        </p>
      </div>
    </section>
  )
}
