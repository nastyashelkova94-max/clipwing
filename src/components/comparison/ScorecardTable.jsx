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

// Four clips cut from the same source video, two a side (Clipwing against
// OpusClip), then one row per criterion: a Yes / No label for each side and the
// note behind it.
export default function ScorecardTable() {
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
          <div role="row" className="flex gap-3 rounded-[12px] sm:gap-0 sm:rounded-[14px]">
            <div role="columnheader" className={`${CRITERION} hidden shrink-0 sm:block`}>
              <span className="sr-only">Criterion</span>
            </div>
            {SIDES.map((side) => (
              <div key={side.key} role="columnheader" className="min-w-0 flex-1">
                {/* On a phone the clips above already carry the names. */}
                <span className="sr-only sm:hidden">{sideName(side)}</span>
                <span
                  className={`${BAND_GAP} ${INSET} hidden flex-col items-center gap-2 pb-3 pt-3.5 sm:flex lg:pt-4`}
                >
                  <SideLabel side={side} className="text-lg lg:text-xl" />
                  {/* Below lg a side's clips stack, held narrow so the pair
                      doesn't run to twice a screen; from lg they sit side by
                      side. */}
                  <span className="flex w-full flex-col items-center gap-3 lg:flex-row lg:items-stretch lg:gap-4">
                    {side.entries.map(({ col }) => (
                      <span key={col.key} className="flex w-full min-w-0 max-w-[220px] justify-center lg:max-w-none lg:flex-1">
                        <span className="block w-full lg:px-1">
                          <FramedClip col={col} />
                        </span>
                      </span>
                    ))}
                  </span>
                </span>
              </div>
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
