import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal'
import step1 from '../assets/images/process/step-1-link.png'
import step2 from '../assets/images/process/step-2-editor.png'
import step3 from '../assets/images/process/step-3-review.png'
import step4 from '../assets/images/process/step-4-publish.png'

const steps = [
  {
    tab: 'Link',
    title: 'Send your link',
    body: 'Paste a YouTube or Loom link. It lands on your board as a task.',
    image: step1,
  },
  {
    tab: 'Editor-curated',
    title: 'A hand-picked editor takes it',
    body: 'A vetted editor cuts your clips and sends drafts for your review. Back in 3 days.',
    image: step2,
  },
  {
    tab: 'Review',
    title: 'Review in the app',
    body: 'Comment on the clip, ask for changes, approve. No Slack, no calls.',
    image: step3,
  },
  {
    tab: 'Publish',
    title: 'Publish to social',
    body: 'Connect YouTube or TikTok and schedule the post, straight from the app.',
    image: step4,
  },
]

const STEP_DURATION = 4

export default function ProcessSection() {
  const [active, setActive] = useState(0)
  const current = steps[active]

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive((prev) => (prev + 1) % steps.length)
    }, STEP_DURATION * 1000)
    return () => clearTimeout(timer)
  }, [active])

  return (
    <section className="relative z-10 mx-auto max-w-[1200px] px-6 pb-40">
      <Reveal className="mx-auto flex max-w-[626px] flex-col items-center gap-4 text-center">
        <h2 className="text-[48px] font-medium text-slate-900">
          From your link to ready{' '}
          <span className="font-serif text-[48px] font-medium italic text-indigo-600">
            clips
          </span>
        </h2>
        <p className="max-w-[518px] text-xl font-normal leading-tight text-slate-900">
          Send a link and a hand-picked editor takes it from there. All in one
          app
        </p>
      </Reveal>

      <div className="mx-auto mt-8 grid max-w-[1210px] grid-cols-1 gap-5 lg:grid-cols-2">
        <Reveal delay={0.05} className="flex flex-col justify-center gap-3">
          {steps.map((s, i) => {
            const isActive = i === active
            return (
              <motion.div
                key={s.tab}
                initial={false}
                animate={{ scale: isActive ? 1 : 0.99 }}
                className="glass-soft overflow-hidden rounded-3xl p-2"
              >
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="w-full rounded-2xl bg-white p-6 text-left"
                >
                  <h3 className="text-xl font-medium text-[#21234e]">
                    {i + 1}. {s.title}
                  </h3>
                  {isActive && (
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-base leading-snug text-[#21234e]">
                        {s.body}
                      </p>
                    </motion.div>
                  )}
                </button>
              </motion.div>
            )
          })}
        </Reveal>

        <Reveal delay={0.15} className="relative h-full overflow-hidden rounded-3xl">
          <motion.img
            key={active}
            src={current.image}
            alt={current.tab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </Reveal>
      </div>
    </section>
  )
}
