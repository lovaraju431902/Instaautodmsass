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
import { PricingSection } from "@/components/landing/pricing-section"
import { FAQSection } from "@/components/landing/faq-section"
import { FinalCTA } from "@/components/landing/final-cta"
import { Footer } from "@/components/landing/footer"
import { SmoothScrollProvider } from "@/components/landing/smooth-scroll"
import { GsapAnimationWrapper } from "@/components/landing/gsap-animations"

export default function Home() {
  return (
    <SmoothScrollProvider>
      <div className="flex min-h-screen flex-col bg-[hsl(var(--background))] font-sans antialiased selection:bg-[hsl(340_82%_62%/0.2)] selection:text-foreground">
        {/* 1. Announcement Bar */}
        <AnnouncementBar />

        {/* 2. Sticky Navbar */}
        <Navbar />

        {/* Main Content with GSAP Scroll & Entrance Animations */}
        <GsapAnimationWrapper>
          <main className="flex-1">
            {/* 3. Hero Section & Product Dashboard */}
            <HeroSection />

            {/* 4. Trust / Credibility Strip */}
            <TrustStrip />

            {/* 5. Feature Introduction */}
            <FeatureIntro />

            {/* 6. Feature Showcase — Auto DM */}
            <AutoDMShowcase />

            {/* 7. Feature Showcase — Comment Automation */}
            <CommentReplyShowcase />

            {/* 8. Feature Showcase — Audience & Leads */}
            <AudienceShowcase />

            {/* 9. How It Works */}
            <HowItWorks />

            {/* 10. Integrations Section */}
            <IntegrationsSection />

            {/* 11. Use Cases Section */}
            <UseCasesSection />

            {/* 12. Analytics / Performance Section */}
            <AnalyticsSection />

            {/* 13. Testimonials Section */}
            <TestimonialsSection />

            {/* 14. Pricing Section */}
            <PricingSection />

            {/* 15. FAQ Section */}
            <FAQSection />

            {/* 16. Final CTA Section */}
            <FinalCTA />
          </main>
        </GsapAnimationWrapper>

        {/* 17. Site Footer */}
        <Footer />
      </div>
    </SmoothScrollProvider>
  )
}
