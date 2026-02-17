import {
  useRef,
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;
    const cta = ctaRef.current;
    const label = labelRef.current;

    if (
      !section ||
      !image ||
      !content ||
      !headline ||
      !subhead ||
      !cta ||
      !label
    )
      return;

    const ctx = gsap.context(() => {
      // Initial states (hidden)
      gsap.set(image, {
        x: isMobile ? 0 : "-60vw",
        y: isMobile ? "-40vh" : 0,
        opacity: 0,
      });
      gsap.set(content, {
        x: isMobile ? 0 : "40vw",
        y: isMobile ? "40vh" : 0,
        opacity: 0,
      });
      gsap.set(label, { y: -12, opacity: 0 });
      gsap.set(headline.querySelectorAll(".word"), { y: 40, opacity: 0 });
      gsap.set([subhead, cta], { y: 18, opacity: 0 });

      // Auto-play entrance animation
      const entranceTl = gsap.timeline({ delay: 0.2 });

      entranceTl
        .to(image, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
        })
        .to(
          content,
          { x: 0, y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "<",
        )
        .to(
          label,
          { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" },
          "-=0.4",
        )
        .to(
          headline.querySelectorAll(".word"),
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.04,
            ease: "power3.out",
          },
          "-=0.2",
        )
        .to([subhead, cta], {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.65,
          ease: "power2.out",
        });

      // Only add scroll animations on desktop
      if (!isMobile) {
        // Scroll-driven exit animation
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=130%",
            pin: true,
            scrub: 0.5,
            onLeaveBack: () => {
              gsap.to([image, content], { x: 0, opacity: 1, duration: 0.3 });
              gsap.to(headline, { x: 0, opacity: 1, duration: 0.3 });
              gsap.to([subhead, cta], { x: 0, opacity: 1, duration: 0.3 });
            },
          },
        });

        scrollTl
          .fromTo(
            headline,
            { x: 0, opacity: 1 },
            { x: "18vw", opacity: 0.25, ease: "power2.in" },
            0.7,
          )
          .fromTo(
            [subhead, cta],
            { x: 0, opacity: 1 },
            { x: "10vw", opacity: 0.2, ease: "power2.in" },
            0.72,
          )
          .fromTo(
            image,
            { x: 0, opacity: 1 },
            { x: "-18vw", opacity: 0.35, ease: "power2.in" },
            0.7,
          )
          .fromTo(
            content,
            { x: 0, opacity: 1 },
            { x: "10vw", opacity: 0.25, ease: "power2.in" },
            0.72,
          );
      }
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  const scrollToSection = useCallback((href: string) => {
    // Disable snap temporarily during navigation
    const allTriggers = ScrollTrigger.getAll();
    const snapTrigger = allTriggers.find((st) => st.vars.snap);

    if (snapTrigger) {
      snapTrigger.disable();
    }

    const target = href === "#" ? "top" : href;

    if (target === "top") {
      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: 0 },
        ease: "power2.inOut",
        onComplete: () => {
          if (snapTrigger) snapTrigger.enable();
        },
      });
    } else {
      const element = document.querySelector(target);
      if (element) {
        gsap.to(window, {
          duration: 0.8,
          scrollTo: { y: element, offsetY: 100 },
          ease: "power2.inOut",
          onComplete: () => {
            if (snapTrigger) snapTrigger.enable();
          },
        });
      }
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative bg-devika-bg z-10 ${isMobile ? "min-h-screen" : "section-pinned"}`}
    >
      {/* Mobile: Stack layout, Desktop: Split layout */}
      <div
        className={`${isMobile ? "flex flex-col" : "absolute inset-0 flex"}`}
      >
        {/* Image Panel */}
        <div
          ref={imageRef}
          className={`${isMobile ? "w-full h-[50vh]" : "absolute left-0 top-0 w-[56vw] h-full"} overflow-hidden`}
        >
          <img
            src="/website/hero_team_office.jpg"
            alt="Devika Systems Team"
            className="w-full h-full object-cover image-grade"
          />
          <div className="absolute inset-0 bg-linear-to-r from-transparent to-devika-bg/20" />
        </div>

        {/* Hairline Divider - Desktop only */}
        {!isMobile && (
          <div className="absolute left-[56vw] top-[10vh] h-[80vh] w-px hairline" />
        )}

        {/* Content Area */}
        <div
          ref={contentRef}
          className={`${isMobile ? "w-full px-6 py-12" : "absolute left-[56vw] top-0 w-[44vw] h-full flex flex-col justify-center px-[6vw]"}`}
        >
          {/* Micro Label */}
          <span
            ref={labelRef}
            className="font-mono-label text-devika-text-secondary mb-4 md:mb-6"
          >
            UK Managed IT Services
          </span>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-hero font-semibold text-devika-text mb-6 md:mb-8 leading-[0.95]"
          >
            <span className="word inline-block">IT</span>{" "}
            <span className="word inline-block">services</span>{" "}
            <span className="word inline-block">built</span>{" "}
            <span className="word inline-block">around</span>{" "}
            <span className="word inline-block">your</span>{" "}
            <span className="word inline-block">business.</span>
          </h1>

          <p
            ref={subheadRef}
            className="text-base md:text-lg text-devika-text-secondary max-w-full md:max-w-[30vw] mb-8 md:mb-10 leading-relaxed"
          >
            Managed IT, cloud, security and support—reliable, scalable, and
            proactive.
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <button
              onClick={() => scrollToSection("#contact")}
              className="btn-primary flex items-center gap-2 group w-full sm:w-auto justify-center"
            >
              Book a discovery call
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
