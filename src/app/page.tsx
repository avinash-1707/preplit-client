import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { SessionShowcase } from "@/components/landing/SessionShowcase";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeedbackShowcase } from "@/components/landing/FeedbackShowcase";
import { WhyItMatters } from "@/components/landing/WhyItMatters";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black">
      <Navbar />
      <main>
        <Hero />
        <SessionShowcase />
        <HowItWorks />
        <FeedbackShowcase />
        <WhyItMatters />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
