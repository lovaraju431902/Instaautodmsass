import { AnnouncementBar } from "@/components/landing/announcement-bar"
import { Navbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { TrustStrip } from "@/components/landing/trust-strip"
import { FeatureIntro } from "@/components/landing/feature-intro"
import { AutoDMShowcase } from "@/components/landing/auto-dm-showcase"
import { CommentReplyShowcase } from "@/components/landing/comment-reply-showcase"
import { AudienceShowcase } from "@/components/landing/audience-showcase"
import { HowItWorks } from "@/components/landing/how-it-works"
import { IntegrationsSection } from "@/components/landing/integrations-section"
import { UseCasesSection } from "@/components/landing/use-cases-section"
import { AnalyticsSection } from "@/components/landing/analytics-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { BlogSection } from "@/components/landing/blog-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { FAQSection } from "@/components/landing/faq-section"
import { FinalCTA } from "@/components/landing/final-cta"
import { Footer } from "@/components/landing/footer"
import { SmoothScrollProvider } from "@/components/landing/smooth-scroll"
import { GsapAnimationWrapper } from "@/components/landing/gsap-animations"
import { RevealAnimation } from "@/components/animation/reveal-animation"

export default function Home() {
  return (
    <SmoothScrollProvider>
      <div className="flex min-h-screen flex-col bg-[hsl(var(--background))] font-sans antialiased selection:bg-[hsl(340_82%_62%/0.2)] selection:text-foreground">
        {/* 1. Announcement Bar */}
        <AnnouncementBar />

        {/* 2. Floating Centered Pill Navbar (Shows on scroll, stays centered) */}
        <Navbar />

        {/* Main Content with GSAP Scroll & Entrance Animations */}
        <GsapAnimationWrapper>
          <main className="flex-1">
            {/* 3. Hero Section & Product Dashboard */}
            <HeroSection />

            {/* 4. Trust / Credibility Strip - Down to Up */}
            <RevealAnimation direction="up" duration={0.8} offset={45}>
              <TrustStrip />
            </RevealAnimation>

            {/* 5. Feature Introduction - Up to Down */}
            <RevealAnimation direction="down" duration={0.9} offset={50}>
              <FeatureIntro />
            </RevealAnimation>

            {/* 6. Feature Showcase — Auto DM - Down to Up */}
            <RevealAnimation direction="up" duration={1.0} offset={55}>
              <AutoDMShowcase />
            </RevealAnimation>

            {/* 7. Feature Showcase — Comment Automation - Up to Down */}
            <RevealAnimation direction="down" duration={0.9} offset={55}>
              <CommentReplyShowcase />
            </RevealAnimation>

            {/* 8. Feature Showcase — Audience & Leads - Down to Up */}
            <RevealAnimation direction="up" duration={1.0} offset={55}>
              <AudienceShowcase />
            </RevealAnimation>

            {/* 9. How It Works - Up to Down */}
            <RevealAnimation direction="down" duration={0.9} offset={50}>
              <HowItWorks />
            </RevealAnimation>

            {/* 10. Integrations Section - Down to Up */}
            <RevealAnimation direction="up" duration={0.8} offset={45}>
              <IntegrationsSection />
            </RevealAnimation>

            {/* 11. Use Cases Section - Up to Down */}
            <RevealAnimation direction="down" duration={0.9} offset={50}>
              <UseCasesSection />
            </RevealAnimation>

            {/* 12. Analytics / Performance Section - Down to Up */}
            <RevealAnimation direction="up" duration={1.0} offset={55}>
              <AnalyticsSection />
            </RevealAnimation>

            {/* 13. Testimonials Section - Up to Down */}
            <RevealAnimation direction="down" duration={0.8} offset={45}>
              <TestimonialsSection />
            </RevealAnimation>

            {/* 14. Blog & Playbooks Section - Down to Up */}
            <RevealAnimation direction="up" duration={0.9} offset={50}>
              <BlogSection />
            </RevealAnimation>

            {/* 15. Pricing Section - Up to Down */}
            <RevealAnimation direction="down" duration={1.0} offset={55}>
              <PricingSection />
            </RevealAnimation>

            {/* 15. FAQ Section - Up to Down */}
            <RevealAnimation direction="down" duration={0.9} offset={50}>
              <FAQSection />
            </RevealAnimation>

            {/* 16. Final CTA Section - Down to Up */}
            <RevealAnimation direction="up" duration={1.0} offset={55}>
              <FinalCTA />
            </RevealAnimation>
          </main>
        </GsapAnimationWrapper>

        {/* 17. Site Footer */}
        <Footer />
      </div>
    </SmoothScrollProvider>
  )
}
