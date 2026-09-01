import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Demo } from "@/components/demo"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Pricing } from "@/components/pricing"
import { CTA } from "@/components/cta"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <Demo />
      <Features />
      <HowItWorks />
      <Pricing />
      <CTA />
      <SiteFooter />
    </main>
  )
}
