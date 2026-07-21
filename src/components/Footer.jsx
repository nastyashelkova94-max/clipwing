import Logo from './Logo'
import Reveal from './Reveal'
import grassImg from '../assets/images/footer-grass.png'
import socialX from '../assets/icons/social-x.png'
import socialTikTok from '../assets/icons/social-tiktok.png'
import socialYoutube from '../assets/icons/social-youtube.png'

const browse = [
  { label: 'Pricing', href: 'https://clipwing.pro/pricing' },
  { label: 'Affiliates', href: 'https://clipwing.pro/affiliates' },
  { label: 'Blog', href: 'https://clipwing.pro/blog' },
  { label: 'Terms and Conditions', href: 'https://clipwing.pro/terms-and-conditions' },
  { label: 'Privacy Policy', href: 'https://clipwing.pro/privacy-policy' },
  { label: 'Refund Policy', href: 'https://clipwing.pro/refund-policy' },
]

const freeTools = [
  { label: 'All', href: 'https://clipwing.pro/all' },
  { label: 'Promo video generator', href: 'https://clipwing.pro/promo-video-generator' },
  { label: 'ProductHunt promo video generator', href: 'https://clipwing.pro/producthunt-promo-video-generator' },
  { label: 'Subtitles generator', href: 'https://clipwing.pro/subtitles-generator' },
  { label: 'YouTube transcript generator', href: 'https://clipwing.pro/youtube-transcript-generator' },
]

const services = [
  { label: 'Video production', href: 'https://clipwing.pro/custom-video-production' },
  { label: 'SaaS launch video', href: 'https://clipwing.pro/saas-launch-video' },
  { label: 'Autopilot' },
]

const socials = [
  { label: 'X', icon: socialX, href: 'https://x.com/clip_wing' },
  { label: 'TikTok', icon: socialTikTok, href: 'https://www.tiktok.com/@clipwing.pro' },
  { label: 'YouTube', icon: socialYoutube, href: 'https://www.youtube.com/@clipwing' },
]

function FooterColumn({ title, items }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-sm font-medium text-slate-900">{title}</h4>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href ?? '#'}
          className="whitespace-nowrap text-sm text-slate-900/70 transition-colors hover:text-indigo-600"
        >
          {item.label}
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
                <a
                  key={s.label}
                  href={s.href}
                  className="flex h-14 w-14 items-center justify-center rounded-lg bg-white"
                >
                  <img src={s.icon} alt={s.label} className="h-[72px] w-[72px]" />
                </a>
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
