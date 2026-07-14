import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal'
import cardTodo from '../assets/images/kanban/card-todo.png'
import cardInProgress from '../assets/images/kanban/card-inprogress.png'
import cardPending1 from '../assets/images/kanban/card-pending-1.png'
import cardPending2 from '../assets/images/kanban/card-pending-2.png'
import cardDone1 from '../assets/images/kanban/card-done-1.png'
import cardDone2 from '../assets/images/kanban/card-done-2.png'

const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'pending', title: 'Pending Review' },
  { id: 'done', title: 'Done' },
]

const initialCards = [
  {
    id: 1,
    column: 'todo',
    image: cardTodo,
    title: 'AI Ads Will Be The Next Land Grab',
    status: 'Processing',
    date: 'Created 2 days ago',
  },
  {
    id: 2,
    column: 'inprogress',
    image: cardInProgress,
    title: 'AI is transforming how you play squash...',
    status: 'Awaiting Scripts',
    date: 'Created 2 days ago',
  },
  {
    id: 3,
    column: 'pending',
    image: cardPending1,
    title: 'Why nobody is watching your youtube v...',
    status: 'Clips Review',
    date: 'Edited 2 days ago',
  },
  {
    id: 4,
    column: 'pending',
    image: cardPending2,
    title: 'How to write titles that get clicks (in 1 mi...',
    status: 'Clips Review',
    date: 'Edited 2 days ago',
  },
  {
    id: 5,
    column: 'done',
    image: cardDone1,
    title: 'Why nobody is watching your youtube v...',
    status: 'Done',
    date: 'Edited 2 days ago',
  },
  {
    id: 6,
    column: 'done',
    image: cardDone2,
    title: 'SaaS is Hard Until You Learn These 4 Sk...',
    status: 'Done',
    date: 'Edited 2 days ago',
  },
]

function ClipIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-slate-400">
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" fill="none" stroke="currentColor" />
      <path d="M2.5 8h15M6 4.5v3.5M14 4.5v3.5" stroke="currentColor" />
    </svg>
  )
}

export default function ShowcaseDemo() {
  const [cards, setCards] = useState(initialCards)
  const [draggingId, setDraggingId] = useState(null)
  const boardRef = useRef(null)
  const columnRefs = useRef({})
  const columnRefCallbacks = useRef({})

  const getColumnRef = useCallback((id) => {
    if (!columnRefCallbacks.current[id]) {
      columnRefCallbacks.current[id] = (el) => {
        columnRefs.current[id] = el
      }
    }
    return columnRefCallbacks.current[id]
  }, [])

  function handleDragEnd(cardId, info) {
    setDraggingId(null)
    const { x, y } = info.point
    for (const col of columns) {
      const el = columnRefs.current[col.id]
      if (!el) continue
      const rect = el.getBoundingClientRect()
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        setCards((prev) =>
          prev.map((c) => (c.id === cardId ? { ...c, column: col.id } : c))
        )
        return
      }
    }
  }

  return (
    <section className="relative z-10 mx-auto max-w-[1200px] px-6 pb-[160px]">
      <Reveal y={32} className="glass-soft relative overflow-hidden rounded-[24px] p-[9px]">
        <div
          ref={boardRef}
          className="relative overflow-hidden rounded-[16px] bg-white select-none"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-6 py-4">
            <p className="text-sm text-slate-500">
              <span className="font-medium text-slate-900">clipwing</span>{' '}
              <span className="mx-1">|</span> Projects / My First Project
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700"
              >
                Edit
              </button>
              <button
                type="button"
                className="rounded-lg bg-indigo-500 px-3 py-1.5 text-sm font-medium text-white"
              >
                + New Task
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 overflow-x-auto p-6 lg:grid-cols-4">
            {columns.map((col) => {
              const colCards = cards.filter((c) => c.column === col.id)
              return (
                <div
                  key={col.id}
                  ref={getColumnRef(col.id)}
                  className="flex min-h-[200px] flex-col gap-3 rounded-2xl bg-slate-50 p-3"
                >
                  <div className="flex items-center gap-2 px-1">
                    <h4 className="text-sm font-medium text-slate-900">{col.title}</h4>
                    <span className="text-xs text-slate-400">{colCards.length}</span>
                  </div>

                  {colCards.map((card) => (
                    <motion.div
                      key={card.id}
                      drag
                      dragConstraints={boardRef}
                      dragElastic={0.15}
                      dragSnapToOrigin
                      onDragStart={() => setDraggingId(card.id)}
                      onDragEnd={(_, info) => handleDragEnd(card.id, info)}
                      whileDrag={{ scale: 1.05, cursor: 'grabbing', boxShadow: '0 20px 40px rgba(15,23,42,0.25)' }}
                      style={{
                        touchAction: 'none',
                        zIndex: draggingId === card.id ? 50 : 1,
                        position: 'relative',
                      }}
                      className="cursor-grab overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm"
                    >
                      <img
                        src={card.image}
                        alt=""
                        draggable={false}
                        className="h-24 w-full object-cover"
                      />
                      <div className="flex flex-col gap-2 p-3">
                        <p className="text-sm font-medium leading-snug text-slate-900">
                          {card.title}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <ClipIcon />
                          <span>3 clips requested</span>
                          <span className="rounded-full border border-slate-200 px-2 py-0.5">
                            {card.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{card.date}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
