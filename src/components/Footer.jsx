import Logo from './Logo'
import Reveal from './Reveal'
import grassImg from '../assets/images/footer-grass.png'
import socialX from '../assets/icons/social-x.png'
import socialTikTok from '../assets/icons/social-tiktok.png'
import socialYoutube from '../assets/icons/social-youtube.png'

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

const services = ['Video production', 'SaaS launch video', 'Autopilot']

const socials = [
  { label: 'X', icon: socialX },
  { label: 'TikTok', icon: socialTikTok },
  { label: 'YouTube', icon: socialYoutube },
]

function FooterColumn({ title, items }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-sm font-medium text-slate-900">{title}</h4>
      {items.map((item) => (
        <a
          key={item}
          href="#"
          className="whitespace-nowrap text-sm text-slate-900/70 transition-colors hover:text-indigo-600"
        >
          {item}
        </a>
      ))}
    </div>
  )
}

export default function Footer() {
  return (
    <div className="relative">
      <Reveal as="footer" className="relative z-10 mx-auto max-w-[1200px] px-6 pt-12 pb-5">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Logo />
            </div>
            <p className="whitespace-nowrap text-sm text-slate-800/70">
              Save days on producing better video content
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <span
                  key={s.label}
                  className="flex h-14 w-14 items-center justify-center rounded-lg bg-white"
                >
                  <img src={s.icon} alt={s.label} className="h-9 w-9" />
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-[70px]">
            <FooterColumn title="Browse" items={browse} />
            <FooterColumn title="Free tools" items={freeTools} />
            <FooterColumn title="Services" items={services} />
          </div>
        </div>
      </Reveal>

      <img
        src={grassImg}
        alt=""
        className="pointer-events-none block w-full select-none"
      />
    </div>
  )
}
