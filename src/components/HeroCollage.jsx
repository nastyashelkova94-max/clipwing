import { useEffect, useRef, useState } from 'react'
import { motion, useDragControls } from 'framer-motion'
import clipReview from '../assets/images/hero-collage/clip-review.png'
import newTask from '../assets/images/hero-collage/new-task.png'
import postSetting from '../assets/images/hero-collage/post-setting.png'
import notification from '../assets/images/hero-collage/notification.png'

// Fixed design size, scaled to fit (same trick used elsewhere on the site),
// so the collage keeps the same relative layout at every viewport width.
const DESIGN_W = 1000
const DESIGN_H = 456

const cards = [
  { src: clipReview, w: 615, left: 205, top: 60, rotate: -1.5, z: 20 },
  { src: newTask, w: 233, left: 35, top: 150, rotate: -6, z: 10 },
  { src: postSetting, w: 172, left: 788, top: 168, rotate: 2, z: 10 },
  { src: notification, w: 175, left: 795, top: 20, rotate: -3, z: 30 },
]

function GripIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <circle cx="5" cy="3" r="1.3" />
      <circle cx="11" cy="3" r="1.3" />
      <circle cx="5" cy="8" r="1.3" />
      <circle cx="11" cy="8" r="1.3" />
      <circle cx="5" cy="13" r="1.3" />
      <circle cx="11" cy="13" r="1.3" />
    </svg>
  )
}

function DraggableCard({ card }) {
  const controls = useDragControls()

  return (
    <motion.div
      drag
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.08}
      whileDrag={{ scale: 1.04, zIndex: 40 }}
      initial={{ opacity: 0, scale: 0.92, rotate: card.rotate }}
      whileInView={{ opacity: 1, scale: 1, rotate: card.rotate }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group absolute"
      style={{ left: card.left, top: card.top, width: card.w, zIndex: card.z, touchAction: 'none' }}
    >
      <img
        src={card.src}
        alt=""
        draggable={false}
        className="pointer-events-none w-full select-none rounded-xl shadow-[0_20px_45px_-10px_rgba(15,23,42,0.35)]"
      />
      <button
        type="button"
        onPointerDown={(e) => controls.start(e)}
        className="glass-soft absolute -right-2.5 -top-2.5 grid size-8 cursor-grab place-items-center rounded-full text-slate-600 opacity-0 shadow-md transition-opacity active:cursor-grabbing group-hover:opacity-100"
        aria-label="Drag to move"
      >
        <GripIcon className="size-4" />
      </button>
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
      className="relative mx-auto w-full max-w-[960px]"
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
