import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal'
import clip1 from '../assets/images/process/clip-1.mp4'
import clip2 from '../assets/images/process/clip-2.mp4'
import clip3 from '../assets/images/process/clip-3.mp4'
import poster1 from '../assets/images/process/clip-1-poster.jpg'
import poster2 from '../assets/images/process/clip-2-poster.jpg'
import poster3 from '../assets/images/process/clip-3-poster.jpg'

const YOUTUBE_ID = 'znq6o26snJs'
const YOUTUBE_START = 8

const CARD_W = 170
const CARD_H = (CARD_W * 16) / 9

const GAP = 28

// Flex gap between the video player and this box is 40px (gap-10). CONTAINER_EXTEND
// shifts the whole box (via negative margin) leftward into that gap so its left edge
// sits flush against the video player's frame; local x=0 below is that flush edge,
// used consistently by both the SVG and the plain-div cards/badge so nothing misaligns.
const CONTAINER_EXTEND = 40
const ORIGIN_X = 0

// Sequence along the trunk: video -> line -> badge -> line -> fork into 3 branches -> cards
const BADGE_X = ORIGIN_X + 99
const SPLIT_X = BADGE_X + 99
const SIDE_END_X = SPLIT_X + 60
const MID_END_X = SIDE_END_X + CARD_W + GAP

const OFFSET = 165
const CENTER_Y = CARD_H / 2 + OFFSET + 15
const TOP_Y = CENTER_Y - OFFSET
const MID_Y = CENTER_Y
const BOTTOM_Y = CENTER_Y + OFFSET

const TOTAL_W = MID_END_X + CARD_W + 20
const VB_H = CENTER_Y * 2

// Simple straight line from the main video to the badge (and on through to the
// mid card, since it's the same straight track). Top/bottom branches only pick
// up after the fork, so this stretch is drawn once instead of three times.
const trunkPath = `M${ORIGIN_X},${MID_Y} L${MID_END_X},${MID_Y}`
const topPath = `M${SPLIT_X - 15},${MID_Y} Q${SPLIT_X},${MID_Y} ${SPLIT_X},${MID_Y - 15} L${SPLIT_X},${TOP_Y + 15} Q${SPLIT_X},${TOP_Y} ${SPLIT_X + 15},${TOP_Y} L${SIDE_END_X},${TOP_Y}`
const bottomPath = `M${SPLIT_X - 15},${MID_Y} Q${SPLIT_X},${MID_Y} ${SPLIT_X},${MID_Y + 15} L${SPLIT_X},${BOTTOM_Y - 15} Q${SPLIT_X},${BOTTOM_Y} ${SPLIT_X + 15},${BOTTOM_Y} L${SIDE_END_X},${BOTTOM_Y}`

const branches = [trunkPath, topPath, bottomPath]

const clips = [
  { src: clip1, poster: poster1, x: SIDE_END_X, y: TOP_Y, width: CARD_W, z: 10 },
  { src: clip2, poster: poster2, x: MID_END_X, y: MID_Y, width: CARD_W, z: 20 },
  { src: clip3, poster: poster3, x: SIDE_END_X, y: BOTTOM_Y, width: CARD_W, z: 10 },
]

const mobileClips = [
  { src: clip1, poster: poster1 },
  { src: clip2, poster: poster2 },
  { src: clip3, poster: poster3 },
]

// Vertical mirror of the desktop trunk-then-fork connector: same rounded-step
// geometry, with the trunk axis (x on desktop) and spread axis (y on desktop)
// swapped so it reads top-to-bottom instead of left-to-right. Built at a fixed
// design width/height, then uniformly scaled to fit whatever width the mobile
// column actually renders at (see MobileConnector's ResizeObserver).
// All 3 clips sit in one flat row (matching the site's normal 16px item
// grid), sized to fill the 520px design width across 3 columns + 2 gaps.
const M_GAP = 16
const M_CARD_W = (520 - 2 * M_GAP) / 3
const M_CARD_H = (M_CARD_W * 16) / 9

const M_ORIGIN_Y = 0
const M_BADGE_Y = M_ORIGIN_Y + 50
const M_SPLIT_Y = M_BADGE_Y + 50
const M_ROW_Y = M_SPLIT_Y + 40

const M_LEFT_X = M_CARD_W / 2
const M_CENTER_X = M_GAP + M_CARD_W + M_LEFT_X
const M_RIGHT_X = 2 * M_GAP + 2 * M_CARD_W + M_LEFT_X

