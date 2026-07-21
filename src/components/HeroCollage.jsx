import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import clipReview from '../assets/images/hero-collage/clip-review.png'
import newTask from '../assets/images/hero-collage/new-task.png'
import postSetting from '../assets/images/hero-collage/post-setting.png'
import notification from '../assets/images/hero-collage/notification.png'

// Fixed design size, scaled to fit (same trick used elsewhere on the site),
// so the collage keeps the same relative layout at every viewport width.
const DESIGN_W = 1150
const DESIGN_H = 600

const frame = { left: 150, top: 70, w: 850, h: 500 }

const cards = [
  { src: clipReview, w: 780, left: 190, top: 90, z: 10 },
  { src: newTask, w: 290, left: 30, top: 260, z: 20 },
  { src: postSetting, w: 230, left: 860, top: 230, z: 20 },
  { src: notification, w: 235, left: 865, top: 60, z: 30 },
]

function DraggableCard({ card }) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.08}
      whileDrag={{ scale: 1.04, zIndex: 40 }}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute cursor-grab active:cursor-grabbing"
      style={{ left: card.left, top: card.top, width: card.w, zIndex: card.z, touchAction: 'none' }}
    >
      <img
        src={card.src}
        alt=""
        draggable={false}
        className="pointer-events-none w-full select-none"
      />
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
      className="relative mx-auto w-full max-w-[1150px]"
      style={{ height: DESIGN_H * scale }}
    >
      <div
        className="absolute left-0 top-0"
        style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}
      >
        <div
          className="glass absolute rounded-[40px]"
          style={{ left: frame.left, top: frame.top, width: frame.w, height: frame.h, zIndex: 0 }}
        />
        {cards.map((card, i) => (
          <DraggableCard key={i} card={card} />
        ))}
      </div>
    </div>
  )
}
