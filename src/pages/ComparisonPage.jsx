import { useEffect } from 'react'
import { motion } from 'framer-motion'
import skyBg from '../assets/images/sky-bg.svg'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Button } from '@/components/ui/button'
import ScorecardTable from '../components/comparison/ScorecardTable'
import FinalCtaSection from '../components/FinalCtaSection'

const SECTION = 'relative z-10 mx-auto w-full max-w-[1200px] px-4 sm:px-6'

function Ctas({ className = '' }) {
  return (
    <div className={`flex w-full flex-col gap-3 sm:w-auto sm:flex-row ${className}`}>
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
  )
}

export default function ComparisonPage() {
  // The site is a single HTML shell, so the tab title is set per page here.
  useEffect(() => {
    const previous = document.title
    document.title = 'Clipwing vs OpusClip'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <>
      <Header />
      <main className="relative overflow-x-clip">
        {/* The sky held still to the window. */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 bg-[#bfe3fa] bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: `url(${skyBg})` }}
        />
        <section className={`${SECTION} pb-14 pt-[44px] lg:pt-[84px]`}>
          <div className="mx-auto flex max-w-[880px] flex-col items-center gap-5 text-center">
            <h1 className="whitespace-nowrap text-[min(calc((100vw_-_2rem)/11),70px)] font-medium leading-[1.15] text-slate-900 lg:leading-[76px]">
              Clipwing vs OpusClip
            </h1>
            <p className="max-w-[720px] text-xl font-normal leading-tight text-[#3f3f46]">
              Both Clipwing and OpusClip can help you turn long videos into
              short clips. But with Clipwing, real editors choose the best
              moments, build a clear story, and make every clip feel
              intentional and ready to post
            </p>
            <Ctas className="mt-2 sm:justify-center" />
          </div>
        </section>

        {/* No heading of its own — the hero's h1 already names it. */}
        <section className={`${SECTION} pb-24 sm:pb-32`} aria-label="Clip-by-clip scorecard">
          <ScorecardTable />
        </section>

        <FinalCtaSection />

        <Footer />
      </main>
    </>
  )
}
