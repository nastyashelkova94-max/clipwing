import { motion } from 'framer-motion'
import Logo from './Logo'
import chevronDown from '../assets/icons/chevron-down.svg'

const navLinks = [
  { label: 'Pricing' },
  { label: 'Video production' },
  { label: 'Free tools', hasChevron: true },
  { label: 'Services', hasChevron: true },
]

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-30 mx-auto flex max-w-[1300px] items-center justify-between px-6 py-6 lg:px-10"
    >
      <div className="flex items-center gap-3">
        <Logo />
        <span className="text-lg text-slate-900">Autopilot</span>
      </div>

      <nav className="hidden items-center gap-6 lg:flex">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href="#"
            className="flex items-center gap-1 text-base text-slate-900"
          >
            {link.label}
            {link.hasChevron && <img src={chevronDown} alt="" className="h-4 w-4" />}
          </a>
        ))}
      </nav>

      <motion.a
        href="#"
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="rounded-xl border border-indigo-400 bg-indigo-500 px-4 py-3 text-base font-medium text-[#f6f5f4] shadow-[inset_0_2px_9px_0_rgba(254,254,254,0.25)]"
      >
        Create my viral clip
      </motion.a>
    </motion.header>
  )
}
