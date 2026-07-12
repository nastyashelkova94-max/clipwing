import Reveal from './Reveal'
import showcaseAll from '../assets/images/showcase-all.png'

export default function ShowcaseDemo() {
  return (
    <section className="relative z-10 mx-auto max-w-[1103px] px-6 pb-40">
      <Reveal
        y={32}
        className="glass-soft relative overflow-hidden rounded-[24px] p-[9px]"
      >
        <div className="relative overflow-hidden rounded-[16px]">
          <img
            src={showcaseAll}
            alt="Clipwing dashboard showing generated clips"
            className="w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-b from-transparent to-[#f8fafc]" />
        </div>
      </Reveal>
    </section>
  )
}
