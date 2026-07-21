import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import chevronDown from '../assets/icons/chevron-down.svg'

const navLinks = [
  { label: 'Pricing', href: 'https://clipwing.pro/pricing' },
  { label: 'Video production', href: 'https://clipwing.pro/custom-video-production' },
  { label: 'Autopilot' },
  { label: 'SaaS launch video', href: 'https://clipwing.pro/saas-launch-video' },
  { label: 'Free tools', hasChevron: true },
]

const freeTools = [
  { label: 'All', href: 'https://clipwing.pro/all' },
  { label: 'Promo video generator', href: 'https://clipwing.pro/promo-video-generator' },
  { label: 'ProductHunt promo video generator', href: 'https://clipwing.pro/producthunt-promo-video-generator' },
  { label: 'Subtitles generator', href: 'https://clipwing.pro/subtitles-generator' },
  { label: 'YouTube transcript generator', href: 'https://clipwing.pro/youtube-transcript-generator' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const closeTimer = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openTools = () => {
    clearTimeout(closeTimer.current)
    setToolsOpen(true)
  }

  const scheduleCloseTools = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setToolsOpen(false), 150)
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none sticky top-0 z-30 flex flex-col items-center px-6 py-6 lg:px-10"
    >
      <div
        className={`pointer-events-auto flex w-full items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'glass max-w-[1140px] rounded-[26px] p-[10px]'
            : 'max-w-[1300px]'
        }`}
      >
        <div className="flex items-center gap-3">
          <a href="https://clipwing.pro/">
            <Logo />
          </a>
        </div>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) =>
            link.hasChevron ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={openTools}
                onMouseLeave={scheduleCloseTools}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1 text-base transition-colors ${
                    toolsOpen ? 'text-indigo-600' : 'text-slate-900 hover:text-indigo-600'
                  }`}
                >
                  {link.label}
                  <img
                    src={chevronDown}
                    alt=""
                    className={`h-4 w-4 transition-transform duration-200 ${
                      toolsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {toolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`glass absolute left-1/2 top-full w-72 -translate-x-1/2 rounded-3xl p-2 ${
                      scrolled ? 'mt-6' : 'mt-3'
                    }`}
                  >
                    {freeTools.map((tool) => (
                      <a
                        key={tool.label}
                        href={tool.href ?? '#'}
                        className="block px-4 py-3 text-base text-slate-900 transition-colors hover:text-indigo-600"
                      >
                        {tool.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href ?? '#'}
                className="text-base text-slate-900 transition-colors hover:text-indigo-600"
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <motion.a
            href="#"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hidden h-12 whitespace-nowrap rounded-xl border border-indigo-400 bg-indigo-500 px-4 text-base font-medium text-[#f6f5f4] shadow-[inset_0_2px_9px_0_rgba(254,254,254,0.25)] transition-colors hover:bg-[#4139E3] sm:flex sm:items-center sm:justify-center"
          >
            Create my viral clip
          </motion.a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
          >
            <span className="relative flex h-4 w-5 flex-col justify-between">
              <span
                className={`h-[2px] w-full rounded-full bg-slate-900 transition-transform duration-200 ${
                  menuOpen ? 'translate-y-[7px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-[2px] w-full rounded-full bg-slate-900 transition-opacity duration-200 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-[2px] w-full rounded-full bg-slate-900 transition-transform duration-200 ${
                  menuOpen ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto glass mt-3 flex w-full max-w-[1140px] flex-col gap-1 rounded-3xl p-4 lg:hidden"
        >
          {navLinks.map((link) =>
            link.hasChevron ? null : (
              <a
                key={link.label}
                href={link.href ?? '#'}
                className="rounded-xl px-2 py-3 text-base text-slate-900 transition-colors hover:text-indigo-600"
              >
                {link.label}
              </a>
            )
          )}
          {freeTools.map((tool) => (
            <a
              key={tool.label}
              href={tool.href ?? '#'}
              className="rounded-xl px-2 py-3 text-base text-slate-900 transition-colors hover:text-indigo-600"
            >
              {tool.label}
            </a>
          ))}
          <a
            href="#"
            className="mt-2 flex h-12 items-center justify-center whitespace-nowrap rounded-xl border border-indigo-400 bg-indigo-500 px-4 text-base font-medium text-[#f6f5f4] shadow-[inset_0_2px_9px_0_rgba(254,254,254,0.25)] transition-colors hover:bg-[#4139E3] sm:hidden"
          >
            Create my viral clip
          </a>
        </motion.div>
      )}
    </motion.header>
  )
}
