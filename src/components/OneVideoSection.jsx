import { useState } from 'react'
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

  return (
    <section className="relative z-10 mx-auto max-w-[1200px] px-6 pb-[160px]">
      <Reveal className="mx-auto flex max-w-[751px] flex-col items-center gap-4 text-center">
        <h2 className="text-[32px] font-medium text-slate-900 sm:text-[40px] lg:text-[48px]">
          See what we make from{' '}
          <span className="font-serif text-[32px] font-medium italic text-indigo-600 sm:text-[40px] lg:text-[48px]">
            one video
          </span>
        </h2>
        <p className="max-w-[489px] text-xl font-normal leading-tight text-slate-900">
          We pick the best parts, cut them, and add captions. You get clips
          ready to post
        </p>
      </Reveal>

      {/* Mobile / tablet: simple stacked layout, no branch lines */}
      <Reveal delay={0.1} y={32} className="mt-6 flex flex-col items-center gap-8 lg:hidden">
        <VideoPlayer playing={playing} setPlaying={setPlaying} className="max-w-[520px]" />

        <div className="glass-soft flex items-start rounded-[28px] p-1">
          <span className="whitespace-nowrap rounded-3xl bg-white px-4 py-3 text-base font-medium text-[#0F172A] shadow-[inset_0_1px_5px_0_rgba(255,255,255,0.25)]">
            3 days - 3 clips
          </span>
        </div>

        <div className="grid w-full max-w-[520px] grid-cols-3 gap-4">
          {mobileClips.map((clip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
          ))}
        </div>
      </Reveal>

      {/* Desktop: video connected to clips via branching lines */}
      <Reveal
        delay={0.1}
        y={32}
        className="mt-8 hidden items-center justify-start gap-10 lg:flex"
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
    </section>
  )
}
