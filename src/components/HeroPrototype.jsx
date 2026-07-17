import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'
import Logo from './Logo'
import clip1 from '../assets/images/process/clip-1.mp4'
import clip2 from '../assets/images/process/clip-2.mp4'
import clip3 from '../assets/images/process/clip-3.mp4'
import poster1 from '../assets/images/process/clip-1-poster.jpg'
import poster2 from '../assets/images/process/clip-2-poster.jpg'
import poster3 from '../assets/images/process/clip-3-poster.jpg'

const clips = [
  { title: 'I Built a Startup to Reverse Aging', duration: '0:49', src: clip1, poster: poster1 },
  { title: 'Voice-Prompting', duration: '1:02', src: clip2, poster: poster2 },
  { title: 'Email Test', duration: '0:58', src: clip3, poster: poster3 },
]

function BellIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}

function SendIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 3l18 9-18 9V3z" />
    </svg>
  )
}

function PenIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  )
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function PlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function VolumeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
    </svg>
  )
}

function DownloadIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  )
}

function ClapperIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M3 8l3-5h4l-3 5" />
      <path d="M10 8l3-5h4l-3 5" />
    </svg>
  )
}

function ChevronIcon({ direction = 'left', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: direction === 'right' ? 'rotate(180deg)' : undefined }} {...props}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function CommentIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 10h.01M12 10h.01M16 10h.01" />
      <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 4v-4H6a2 2 0 0 1-2-2V6z" />
    </svg>
  )
}

function TopBar({ onBack }) {
  return (
    <div className="flex h-14 shrink-0 items-center gap-2 border-b border-slate-100 px-4">
      <Logo className="h-6" />
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
      >
        <span className="mx-1">|</span> Projects <span className="mx-0.5">/</span>{' '}
        <span className="text-slate-900">My First Project</span>
      </button>
      <div className="flex-1" />
      <BellIcon className="size-4 text-slate-500" />
    </div>
  )
}

function VideoFrame({ clip, playing, onToggle, className = '' }) {
  return (
    <div className={`relative aspect-[9/16] w-full max-w-[220px] overflow-hidden bg-slate-800 ${className}`}>
      <video
        src={clip.src}
        poster={clip.poster}
        muted
        loop
        playsInline
        autoPlay={playing}
        preload="none"
        className="h-full w-full object-cover"
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute inset-0 grid place-items-center"
      >
        <span className="grid size-12 place-items-center rounded-full bg-white/90 shadow-lg">
          <PlayIcon className="ml-0.5 size-5 text-slate-900" />
        </span>
      </button>
      <span className="absolute bottom-2 right-2 rounded bg-white px-1.5 py-0.5 text-xs font-medium text-slate-900">
        {clip.duration}
      </span>
    </div>
  )
}

