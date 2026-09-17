// All copy and assets for /comparison in one place, so the page components stay
// layout-only and the facts can be edited without touching markup.

import colClipwing1 from '../../assets/images/compare/col-clipwing1.mp4'
import colClipwing1Poster from '../../assets/images/compare/col-clipwing1-poster.jpg'
import colClipwing2 from '../../assets/images/compare/col-clipwing2.mp4'
import colClipwing2Poster from '../../assets/images/compare/col-clipwing2-poster.jpg'
import colAi1 from '../../assets/images/compare/col-ai1.mp4'
import colAi1Poster from '../../assets/images/compare/col-ai1-poster.jpg'
import colAi2 from '../../assets/images/compare/col-ai2.mp4'
import colAi2Poster from '../../assets/images/compare/col-ai2-poster.jpg'

// One clip per column; the file names match the column labels.
export const CHECKLIST_COLUMNS = [
  {
    key: 'cw1',
    label: 'Clipwing 1',
    brand: true,
    video: colClipwing1,
    poster: colClipwing1Poster,
  },
  {
    key: 'cw2',
    label: 'Clipwing 2',
    brand: true,
    video: colClipwing2,
    poster: colClipwing2Poster,
  },
  {
    key: 'ai1',
    label: 'AI 1',
    brand: false,
    video: colAi1,
    poster: colAi1Poster,
  },
  {
    key: 'ai2',
    label: 'AI 2',
    brand: false,
    video: colAi2,
    poster: colAi2Poster,
  },
]

// `values` is in column order: Clipwing 1, Clipwing 2, AI 1, AI 2. `notes` is
// the verdict that used to live in the breakdown deck: one line for the pair of
// Clipwing columns, one for the pair of AI columns, so each criterion now
// carries both the marks and the reason for them in a single table.
export const CHECKLIST_ROWS = [
  {
    label: 'Hook',
    values: [true, true, true, false],
    notes: {
      clipwing: 'Opens with a reason to keep watching',
      ai: 'May start mid-thought or with unnecessary context',
    },
  },
  {
    label: 'Standalone clarity',
    values: [true, true, true, false],
    notes: {
      clipwing: 'Built around one clear idea',
      ai: 'Usually just a section of the original video',
    },
  },
  {
    label: 'Complete thought',
    values: [true, true, true, false],
    notes: {
      clipwing: 'Makes sense as a standalone video',
      ai: 'Often depends on what came before',
    },
  },
  {
    label: 'Value per second',
    values: [true, true, false, false],
    notes: {
      clipwing: 'Keeps only what moves the story forward',
      ai: 'Can include repetitive or unnecessary parts',
    },
  },
  {
    label: 'Modern editing',
    values: [true, true, false, false],
    notes: {
      clipwing: 'Clean, modern editing',
      ai: 'Generic or outdated edits',
    },
  },
  {
    label: 'Intentional visuals',
    values: [true, true, false, false],
    notes: {
      clipwing: 'Intentional visuals that support what’s being said',
      ai: 'Random or irrelevant B-roll and inserts',
    },
  },
  {
    label: 'Dynamic pacing',
    values: [true, true, false, false],
    notes: {
      clipwing: 'Pacing that keeps the clip engaging',
      ai: 'Static pacing, with little visual movement',
    },
  },
  {
    label: 'Human judgement',
    values: [true, true, false, false],
    notes: {
      clipwing: 'Every story is human-reviewed and every clip human-edited',
      ai: 'Clip selection and editing are fully automated',
    },
  },
  {
    label: 'Brand alignment',
    values: [true, true, false, false],
    notes: {
      clipwing: 'Editing tailored to each client’s style and content',
      ai: 'Generic editing with little regard for the creator’s style',
    },
  },
]
