import { motion } from 'framer-motion'
import HeroApp from './HeroApp'
import { Button } from '@/components/ui/button'
import { publicAsset } from '@/lib/publicAsset'
import '@/hero-app.css'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { y: 20 },
  show: { y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={container}
      className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center gap-8 px-6 pt-[34px] pb-[160px] text-center"
    >
      <div className="flex flex-col items-center gap-4">
        <motion.h1
          variants={item}
          className="font-sans text-[clamp(30px,calc((100vw_-_3rem)/8.4),46px)] font-medium leading-[1.15] text-slate-900 sm:text-[56px] lg:text-[70px] lg:leading-[76px]"
        >
          {/* Mobile (<sm): three balanced lines. The <br> splits the first line
              into "Smarter than" / "AI clippers,", and the fluid clamp size
              keeps "easier than hiring" on one line down to ~320px screens.
              At sm+ the <br> and nowrap drop out, so desktop is unchanged. */}
          <span className="block max-sm:whitespace-nowrap">
            Smarter than
            <br className="sm:hidden" /> AI clippers,
          </span>
          <span className="block max-sm:whitespace-nowrap">
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
        <p className="text-base text-slate-500">No credit card required</p>
      </motion.div>

      {/* Clickable prototype. Mobile + tablet: stretch to the full grid width.
          Desktop (lg+): fixed, capped width, centered in the hero text column. */}
      <div className="hero-grass-frame mx-auto -mt-2 w-full lg:mt-0 lg:w-[calc(min(1260px,100vw-2rem)-220px)]">
        {/* Grass behind the app — its top blades cover the bottom ~20% of the app. */}
        <img
          src={publicAsset('hero-grass-under.png')}
          alt=""
          aria-hidden="true"
          className="hero-grass hero-grass--under"
        />
        <div className="hero-grass-app">
          <HeroApp />
        </div>
        {/* Grass in front of the app — identical placement, so it sits at the
            same height and overlaps the same bottom band from the front. */}
        <img
          src={publicAsset('hero-grass-over.png')}
          alt=""
          aria-hidden="true"
          className="hero-grass hero-grass--over"
        />
      </div>
    </motion.section>
  )
}
