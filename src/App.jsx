import Header from './components/Header'
import Hero from './components/Hero'
import OneVideoSection from './components/OneVideoSection'
import ProcessSection from './components/ProcessSection'
import ComparisonSection from './components/ComparisonSection'
import PricingSection from './components/PricingSection'
import FAQSection from './components/FAQSection'
import FinalCtaSection from './components/FinalCtaSection'
import Footer from './components/Footer'
import cloud from './assets/images/cloud-corner.png'

const clouds = [
  { top: 40, side: 'left', width: 850, opacity: 0.75, flip: false },
  { top: 950, side: 'right', width: 760, opacity: 0.6, flip: true },
  { top: 2150, side: 'left', width: 820, opacity: 0.65, flip: false },
  { top: 3450, side: 'right', width: 880, opacity: 0.6, flip: true },
  { top: 4750, side: 'left', width: 790, opacity: 0.65, flip: false },
  { top: 6150, side: 'right', width: 840, opacity: 0.65, flip: true },
]

export default function App() {
  return (
    <>
      <Header />
      <div className="relative overflow-hidden">
        {clouds.map((c, i) => (
          <img
            key={i}
            src={cloud}
            alt=""
            className="pointer-events-none absolute"
            style={{
              top: c.top,
              [c.side]: -60,
              width: `min(${c.width}px, 65vw)`,
              opacity: c.opacity,
              transform: c.flip ? 'scaleX(-1)' : undefined,
            }}
          />
        ))}

        <Hero />
        <OneVideoSection />
        <ComparisonSection />
        <ProcessSection />
        <PricingSection />
        <FAQSection />
        <FinalCtaSection />
        <Footer />
      </div>
    </>
  )
}
