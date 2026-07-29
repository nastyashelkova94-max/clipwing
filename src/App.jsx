import Header from './components/Header'
import Hero from './components/Hero'
import OneVideoSection from './components/OneVideoSection'
import ProcessSection from './components/ProcessSection'
import ComparisonSection from './components/ComparisonSection'
import PricingSection from './components/PricingSection'
import FAQSection from './components/FAQSection'
import FinalCtaSection from './components/FinalCtaSection'
import Footer from './components/Footer'

export default function App() {
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