const M_DESIGN_W = 520
const M_DESIGN_H = M_ROW_Y + M_CARD_H + 20

const mTrunkPath = `M${M_CENTER_X},${M_ORIGIN_Y} L${M_CENTER_X},${M_ROW_Y}`
const mLeftPath = `M${M_CENTER_X},${M_SPLIT_Y - 15} Q${M_CENTER_X},${M_SPLIT_Y} ${M_CENTER_X - 15},${M_SPLIT_Y} L${M_LEFT_X + 15},${M_SPLIT_Y} Q${M_LEFT_X},${M_SPLIT_Y} ${M_LEFT_X},${M_SPLIT_Y + 15} L${M_LEFT_X},${M_ROW_Y}`
const mRightPath = `M${M_CENTER_X},${M_SPLIT_Y - 15} Q${M_CENTER_X},${M_SPLIT_Y} ${M_CENTER_X + 15},${M_SPLIT_Y} L${M_RIGHT_X - 15},${M_SPLIT_Y} Q${M_RIGHT_X},${M_SPLIT_Y} ${M_RIGHT_X},${M_SPLIT_Y + 15} L${M_RIGHT_X},${M_ROW_Y}`

const mBranches = [mTrunkPath, mLeftPath, mRightPath]

const mClips = [
  { x: M_LEFT_X, y: M_ROW_Y, z: 10 },
  { x: M_CENTER_X, y: M_ROW_Y, z: 20 },
  { x: M_RIGHT_X, y: M_ROW_Y, z: 10 },
]

