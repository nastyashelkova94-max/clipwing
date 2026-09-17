import Header from './components/Header'
import Hero from './components/Hero'
import OneVideoSection from './components/OneVideoSection'
import ProcessSection from './components/ProcessSection'
import ComparisonSection from './components/ComparisonSection'
import PricingSection from './components/PricingSection'
import FAQSection from './components/FAQSection'
import FinalCtaSection from './components/FinalCtaSection'
import Footer from './components/Footer'
import ComparisonPage from './pages/ComparisonPage'

function Landing() {
  return (
    <>
      <Header />
      <div className="relative overflow-hidden">
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

export default function App() {
  // Minimal pathname routing — the site is a Vite SPA with no router. Vercel
  // rewrites `/autopilot/*` onto `/*`, so strip that prefix before matching.
  const path =
    typeof window !== 'undefined'
      ? window.location.pathname.replace(/^\/autopilot/, '') || '/'
      : '/'

  // /comparison and /comparison-4 are the page's earlier addresses.
  if (path.startsWith('/clipwing-vs-opusclip') || path.startsWith('/comparison')) {
    return <ComparisonPage />
  }

  return <Landing />
}
