import Logo from './Logo'
import Reveal from './Reveal'

const browse = [
  'Pricing',
  'Affiliates',
  'Blog',
  'Terms and Conditions',
  'Privacy Policy',
  'Refund Policy',
]

const freeTools = [
  'All',
  'Promo video generator',
  'ProductHunt promo video generator',
  'Subtitles generator',
  'YouTube transcript generator',
]

const services = ['Video production', 'SaaS launch video']

const socials = [
  {
    label: 'X',
    icon: (
      <svg viewBox="0 0 24 24" className="size-4 fill-slate-900">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    icon: (
      <svg viewBox="0 0 24 24" className="size-4 fill-slate-900">
        <path d="M16.6 5.82c-.9-.63-1.5-1.64-1.63-2.82H12.5v13.6a2.6 2.6 0 1 1-1.87-2.5V11.6a5.15 5.15 0 1 0 4.37 5.1V9.6a7.6 7.6 0 0 0 4.4 1.4V8.5a4.8 4.8 0 0 1-2.8-1.1z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    icon: (
      <svg viewBox="0 0 24 24" className="size-4 fill-slate-900">
        <path d="M21.6 7.2s-.2-1.5-.8-2.2c-.8-.8-1.7-.8-2.1-.9C15.9 4 12 4 12 4h0s-3.9 0-6.7.1c-.4 0-1.3.1-2.1.9C2.6 5.7 2.4 7.2 2.4 7.2S2.2 9 2.2 10.7v1.6c0 1.7.2 3.5.2 3.5s.2 1.5.8 2.2c.8.8 1.8.8 2.3.9 1.7.1 6.5.1 6.5.1s3.9 0 6.7-.1c.4 0 1.3-.1 2.1-.9.6-.7.8-2.2.8-2.2s.2-1.7.2-3.5v-1.6c0-1.7-.2-3.5-.2-3.5zM9.9 14.6V8.9l5.4 2.9-5.4 2.8z" />
      </svg>
    ),
  },
]

function FooterColumn({ title, items }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-sm font-medium text-slate-900">{title}</h4>
      {items.map((item) => (
        <a key={item} href="#" className="text-sm text-slate-900/70">
          {item}
        </a>
      ))}
    </div>
  )
}

export default function Footer() {
  return (
    <Reveal as="footer" className="relative z-10 mx-auto max-w-[1200px] px-6 pt-12 pb-16">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[auto_repeat(3,1fr)]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <p className="whitespace-nowrap text-sm text-slate-800/70">
            Save days on producing better video content
          </p>
          <div className="flex gap-2">
            {socials.map((s) => (
              <span
                key={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-white"
              >
                {s.icon}
              </span>
            ))}
          </div>
        </div>

        <FooterColumn title="Browse" items={browse} />
        <FooterColumn title="Free tools" items={freeTools} />
        <FooterColumn title="Services" items={services} />
      </div>
    </Reveal>
  )
}
