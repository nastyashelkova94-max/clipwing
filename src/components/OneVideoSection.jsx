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

const CARD_W = 230
const CARD_H = (CARD_W * 16) / 9

// x=0 is the branch box's flush left edge, positioned directly against the
// video's right edge by DesktopVideoBranch (see below).
const ORIGIN_X = 0

// One arrow travels from the video, arcs around the "3 days - 3 clips"
// badge, and reaches the cards, which start piled up (tight overlap, tilted,
// staggered vertically to match the reference screenshot) and straighten
// into an evenly spaced, unrotated row once the arrow arrives.
const LEFT_X = 260

// Piled: card 2 (middle) sits lowest/frontmost, card 3 (right) highest.
// Spread: cards 1 & 3 land on the same row; card 2 stays 40px below them.
const PILE_MID_DROP = 70
const PILE_RIGHT_LIFT = 50
const APART_MID_DROP = 40

const TRUNK_Y = CARD_H / 2 + PILE_RIGHT_LIFT + 20
const VB_H = TRUNK_Y + PILE_MID_DROP + CARD_H / 2 + 20

// Piled (initial) spacing: tight overlap. Spread (post-arrow) spacing: cards
// sit edge to edge with a 6px gap. The leftmost card is the shared anchor.
const H_SPREAD_PILE = 175
const GAP = 6
const H_SPREAD_APART = CARD_W + GAP

const RIGHT_X_APART = LEFT_X + 2 * H_SPREAD_APART
// TOTAL_W must fit the widest (spread) state.
const TOTAL_W = RIGHT_X_APART + CARD_W + 20

// Half the badge's own rendered width (~112px).
const BADGE_HALF_W = 58
const LOOP_RX = BADGE_HALF_W + 4
const LOOP_RY = 28

// The arrow's straight lead-in (video to where it starts looping the badge)
// is a fixed 50px. The badge sits centered on the loop, and everything else
// (badge, loop, pile) is centered off of that: the badge is exactly halfway
// between the video and the piled cards' front edge.
const ARROW_LEAD_IN = 50
const BADGE_X = ARROW_LEAD_IN + LOOP_RX
const PILE_LEFT_X = BADGE_X * 2

const RIGHT_X_PILE = PILE_LEFT_X + H_SPREAD_PILE

// The visible arrow is a plain straight line from the video to the pile.
const straightPath = `M${ORIGIN_X},${TRUNK_Y} L${PILE_LEFT_X},${TRUNK_Y}`

// The animated dot follows that same straight line, except right at the
// badge it peels off into a full loop around its oval outline before
// rejoining the straight line on the other side.
const LOOP_ENTRY_X = BADGE_X - LOOP_RX
const LOOP_EXIT_X = BADGE_X + LOOP_RX
const dotPath = `M${ORIGIN_X},${TRUNK_Y} L${LOOP_ENTRY_X},${TRUNK_Y} A${LOOP_RX},${LOOP_RY} 0 1,1 ${LOOP_EXIT_X},${TRUNK_Y} A${LOOP_RX},${LOOP_RY} 0 1,1 ${LOOP_ENTRY_X},${TRUNK_Y} L${PILE_LEFT_X},${TRUNK_Y}`

