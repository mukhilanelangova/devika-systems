import {
  useRef,
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  "Managed IT services & proactive support",
  "24/7 monitoring & alerting",
  "Endpoint management & device monitoring",
  "Remote IT support & troubleshooting",
  "Cloud infrastructure management",
  "Microsoft 365 & workspace administration",
  "Identity & access management",
  "Network setup & management",
  "Backup & disaster recovery",
  "Patch management & system updates",
  "Endpoint security & threat protection",
  "Firewall & network security management",
  "IT infrastructure setup & maintenance",
  "IT consulting & technology planning",
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
          scrollTo: { y: element, offsetY: 150 },
          ease: "power2.inOut",
          onComplete: () => {
            if (snapTrigger) snapTrigger.enable();
          },
        });
      }
    }
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const list = listRef.current;
    const cta = ctaRef.current;

    if (!section || !image || !content || !headline || !body || !list || !cta)
      return;

    const listItems = list.querySelectorAll("li");

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile: Simple fade-in animations
        gsap.fromTo(
          content,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );

        gsap.fromTo(
          image,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          },
        );
      } else {
        // Desktop: Pinned scroll animation
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=130%",
            pin: true,
            scrub: 0.5,
          },
        });

        scrollTl
          .fromTo(
            image,
            { x: "60vw", opacity: 0 },
            { x: 0, opacity: 1, ease: "none" },
            0,
          )
          .fromTo(
            content,
            { x: "-40vw", opacity: 0 },
            { x: 0, opacity: 1, ease: "none" },
            0,
          )
          .fromTo(
            headline,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, ease: "none" },
            0.05,
          )
          .fromTo(
            listItems,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.015, ease: "none" },
            0.1,
          )
          .fromTo(
            cta,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, ease: "none" },
            0.18,
          );

        scrollTl
          .fromTo(
            headline,
            { x: 0, opacity: 1 },
            { x: "-12vw", opacity: 0.25, ease: "power2.in" },
            0.7,
          )
          .fromTo(
            [body, list, cta],
            { x: 0, opacity: 1 },
            { x: "-8vw", opacity: 0.2, ease: "power2.in" },
            0.72,
          )
          .fromTo(
            image,
            { x: 0, opacity: 1 },
            { x: "16vw", opacity: 0.35, ease: "power2.in" },
            0.7,
          );
      }
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className={`relative bg-devika-bg z-50 ${isMobile ? "py-40" : "section-pinned"}`}
    >
      <div
        className={`${isMobile ? "flex flex-col" : "absolute inset-0 flex"}`}
      >
        {/* Content Area */}
        <div
          ref={contentRef}
          className={`${isMobile ? "w-full px-6 py-12 order-2" : "absolute left-0 top-0 w-[44vw] h-full flex flex-col justify-center px-[8vw]"}`}
        >
          {/* Headline */}
          <h2
            ref={headlineRef}
            className="font-heading text-3xl sm:text-4xl md:text-h2 font-semibold text-devika-text mb-6 leading-none"
          >
            Modern stacks.
            <br />
            Real-world results.
          </h2>

          {/* Body */}
          <p
            ref={bodyRef}
            className="text-base md:text-lg text-devika-text-secondary max-w-full md:max-w-[30vw] mb-6 md:mb-8 leading-relaxed"
          >
            We choose tools for speed, security, and long-term maintainability.
          </p>

          {/* Capability List */}
          <ul
            ref={listRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 mb-8 md:mb-10"
          >
            {capabilities.map((cap, index) => (
              <li key={index} className="flex items-center gap-2 md:gap-3">
                <div className="w-1.5 h-1.5 bg-devika-accent shrink-0" />
                <span className="text-devika-text text-sm">{cap}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            ref={ctaRef}
            onClick={() => scrollToSection("#contact")}
            className="btn-secondary w-fit flex items-center gap-2 group"
          >
            Request a tech review
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Hairline Divider - Desktop only */}
        {!isMobile && (
          <div className="absolute left-[44vw] top-[10vh] h-[80vh] w-px hairline" />
        )}

        {/* Image Panel */}
        <div
          ref={imageRef}
          className={`${isMobile ? "w-full h-[40vh] order-1" : "absolute left-[44vw] top-0 w-[56vw] h-full"} overflow-hidden`}
        >
          <img
            src="/website/capabilities_coding_screen.jpg"
            alt="Code Development"
            className="w-full h-full object-cover image-grade"
          />
        </div>
      </div>
    </section>
  );
}
