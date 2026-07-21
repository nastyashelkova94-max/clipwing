import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import clipReview from '../assets/images/hero-collage/clip-review.png'
import newTask from '../assets/images/hero-collage/new-task.png'
import postSetting from '../assets/images/hero-collage/post-setting.png'
import notification from '../assets/images/hero-collage/notification.png'

// Fixed design size, scaled to fit (same trick used elsewhere on the site),
// so the collage keeps the same relative layout at every viewport width.
const DESIGN_W = 2000
const DESIGN_H = 1130

// Card 1 is centered in the canvas and locked — keep it that way, don't
// reposition or make it draggable when adjusting the other cards.
const cards = [
  { src: clipReview, w: 1637, left: 182, top: 82, z: 10, locked: true },
  { src: newTask, w: 527, left: -30, top: 223, z: 20 },
  { src: postSetting, w: 438, left: 1562, top: 350, z: 20 },
  { src: notification, w: 471, left: 1529, top: 8, z: 30 },
]

function DraggableCard({ card }) {
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
