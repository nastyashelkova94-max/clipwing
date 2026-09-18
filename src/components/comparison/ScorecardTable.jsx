import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import logoMark from '../../assets/logo/logo-mark.svg'
import opusClipMark from '../../assets/logo/opusclip-mark.svg'
import { CHECKLIST_COLUMNS, CHECKLIST_ROWS } from './comparisonData'
import ClipPlate from './ClipPlate'

// The gap between the columns sits entirely on the left of each one, and the
// cells carry the same figure as left padding, so a verdict centres on its
// column rather than drifting by the width of the gap.
const BAND_GAP = 'ml-3 lg:ml-4'
const CELL_GAP = 'sm:pl-3 lg:pl-4'
// Only as wide as the longest label needs, so the criteria sit close to the
// verdicts they name instead of across a gap of empty column.
const CRITERION = 'w-[27%] lg:w-[22%]'

// One box model shared by a column's header and every cell under it: same
// padding, same gap, halves of the same width — that is what keeps the two
// clips of a side lined up with what sits under them.
const INSET = 'px-3.5 lg:px-5'

// The note under a verdict. Below xl its lines are held to a short, balanced
// measure; from xl up every note fits its column on one line.
const NOTE =
  'px-3 text-center text-sm leading-snug text-slate-600 sm:px-[22px] sm:text-[15px] lg:px-9 xl:px-11'
const NOTE_MEASURE = 'max-w-[250px] text-balance xl:max-w-none xl:whitespace-nowrap'

// Two columns, not four: a verdict is reached once per side, so the side is the
// column and the two clips that earned it sit within it. Each entry keeps the
// index its clip has in a row's `values`.
const SIDES = [true, false].map((brand) => ({
  key: brand ? 'clipwing' : 'ai',
  entries: CHECKLIST_COLUMNS.map((col, index) => ({ col, index })).filter(
    ({ col }) => col.brand === brand,
  ),
}))

const RIVAL = { name: 'OpusClip', logo: opusClipMark }

const sideName = (side) => (side.key === 'clipwing' ? 'Clipwing' : RIVAL.name)

// A side is labelled once, by name and logo, however many clips it holds.
function SideLabel({ side, className = '' }) {
  const logo = side.key === 'clipwing' ? logoMark : RIVAL.logo
  return (
    <span
      className={`flex items-center gap-1.5 whitespace-nowrap font-medium leading-tight text-slate-900 ${className}`}
    >
      <img src={logo} alt="" className="size-[1.1em] shrink-0" />
      {sideName(side)}
    </span>
  )
}

// A clip in the FAQ cards' frame: a rim of the same soft glass around it, with
// the clip's corners concentric to the frame's (outer radius less the rim).
function FramedClip({ col, play = 'h-6 w-6 lg:h-9 lg:w-9', icon = 'h-2.5 w-2.5 lg:h-3.5 lg:w-3.5' }) {
  const shape = 'rounded-[10px] lg:rounded-xl'
  return (
    <span className="glass-soft block w-full rounded-[14px] p-1 shadow-[0_10px_30px_-18px_rgba(25,27,58,0.35)] lg:rounded-[18px] lg:p-1.5">
      <span className={`block w-full overflow-hidden ${shape}`}>
        <ClipPlate
          src={col.video}
          poster={col.poster}
          label={col.label}
          alt={`Opening frame of the ${col.label} clip`}
          radius={shape}
          playClassName={play}
          iconClassName={icon}
        />
      </span>
    </span>
  )
}

// The verdict as a word instead of an icon. Green for yes, red for no; an AI
// clip that passes still passes with a catch (the note says which), so it gets
// "Yes, but…" in amber. Squared-off corners, so it reads as a label rather
// than a button.
function Verdict({ yes, but = false }) {
  const tone = !yes
    ? 'bg-red-50 text-red-600 ring-red-200'
    : but
      ? 'bg-amber-50 text-amber-700 ring-amber-200'
      : 'bg-green-50 text-green-700 ring-green-200'
  return (
    <span
      className={`inline-flex h-7 items-center whitespace-nowrap rounded-md px-2.5 text-[13px] font-medium uppercase leading-none tracking-[0.04em] ring-1 ${tone}`}
    >
      {!yes ? 'No' : but ? 'Yes, but…' : 'Yes'}
    </span>
  )
}

// How far a side's header travels left to put the clips on the page's centre
// line: half the criterion column, as a share of one side's own width (the
// unit a percentage in translate is measured in). 27% → 13.5 / 36.5 of a side,
// 22% → 11 / 39. Nothing on a phone, where the clips have their own grid.
// The band gap sits on a side's left only, so the pair also leans right by
// half of it; --band-half takes that back out. --pull draws the two sides
// together while the clips are large, so the four read as one row.
const CENTRE_SHIFT =
  'sm:[--centre-shift:-36.99%] lg:[--centre-shift:-28.21%] sm:[--band-half:6px] lg:[--band-half:8px] lg:[--pull:20px]'

// How much wider each clip opens than it settles, in px.
const GROW = 50