function BoardScreen({ approved, onOpenReview, onOpenDone }) {
  const columns = [
    { title: 'To Do', count: 0 },
    { title: 'In Progress', count: 0 },
    { title: 'Pending Review', count: approved ? 0 : 1 },
    { title: 'Done', count: approved ? 1 : 0 },
  ]

  return (
    <div className="flex flex-col">
      <TopBar />
      <div className="hidden items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:flex">
        <p className="max-w-[520px] truncate text-sm text-slate-500">
          Weekly podcast about tech startups. Brand guidelines: keep clips energetic, under 60 seconds
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900">
            <PenIcon className="size-3.5" /> Edit
          </button>
          <button type="button" className="flex items-center gap-1.5 rounded-lg bg-indigo-500 px-3 py-1.5 text-sm font-medium text-white">
            + New Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 overflow-x-auto p-4 lg:grid-cols-4">
        {columns.map((col) => (
          <div key={col.title} className="flex min-h-[220px] flex-col gap-3 rounded-2xl bg-slate-50 p-3">
            <div className="flex items-center gap-2 px-1">
              <h4 className="text-sm font-medium text-slate-900">{col.title}</h4>
              <span className="text-xs text-slate-400">{col.count}</span>
            </div>

            {col.title === 'Pending Review' && !approved && (
              <button
                type="button"
                onClick={onOpenReview}
                className="overflow-hidden rounded-xl border border-slate-100 bg-white text-left shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <img src={poster1} alt="" className="h-24 w-full object-cover" />
                <div className="flex flex-col gap-2 p-3">
                  <p className="text-sm font-medium leading-snug text-slate-900">
                    Shipping AI features — June webinar
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <ClapperIcon className="size-3.5 shrink-0 text-slate-400" />
                    <span>3 clips requested</span>
                    <span className="rounded-full border border-slate-200 px-2 py-0.5">Clips Review</span>
                  </div>
                  <p className="text-xs text-slate-400">Edited 2 days ago</p>
                </div>
              </button>
            )}

            {col.title === 'Done' && approved && (
              <button
                type="button"
                onClick={onOpenDone}
                className="overflow-hidden rounded-xl border border-slate-100 bg-white text-left shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <img src={poster1} alt="" className="h-24 w-full object-cover" />
                <div className="flex flex-col gap-2 p-3">
                  <p className="text-sm font-medium leading-snug text-slate-900">
                    Shipping AI features — June webinar
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <ClapperIcon className="size-3.5 shrink-0 text-slate-400" />
                    <span>3 clips requested</span>
                    <span className="rounded-full border border-slate-200 px-2 py-0.5">Done</span>
                  </div>
                  <p className="text-xs text-slate-400">Edited 2 days ago</p>
                </div>
              </button>
            )}

            {col.count === 0 && (
              <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-slate-200 text-sm text-slate-500">
                No tasks
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ReviewScreen({ onBack, comments, onAddComment, approved, onApprove }) {
  const [clipIndex, setClipIndex] = useState(1)
  const [playing, setPlaying] = useState(false)
  const [draft, setDraft] = useState('')
  const clip = clips[clipIndex]

  function submitComment(e) {
    e.preventDefault()
    if (!draft.trim()) return
    onAddComment(draft.trim())
    setDraft('')
  }

  return (
    <div className="flex flex-col">
      <TopBar onBack={onBack} />
      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-[1fr_320px]">
        <div className="overflow-hidden rounded-xl bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setClipIndex((i) => (i - 1 + clips.length) % clips.length)}
                className="grid size-9 place-items-center rounded-lg border border-slate-200"
              >
                <ChevronIcon className="size-4" />
              </button>
              <span className="text-sm text-slate-900">Clip {clipIndex + 1} of {clips.length}</span>
              <button
                type="button"
                onClick={() => setClipIndex((i) => (i + 1) % clips.length)}
                className="grid size-9 place-items-center rounded-lg border border-slate-200"
              >
                <ChevronIcon direction="right" className="size-4" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium ${
                  approved ? 'border-slate-300 text-slate-500' : 'border-slate-200 text-slate-900'
                }`}
              >
                <PenIcon className="size-3.5" /> {approved ? 'Changes Requested' : 'Request Changes'}
              </button>
              <button
                type="button"
                onClick={onApprove}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium ${
                  approved
                    ? 'border border-green-500 text-slate-900'
                    : 'bg-indigo-500 text-white'
                }`}
              >
                <CheckIcon className="size-3.5" /> Approve
              </button>
            </div>
          </div>

          <div className="flex justify-center bg-black py-4">
            <VideoFrame clip={clip} playing={playing} onToggle={() => setPlaying((p) => !p)} />
          </div>

          <div className="flex items-center gap-3 pt-3 text-sm text-slate-900">
            <PlayIcon className="size-4 shrink-0" />
            <span className="tabular-nums">0:05</span>
            <div className="h-1.5 flex-1 rounded-full bg-slate-200">
              <div className="h-full w-1/3 rounded-full bg-slate-900" />
            </div>
            <span className="tabular-nums">{clip.duration}</span>
            <VolumeIcon className="size-4 shrink-0" />
            <span>1x</span>
          </div>
        </div>

        <div className="flex flex-col rounded-xl bg-white">
          <div className="flex gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1 text-sm">
            <span className="flex-1 rounded-md border border-slate-200 bg-white py-1.5 text-center font-medium text-slate-900">
              Comments
            </span>
            <span className="flex-1 py-1.5 text-center font-medium text-slate-900">Transcript</span>
          </div>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto py-4">
            {comments.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
                <CommentIcon className="size-16 text-slate-200" />
                <p className="text-sm text-slate-500">No comments yet</p>
              </div>
            ) : (
              comments.map((c, i) => (
                <div key={i} className="rounded-lg bg-slate-50 p-3">
                  <div className="flex items-center gap-2">
                    <span className="grid size-6 place-items-center rounded-full bg-slate-400 text-xs text-slate-50">U</span>
                    <span className="text-sm font-medium text-slate-900">User</span>
                    <span className="text-xs text-slate-500">{c.time}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="rounded bg-indigo-200 px-2 py-0.5 text-sm text-indigo-700">0:05</span>
                    <p className="text-sm text-slate-900">{c.text}</p>
                  </div>
                  <p className="mt-2 text-xs font-medium text-slate-900">Reply</p>
                </div>
              ))
            )}
          </div>

          <form onSubmit={submitComment} className="flex items-center gap-2 rounded-lg bg-slate-50 p-2">
            <span className="rounded bg-indigo-200 px-2 py-1 text-sm text-indigo-700">2:35</span>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Leave your comment..."
              className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none"
            />
            <button type="submit" className="grid size-8 place-items-center rounded-md bg-indigo-500 text-white">
              <SendIcon className="size-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

function DoneScreen({ onBack }) {
  return (
    <div className="flex flex-col">
      <TopBar onBack={onBack} />
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <p className="text-sm text-slate-900">All approved</p>
        <button type="button" className="flex items-center gap-1.5 rounded-lg bg-indigo-500 px-3 py-1.5 text-sm font-medium text-white">
          <DownloadIcon className="size-3.5" /> Download All
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {clips.map((clip, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
            <div className="flex justify-center bg-black py-4">
              <VideoFrame clip={clip} playing={false} onToggle={() => {}} className="max-w-none" />
            </div>
            <div className="flex flex-col gap-1 p-4">
              <p className="text-sm font-medium text-slate-900">{clip.title}</p>
              <p className="text-sm text-slate-600">Editor John</p>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-sm text-slate-600">2 days ago</p>
                <button type="button" className="flex items-center gap-1.5 rounded-lg bg-indigo-500 px-3 py-1.5 text-sm font-medium text-white">
                  <DownloadIcon className="size-3.5" /> Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HeroPrototype() {
  const [screen, setScreen] = useState('board')
  const [approved, setApproved] = useState(false)
  const [comments, setComments] = useState([])
  const containerRef = useRef(null)

  function handleAddComment(text) {
    setComments((prev) => [...prev, { text, time: 'now' }])
  }

  function handleApprove() {
    setApproved(true)
  }

  return (
    <section className="relative z-10 mx-auto max-w-[1200px] px-6 pb-[160px]">
      <Reveal y={32} className="glass-soft relative overflow-hidden rounded-[24px] p-[9px]">
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-[16px] bg-white select-none"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {screen === 'board' && (
                <BoardScreen
                  approved={approved}
                  onOpenReview={() => setScreen('review')}
                  onOpenDone={() => setScreen('done')}
                />
              )}
              {screen === 'review' && (
                <ReviewScreen
                  onBack={() => setScreen('board')}
                  comments={comments}
                  onAddComment={handleAddComment}
                  approved={approved}
                  onApprove={handleApprove}
                />
              )}
              {screen === 'done' && <DoneScreen onBack={() => setScreen('board')} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  )
}