const clips = [
  { src: clip1, poster: poster1, width: CARD_W, z: 10, pileX: PILE_LEFT_X, pileY: TRUNK_Y, pileRotate: -7, apartX: LEFT_X, apartY: TRUNK_Y },
  { src: clip2, poster: poster2, width: CARD_W, z: 20, pileX: PILE_LEFT_X + H_SPREAD_PILE / 2, pileY: TRUNK_Y + PILE_MID_DROP, pileRotate: -1.5, apartX: LEFT_X + H_SPREAD_APART, apartY: TRUNK_Y + APART_MID_DROP },
  { src: clip3, poster: poster3, width: CARD_W, z: 10, pileX: RIGHT_X_PILE, pileY: TRUNK_Y - PILE_RIGHT_LIFT, pileRotate: 3, apartX: RIGHT_X_APART, apartY: TRUNK_Y },
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

// Desktop video + branch composition, built at a fixed design size and then
// uniformly scaled to fit whatever width is actually available (same trick as
// MobileConnector). Without this, the layout overflows the section at the
// narrow end of the desktop range (e.g. 1024px, iPad landscape).
// Video size was tuned against the fan's earlier (taller) height and is
// frozen here so making the fan more compact doesn't shrink the video too.
const VIDEO_TUNED_CARD_H = (190 * 16) / 9
const VIDEO_TUNED_VB_H = (VIDEO_TUNED_CARD_H / 2 + 80 + 20) * 2
// Halved, then bumped back up a bit after feedback that it got too small.
const DESKTOP_VIDEO_W = (((VIDEO_TUNED_VB_H - 20) * 16) / 9 / 1.8) / 1.2 + 30
const DESKTOP_VIDEO_H = (DESKTOP_VIDEO_W * 9) / 16 + 20
const DESKTOP_VIDEO_GAP = 0
const DESKTOP_DESIGN_W = DESKTOP_VIDEO_W + DESKTOP_VIDEO_GAP + TOTAL_W
const DESKTOP_DESIGN_H = Math.max(DESKTOP_VIDEO_H, VB_H)
const DESKTOP_VIDEO_TOP = (DESKTOP_DESIGN_H - DESKTOP_VIDEO_H) / 2
const DESKTOP_BRANCH_TOP = (DESKTOP_DESIGN_H - VB_H) / 2

function DesktopVideoBranch({ playing, setPlaying }) {
  const wrapperRef = useRef(null)
  const [scale, setScale] = useState(0)
  const [isSpread, setIsSpread] = useState(false)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / DESKTOP_DESIGN_W))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrapperRef} className="relative w-full" style={{ height: DESKTOP_DESIGN_H * scale }}>
      <div
        className="absolute left-0 top-0"
        style={{ width: DESKTOP_DESIGN_W, height: DESKTOP_DESIGN_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}
      >
        <div className="absolute left-0" style={{ top: DESKTOP_VIDEO_TOP, width: DESKTOP_VIDEO_W }}>
          <VideoPlayer playing={playing} setPlaying={setPlaying} />
        </div>

        <div
          className="absolute"
          style={{ left: DESKTOP_VIDEO_W + DESKTOP_VIDEO_GAP, top: DESKTOP_BRANCH_TOP, width: TOTAL_W, height: VB_H }}
        >
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 ${TOTAL_W} ${VB_H}`}
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <marker id="arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill="#cbd5e1" />
              </marker>
            </defs>

            <path d={straightPath} stroke="#e2e8f0" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          </svg>

          <span
            className={`arrow-dot ${inView ? 'is-running' : ''}`}
            style={{ offsetPath: `path('${dotPath}')` }}
            onAnimationEnd={() => setIsSpread(true)}
          />

          <div
            className="glass-soft absolute flex -translate-x-1/2 -translate-y-1/2 items-start rounded-[28px] p-1"
            style={{ left: BADGE_X, top: TRUNK_Y }}
          >
            <span className="whitespace-nowrap rounded-3xl bg-white px-3 py-2 text-sm font-normal text-[#3f3f46] shadow-[inset_0_1px_5px_0_rgba(255,255,255,0.25)]">
              3 days - 3 clips
            </span>
          </div>

          {clips.map((clip, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ width: clip.width, zIndex: clip.z }}
              initial={{ left: clip.pileX, top: clip.pileY, rotate: clip.pileRotate, y: '-50%' }}
              animate={{
                left: isSpread ? clip.apartX : clip.pileX,
                top: isSpread ? clip.apartY : clip.pileY,
                rotate: isSpread ? 0 : clip.pileRotate,
                y: '-50%',
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function VideoPlayer({ playing, setPlaying, className = '' }) {
  return (
    <div className={`glass-soft w-full shrink-0 overflow-hidden rounded-[20px] p-1 lg:rounded-[19px] lg:p-1 lg:shadow-lg ${className}`}>
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-900 lg:rounded-[15px]">
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
        <p className="max-w-[489px] text-xl font-normal leading-tight text-[#3f3f46]">
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
      <Reveal delay={0.1} y={32} className="mt-8">
        <DesktopVideoBranch playing={playing} setPlaying={setPlaying} />
      </Reveal>
      )}
    </section>
  )
}