function MobileConnector({ mobileClips }) {
  const wrapperRef = useRef(null)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / M_DESIGN_W)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="relative w-full max-w-[520px]"
      style={{ height: M_DESIGN_H * scale }}
    >
      <div
        className="absolute left-0 top-0"
        style={{ width: M_DESIGN_W, height: M_DESIGN_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${M_DESIGN_W} ${M_DESIGN_H}`}
          fill="none"
        >
          <defs>
            <filter id="m-dot-shadow" x="-100%" y="-100%" width="300%" height="300%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#0f172a" floodOpacity="0.18" />
            </filter>
          </defs>

          {mBranches.map((path, i) => (
            <path key={`m-base-${i}`} d={path} stroke="#e2e8f0" strokeWidth="1" />
          ))}

          <circle cx={M_LEFT_X} cy={M_ROW_Y} r="5" fill="white" stroke="#e2e8f0" strokeWidth="1" filter="url(#m-dot-shadow)" />
          <circle cx={M_CENTER_X} cy={M_ROW_Y} r="5" fill="white" stroke="#e2e8f0" strokeWidth="1" filter="url(#m-dot-shadow)" />
          <circle cx={M_RIGHT_X} cy={M_ROW_Y} r="5" fill="white" stroke="#e2e8f0" strokeWidth="1" filter="url(#m-dot-shadow)" />
        </svg>

        {mBranches.map((path, i) => (
          <span
            key={`m-dot-${i}`}
            className="flow-dot"
            style={{ offsetPath: `path('${path}')`, animationDelay: `${i}s` }}
          />
        ))}

        <div
          className="glass-soft absolute flex -translate-x-1/2 -translate-y-1/2 items-start rounded-[28px] p-1"
          style={{ left: M_CENTER_X, top: M_BADGE_Y }}
        >
          <span className="whitespace-nowrap rounded-3xl bg-white px-4 py-3 text-base font-medium text-[#0F172A] shadow-[inset_0_1px_5px_0_rgba(255,255,255,0.25)]">
            3 days - 3 clips
          </span>
        </div>

        {mClips.map((pos, i) => (
          <div
            key={i}
            className="absolute -translate-x-1/2"
            style={{ left: pos.x, top: pos.y, width: M_CARD_W, zIndex: pos.z }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-soft overflow-hidden rounded-[19px] p-1 shadow-lg"
            >
              <div className="aspect-[9/16] overflow-hidden rounded-[15px] bg-slate-600">
                <video
                  src={mobileClips[i].src}
                  poster={mobileClips[i].poster}
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="none"
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}

function VideoPlayer({ playing, setPlaying, className = '' }) {
  return (
    <div className={`glass-soft w-full shrink-0 overflow-hidden rounded-[33px] p-2.5 ${className}`}>
      <div className="relative aspect-video overflow-hidden rounded-[22px] bg-slate-900">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&start=${YOUTUBE_START}&rel=0`}
            title="Clipwing example source video"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 block"
          >
            <img
              src={`https://i.ytimg.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`}
              onError={(e) => {
                e.currentTarget.src = `https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`
              }}
              alt="Source video"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/15" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-16 place-items-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="ml-1 size-7 fill-indigo-600">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

export default function OneVideoSection() {
  const [playing, setPlaying] = useState(false)
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
  )

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const onChange = (e) => setIsDesktop(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return (
    <section className="relative z-10 mx-auto max-w-[1200px] px-6 pb-[160px]">
      <Reveal className="mx-auto flex max-w-[751px] flex-col items-center gap-4 text-center">
        <h2 className="text-[32px] font-medium leading-[100%] text-slate-900 sm:text-[40px] lg:leading-[normal] lg:text-[48px]">
          See what we make from{' '}
          <span className="font-serif text-[32px] font-medium italic leading-[100%] text-indigo-600 sm:text-[40px] lg:leading-[normal] lg:text-[48px]">
            one video
          </span>
        </h2>
        <p className="max-w-[489px] text-xl font-normal leading-tight text-slate-900">
          We pick the best parts, cut them, and add captions. You get clips
          ready to post
        </p>
      </Reveal>

      {/* Mobile / tablet: video connected to clips via branching lines, matching desktop */}
      {!isDesktop && (
      <Reveal delay={0.1} y={32} className="mt-4 flex flex-col items-center">
        <VideoPlayer playing={playing} setPlaying={setPlaying} className="max-w-[520px]" />
        <MobileConnector mobileClips={mobileClips} />
      </Reveal>
      )}

      {/* Desktop: video connected to clips via branching lines */}
      {isDesktop && (
      <Reveal
        delay={0.1}
        y={32}
        className="mt-8 flex items-center justify-start gap-10"
      >
        <VideoPlayer playing={playing} setPlaying={setPlaying} className="max-w-[520px]" />

        <div
          className="relative shrink-0"
          style={{ width: TOTAL_W, height: VB_H, marginLeft: -CONTAINER_EXTEND }}
        >
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 ${TOTAL_W} ${VB_H}`}
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="dot-shadow" x="-100%" y="-100%" width="300%" height="300%">
                <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#0f172a" floodOpacity="0.18" />
              </filter>
            </defs>

            {branches.map((path, i) => (
              <path key={`base-${i}`} d={path} stroke="#e2e8f0" strokeWidth="1" />
            ))}

            <circle cx={SIDE_END_X} cy={TOP_Y} r="5" fill="white" stroke="#e2e8f0" strokeWidth="1" filter="url(#dot-shadow)" />
            <circle cx={MID_END_X} cy={MID_Y} r="5" fill="white" stroke="#e2e8f0" strokeWidth="1" filter="url(#dot-shadow)" />
            <circle cx={SIDE_END_X} cy={BOTTOM_Y} r="5" fill="white" stroke="#e2e8f0" strokeWidth="1" filter="url(#dot-shadow)" />
          </svg>

          {branches.map((path, i) => (
            <span
              key={`dot-${i}`}
              className="flow-dot"
              style={{ offsetPath: `path('${path}')`, animationDelay: `${i}s` }}
            />
          ))}

          <div
            className="glass-soft absolute flex -translate-x-1/2 -translate-y-1/2 items-start rounded-[28px] p-1"
            style={{ left: BADGE_X, top: MID_Y }}
          >
            <span className="whitespace-nowrap rounded-3xl bg-white px-4 py-3 text-base font-medium text-[#0F172A] shadow-[inset_0_1px_5px_0_rgba(255,255,255,0.25)]">
              3 days - 3 clips
            </span>
          </div>

          {clips.map((clip, i) => (
            <div
              key={i}
              className="absolute -translate-y-1/2"
              style={{ left: clip.x, top: clip.y, width: clip.width, zIndex: clip.z }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.06 }}
                className="glass-soft overflow-hidden rounded-[19px] p-1 shadow-lg"
              >
                <div className="aspect-[9/16] overflow-hidden rounded-[15px] bg-slate-600">
                  <video
                    src={clip.src}
                    poster={clip.poster}
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="none"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </Reveal>
      )}
    </section>
  )
}
