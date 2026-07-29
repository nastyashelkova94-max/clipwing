import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Hero1Card, { NATIVE_W as HERO1_NATIVE_W, NATIVE_H as HERO1_NATIVE_H } from './heroCards/Hero1Card'
import NewTaskCard, { NATIVE_W as NEWTASK_NATIVE_W, NATIVE_H as NEWTASK_NATIVE_H } from './heroCards/NewTaskCard'
import PostSettingCard, { NATIVE_W as POSTSETTING_NATIVE_W, NATIVE_H as POSTSETTING_NATIVE_H } from './heroCards/PostSettingCard'
import NotificationCard, { NATIVE_W as NOTIF_NATIVE_W, NATIVE_H as NOTIF_NATIVE_H } from './heroCards/NotificationCard'

// Fixed design size, scaled to fit (same trick used elsewhere on the site),
// so the collage keeps the same relative layout at every viewport width.
const DESIGN_W = 2000
const DESIGN_H = 1130

// Card 1 is centered in the canvas and locked — keep it that way, don't
// reposition or make it draggable when adjusting the other cards. New Task's
// left offset differs by breakpoint: on desktop it's pulled left on purpose
// (small overlap with card 1 look), but that same value would get clipped
// by the page's overflow-hidden ancestor on mobile/tablet, so it uses a
// safer, smaller offset there instead.
// Card 1 (hero1) and postsetting are the interactive cards, so they're not
// draggable/lockable-hoverable like the decorative new-task/notification ones.
const cards = [
  { Component: Hero1Card, nativeW: HERO1_NATIVE_W, nativeH: HERO1_NATIVE_H, w: 1637, leftDesktop: 182, leftMobile: 182, top: 80, z: 10, locked: true },
  { Component: NewTaskCard, nativeW: NEWTASK_NATIVE_W, nativeH: NEWTASK_NATIVE_H, w: 527, leftDesktop: -175, leftMobile: -35, top: 317, z: 20 },
  { Component: PostSettingCard, nativeW: POSTSETTING_NATIVE_W, nativeH: POSTSETTING_NATIVE_H, w: 438, leftDesktop: 1562, leftMobile: 1562, top: 350, z: 20, locked: true },
  { Component: NotificationCard, nativeW: NOTIF_NATIVE_W, nativeH: NOTIF_NATIVE_H, w: 471, leftDesktop: 1529, leftMobile: 1529, top: 8, z: 30 },
]

function DraggableCard({ card }) {
  const { Component } = card
  const cardScale = card.w / card.nativeW
  return (
    <motion.div
      drag={!card.locked}
      dragMomentum={false}
      dragElastic={0.08}
      whileDrag={card.locked ? undefined : { scale: 1.04, zIndex: 40 }}
      whileHover={card.locked ? undefined : { scale: 1.03, y: -6, zIndex: 40 }}
      initial={{ scale: 0.92 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute ${card.locked ? '' : 'cursor-grab active:cursor-grabbing'}`}
      style={{
        left: card.left,
        top: card.top,
        width: card.w,
        height: card.nativeH * cardScale,
        zIndex: card.z,
        touchAction: card.locked ? undefined : 'none',
      }}
    >
      <div style={{ width: card.nativeW, height: card.nativeH, transform: `scale(${cardScale})`, transformOrigin: 'top left' }}>
        <Component />
      </div>
    </motion.div>
  )
}

export default function HeroCollage() {
  const wrapperRef = useRef(null)
  const [scale, setScale] = useState(0)
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
  )

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / DESIGN_W))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const onChange = (e) => setIsDesktop(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
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
          <DraggableCard
            key={i}
            card={{ ...card, left: isDesktop ? card.leftDesktop : card.leftMobile }}
          />
        ))}
      </div>
    </div>
  )
}
