import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { Button } from '@/components/ui/button'

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
          <Button asChild variant="brand" size="xl" className="w-full sm:w-auto">
            <motion.a
              href="https://auto.clipwing.pro/"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.97 }}
            >
              Get my clips
            </motion.a>
          </Button>
          <Button asChild variant="brandSoft" size="xl" className="w-full sm:w-auto">
            <motion.a
              href="https://cal.com/lera-clipwing/clipwing-autopilot-onboarding"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.97 }}
            >
              Book a call
            </motion.a>
          </Button>
        </div>
      </div>
    </section>
  )
}
