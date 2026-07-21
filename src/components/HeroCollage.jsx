import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clipReview from '../assets/images/hero-collage/clip-review.png'
import newTask from '../assets/images/hero-collage/new-task.png'
import postSetting from '../assets/images/hero-collage/post-setting.png'
import notification from '../assets/images/hero-collage/notification.png'

// Fixed design size, scaled to fit (same trick used elsewhere on the site),
// so the collage keeps the same relative layout at every viewport width.
const DESIGN_W = 2000
const DESIGN_H = 1130

const cards = [
  { src: clipReview, w: 1637, left: 182, top: 80, z: 10, locked: true, overlay: 'clipReview' },
  { src: newTask, w: 527, left: 0, top: 317, z: 20 },
  { src: postSetting, w: 438, left: 1562, top: 350, z: 20, overlay: 'postSetting' },
  { src: notification, w: 471, left: 1529, top: 8, z: 30 },
]

function CalendarIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" {...props}>
      <rect x="2" y="3" width="12" height="11" rx="2" />
      <path d="M2 6.5h12M5 1.5v2M11 1.5v2" strokeLinecap="round" />
    </svg>
  )
}

function ClockIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" {...props}>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 5v3l2 1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SendIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M1.5 8 14 2.3 9.6 14l-2-5.2z" />
    </svg>
  )
}

// Two real, working touchpoints on the review card: a play button that
// gives a brief "playing" pulse, and a comment field you can actually type
// into. Positioned as percentages measured against the source screenshot so
// they land exactly on the drawn UI underneath, whatever size it renders at.
function ClipReviewOverlay() {
  const [playing, setPlaying] = useState(false)
  const [comment, setComment] = useState('')
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    if (!comment.trim()) return
    setComment('')
    setSent(true)
    setTimeout(() => setSent(false), 1500)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setPlaying(true)
          setTimeout(() => setPlaying(false), 1200)
        }}
        aria-label="Play clip"
        className="absolute grid place-items-center rounded-full"
        style={{ left: '27.7%', top: '57.2%', width: '4.75%', height: '8.05%', transform: 'translate(-50%, -50%)' }}
      >
        <AnimatePresence>
          {playing && (
            <motion.span
              initial={{ opacity: 0.5, scale: 1 }}
              animate={{ opacity: 0, scale: 1.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full bg-white"
            />
          )}
        </AnimatePresence>
      </button>

      <div
        className="absolute flex items-center gap-2 rounded-full bg-[#eef1f6] pl-1 pr-1"
        style={{ left: '56.8%', top: '86.3%', width: '41.2%', height: '7.6%' }}
      >
        <span className="ml-2 shrink-0 rounded-full bg-indigo-100 px-2 py-1 text-[0.6em] font-medium text-indigo-600">
          0:05
        </span>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={sent ? 'Comment sent!' : 'Leave your comment...'}
          className="min-w-0 flex-1 bg-transparent text-[0.85em] text-[#3f3f46] outline-none placeholder:text-[#3f3f46]"
        />
        <button
          type="button"
          onClick={handleSend}
          aria-label="Send comment"
          className="grid aspect-square h-[80%] shrink-0 place-items-center rounded-full bg-indigo-600 text-white"
        >
          <SendIcon className="h-[45%] w-[45%]" />
        </button>
      </div>
    </>
  )
}

// Real date/time inputs dropped exactly over the drawn fields, so you can
// actually pick a date and time instead of just looking at static text.
function PostSettingOverlay() {
  const [date, setDate] = useState('2026-05-13')
  const [time, setTime] = useState('09:00')

  return (
    <>
      <label
        className="absolute flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 text-[#0f172a]"
        style={{ left: '2.6%', top: '67.1%', width: '53.6%', height: '9.6%' }}
      >
        <CalendarIcon className="h-[40%] w-auto shrink-0 text-slate-500" />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full min-w-0 cursor-pointer bg-transparent text-[0.85em] outline-none"
        />
      </label>

      <label
        className="absolute flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 text-[#0f172a]"
        style={{ left: '59%', top: '67.1%', width: '32.5%', height: '9.6%' }}
      >
        <ClockIcon className="h-[40%] w-auto shrink-0 text-slate-500" />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full min-w-0 cursor-pointer bg-transparent text-[0.85em] outline-none"
        />
      </label>
    </>
  )
}

const overlays = {
  clipReview: ClipReviewOverlay,
  postSetting: PostSettingOverlay,
}

function DraggableCard({ card }) {
  const Overlay = overlays[card.overlay]

  return (
    <motion.div
      drag={!card.locked}
      dragMomentum={false}
      dragElastic={0.08}
      whileDrag={card.locked ? undefined : { scale: 1.04, zIndex: 40 }}
      whileHover={card.locked ? undefined : { scale: 1.03, y: -6, zIndex: 40 }}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute ${card.locked ? '' : 'cursor-grab active:cursor-grabbing'}`}
      style={{ left: card.left, top: card.top, width: card.w, zIndex: card.z, touchAction: card.locked ? undefined : 'none' }}
    >
      <div className="relative">
        <img
          src={card.src}
          alt=""
          draggable={false}
          className="pointer-events-none w-full select-none"
        />
        {Overlay && <Overlay />}
      </div>
    </motion.div>
  )
}

export default function HeroCollage() {
  const wrapperRef = useRef(null)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / DESIGN_W))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="relative mx-auto w-full max-w-[2000px]"
      style={{ height: DESIGN_H * scale }}
    >
      <div
        className="absolute left-0 top-0"
        style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}
      >
        {cards.map((card, i) => (
          <DraggableCard key={i} card={card} />
        ))}
      </div>
    </div>
  )
}
