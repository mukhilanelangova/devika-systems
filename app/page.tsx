"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Navigation from "./sections/Navigation";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Process from "./sections/Process";
import SelectedWork from "./sections/SelectedWork";
import Capabilities from "./sections/Capabilities";
import About from "./sections/About";
import Testimonials from "./sections/Testimonials";
import Pricing from "./sections/Pricing";
import Contact from "./sections/Contact";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Only setup global snap on desktop
    if (isMobile) return;

    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);

      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center:
          (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Global snap configuration
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (allow small buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02,
            );

            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0,
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: "power2.out",
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [isMobile]);

  return (
    <div className="relative bg-devika-bg min-h-screen">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Services */}
        <Services />

        {/* Section 3: Process */}
        <Process />

        {/* Section 4: Selected Work - pin: false */}
        <SelectedWork />

        {/* Section 5: Capabilities */}
        <Capabilities />

        {/* Section 6: About */}
        {/* <About /> */}

        {/* Section 7: Testimonials - pin: false */}
        <Testimonials />

        {/* Section 8: Pricing */}
        {/* <Pricing /> */}

        {/* Section 9: Contact - pin: false */}
        <Contact />
      </main>
    </div>
  );
}

export default Home;
