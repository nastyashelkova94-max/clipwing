import { motion } from 'framer-motion'
import HeroCollage from './HeroCollage'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={container}
      className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center gap-8 px-6 pt-16 pb-16 text-center"
    >
      <div className="flex flex-col items-center gap-4">
        <motion.h1
          variants={item}
          className="font-sans text-[46px] font-medium leading-[1.15] text-slate-900 sm:text-[56px] lg:text-[70px] lg:leading-[76px]"
        >
          <span className="block">Smarter than an AI clipper,</span>
          <span className="block">
            <span className="font-serif font-medium italic text-indigo-600">
              easier
            </span>{' '}
            than hiring
          </span>
        </motion.h1>
        <motion.p
          variants={item}
          className="max-w-[449px] font-sans text-xl font-normal text-[#3f3f46]"
        >
          You send a video link. A real editor turns it into clips in 3 days. No
          hunting, no hassle
        </motion.p>
      </div>

      <motion.div variants={item} className="flex w-full flex-col items-center gap-4">
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
        <p className="text-base text-slate-500">No credit card required</p>
      </motion.div>

      <div className="-mt-2 w-full lg:mt-0">
        <HeroCollage />
      </div>
    </motion.section>
  )
}