// Opening the page, the clips stand centred under the title and GROW px wider
// than their column allows; scrolling down carries them right, onto the
// columns their verdicts sit in, and eases them back to their own size,
// arriving as the header nears the top of the window.
function useCentreShift(headerRef, pairRef) {
  const reduce = useReducedMotion()
  // Untransformed sizes (offset*, not getBoundingClientRect), so a measure
  // taken mid-animation isn't skewed by the scale it is driving.
  const [box, setBox] = useState({ end: 1, clip: 1, pairW: 0, pairH: 0 })
  useLayoutEffect(() => {
    const measure = () => {
      const header = headerRef.current
      const pair = pairRef.current
      if (!header || !pair) return
      const top = header.getBoundingClientRect().top + window.scrollY
      setBox({
        end: Math.max(1, top - 120),
        clip: pair.querySelector('.glass-soft')?.offsetWidth || 1,
        pairW: pair.offsetWidth,
        pairH: pair.offsetHeight,
      })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [headerRef, pairRef])
  const { scrollY } = useScroll()
  const raw = useTransform(scrollY, [0, box.end], [reduce ? 0 : 1, 0], { clamp: true })
  // Sprung rather than tied to the wheel, so a coarse scroll step still
  // reads as one soft glide.
  const left = useSpring(raw, { stiffness: 400, damping: 22, mass: 0.25, restDelta: 0.0005 })
  const scale = useTransform(left, (l) => 1 + (GROW / box.clip) * l)
  // Each side steps outward by the width its pair gained on that edge, so the
  // grown clips of the two sides don't run into each other.
  const spread = (dir) => (l) => {
    const out = (box.pairW * (GROW / box.clip) * l) / 2
    return `translateX(calc((var(--centre-shift, 0%) - var(--band-half, 0px)) * ${l} + ${dir} * (${out}px - var(--pull, 0px) * ${l})))`
  }
  const sides = {
    clipwing: useTransform(left, spread(-1)),
    ai: useTransform(left, spread(1)),
  }
  // Room below for the height the scale adds, so the clips don't sit on the
  // first row of verdicts.
  const room = useTransform(left, (l) => box.pairH * (GROW / box.clip) * l)
  return { sides, scale, room }
}

// Four clips cut from the same source video, two a side (Clipwing against
// OpusClip), then one row per criterion: a Yes / No label for each side and the
// note behind it.
export default function ScorecardTable() {
  const headerRef = useRef(null)
  const pairRef = useRef(null)
  const { sides, scale, room } = useCentreShift(headerRef, pairRef)
  return (
    <>
      {/* On a phone the sides stand next to each other, Clipwing on the left,
          each side's two clips one under the other. */}
      <ul className="mb-6 grid grid-cols-2 gap-3 sm:hidden">
        {SIDES.map((side) => (
          <li key={side.key}>
            <SideLabel side={side} className="mb-2 justify-center text-lg" />
            <span className="grid grid-cols-1 gap-3">
              {side.entries.map(({ col }) => (
                <FramedClip key={col.key} col={col} play="h-9 w-9" icon="h-3.5 w-3.5" />
              ))}
            </span>
          </li>
        ))}
      </ul>

      <div
        role="table"
        aria-label="Nine publishing criteria checked against four clips cut from the same source video — two by Clipwing Autopilot and two by an automatic AI clipper — each followed by the verdict for either side."
        className="relative"
      >
        <div role="rowgroup" className="relative">
          <div ref={headerRef} role="row" className={`flex gap-3 rounded-[12px] sm:gap-0 sm:rounded-[14px] ${CENTRE_SHIFT}`}>
            <div role="columnheader" className={`${CRITERION} hidden shrink-0 sm:block`}>
              <span className="sr-only">Criterion</span>
            </div>
            {SIDES.map((side) => (
              <motion.div
                key={side.key}
                role="columnheader"
                className="min-w-0 flex-1 will-change-transform"
                style={{ transform: sides[side.key] }}
              >
                {/* On a phone the clips above already carry the names. */}
                <span className="sr-only sm:hidden">{sideName(side)}</span>
                <span
                  className={`${BAND_GAP} ${INSET} hidden flex-col items-center gap-2 pb-3 pt-3.5 sm:flex lg:pt-4`}
                >
                  <SideLabel side={side} className="text-lg lg:text-xl" />
                  {/* Below lg a side's clips stack, held narrow so the pair
                      doesn't run to twice a screen; from lg they sit side by
                      side. */}
                  <motion.span
                    ref={side.key === 'clipwing' ? pairRef : undefined}
                    className="flex w-full origin-top flex-col items-center gap-3 will-change-transform lg:flex-row lg:items-stretch lg:gap-4"
                    style={{ scale, marginBottom: room }}
                  >
                    {side.entries.map(({ col }) => (
                      <span key={col.key} className="flex w-full min-w-0 max-w-[220px] justify-center lg:max-w-none lg:flex-1">
                        <span className="block w-full lg:px-1">
                          <FramedClip col={col} />
                        </span>
                      </span>
                    ))}
                  </motion.span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div role="rowgroup" className="mt-3 sm:mt-4">
          {CHECKLIST_ROWS.map((row, i) => (
            <div
              key={row.label}
              role="row"
              className={`flex flex-wrap gap-x-3 gap-y-4 rounded-[14px] py-5 sm:flex-nowrap sm:gap-0 sm:py-6 ${
                i % 2 === 0 ? 'bg-white/45' : ''
              }`}
            >
              <div
                role="rowheader"
                className="w-full px-3.5 text-lg font-medium leading-snug text-slate-900 sm:w-[27%] sm:shrink-0 lg:w-[22%] sm:pl-6 sm:pr-6 lg:pl-8 lg:text-xl"
              >
                {row.label}
              </div>
              {SIDES.map((side) => (
                <div key={side.key} role="cell" className={`min-w-0 flex-1 ${CELL_GAP}`}>
                  {/* One label a side, however many clips it holds — the
                      verdict of its first clip. */}
                  <span className={`flex justify-center ${INSET}`}>
                    <span className="sr-only">{sideName(side)}:</span>
                    <Verdict yes={row.values[side.entries[0].index]} but={side.key === 'ai'} />
                  </span>
                  <p className={`mt-5 ${NOTE}`}>
                    <span className={`mx-auto block ${NOTE_MEASURE}`}>{row.notes[side.key]}</span>
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
