import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

const STEP_DURATION = 7

const CROSSFADE_MS = 500

export default function ProcessSection() {
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)
  const current = steps[active]
  const [prevImage, setPrevImage] = useState(current.image)

  useEffect(() => {
    const timer = setTimeout(() => setPrevImage(current.image), CROSSFADE_MS)
    return () => clearTimeout(timer)
  }, [current.image])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const timer = setTimeout(() => {
      setActive((prev) => (prev + 1) % steps.length)
    }, STEP_DURATION * 1000)
    return () => clearTimeout(timer)
  }, [active, inView])

  return (
    <section ref={sectionRef} className="relative z-10 mx-auto max-w-[1200px] px-6 pb-[160px]">
      <Reveal className="mx-auto flex max-w-[626px] flex-col items-center gap-4 text-center">
        <h2 className="text-[32px] font-medium leading-[100%] text-slate-900 sm:text-[40px] lg:leading-[normal] lg:text-[48px]">
          From your link to ready{' '}
          <span className="font-serif text-[32px] font-medium italic leading-[100%] text-indigo-600 sm:text-[40px] lg:leading-[normal] lg:text-[48px]">
            clips
          </span>
        </h2>
        <p className="max-w-[518px] text-xl font-normal leading-tight text-[#3f3f46]">
          Send a link and a hand-picked editor takes it from there. All in one
          app
        </p>
      </Reveal>

      {/* Mobile / tablet: each step keeps its own image right under it */}
      <Reveal delay={0.05} className="mt-4 flex flex-col gap-4 lg:hidden">
        {steps.map((s, i) => {
          const isActive = i === active
          return (
            <motion.div
              key={s.tab}
              initial={false}
              animate={{ scale: isActive ? 1 : 0.99 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass-soft overflow-hidden rounded-[20px] p-1"
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActive(i)
                  }
                }}
                className="block w-full cursor-pointer rounded-2xl bg-white p-4 text-left"
              >
                <h3 className="text-xl font-medium leading-[100%] text-[#21234e]">
                  {i + 1}. {s.title}
                </h3>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-base leading-snug text-[#21234e]">
                        {s.body}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="mt-3 h-[220px] overflow-hidden rounded-2xl">
                  <img
                    src={s.image}
                    alt={s.tab}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>
            </motion.div>
          )
        })}
      </Reveal>

      {/* Desktop: step list next to a single crossfading image */}
      <div className="mx-auto mt-8 hidden max-w-[1210px] grid-cols-[476px_1fr] gap-5 lg:grid">
        <Reveal delay={0.05} className="flex flex-col justify-center gap-4">
          {steps.map((s, i) => {
            const isActive = i === active
            return (
              <motion.div
                key={s.tab}
                initial={false}
                animate={{ scale: isActive ? 1 : 0.99 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="glass-soft overflow-hidden rounded-3xl p-2"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActive(i)
                    }
                  }}
                  className="w-full cursor-pointer rounded-2xl bg-white p-6 text-left"
                >
                  <h3 className="text-xl font-medium leading-[100%] text-[#21234e]">
                    {i + 1}. {s.title}
                  </h3>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 text-base leading-snug text-[#21234e]">
                          {s.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </Reveal>

        <Reveal delay={0.15} className="relative h-[448px] overflow-hidden rounded-3xl">
          <img
            src={prevImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <motion.img
            key={active}
            src={current.image}
            alt={current.tab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: CROSSFADE_MS / 1000, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </Reveal>
      </div>
    </section>
  )
}
