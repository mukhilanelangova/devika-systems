import { useRef, useLayoutEffect, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Search, ShieldCheck, Headphones, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Assess & plan",
    description: "Audit your IT environment, identify risks, and build a tailored roadmap.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Onboard & secure",
    description: "Deploy monitoring agents, configure security tools, and document your infrastructure.",
  },
  {
    number: "03",
    icon: Headphones,
    title: "Monitor & support",
    description: "24/7 proactive monitoring, rapid incident response, and remote helpdesk support.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Review & optimise",
    description: "Quarterly reviews, patch management, and strategic IT planning to keep you ahead.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
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

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const headline = headlineRef.current;
    const stepElements = stepsRef.current.filter(
      (el): el is HTMLDivElement => el !== null,
    );
    const cta = ctaRef.current;

    if (
      !section ||
      !image ||
      !content ||
      !headline ||
      stepElements.length === 0 ||
      !cta
    )
      return;

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile: Simple fade-in animations
        gsap.fromTo(
          image,
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
          content,
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
            { x: "-60vw", opacity: 0 },
            { x: 0, opacity: 1, ease: "none" },
            0,
          )
          .fromTo(
            content,
            { x: "40vw", opacity: 0 },
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
            stepElements,
            { x: "10vw", opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.02, ease: "none" },
            0.08,
          )
          .fromTo(
            cta,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, ease: "none" },
            0.15,
          );

        scrollTl
          .fromTo(
            headline,
            { y: 0, opacity: 1 },
            { y: "-10vh", opacity: 0.25, ease: "power2.in" },
            0.7,
          )
          .fromTo(
            stepElements,
            { y: 0, opacity: 1 },
            { y: "8vh", opacity: 0.2, ease: "power2.in" },
            0.72,
          )
          .fromTo(
            image,
            { x: 0, opacity: 1 },
            { x: "-14vw", opacity: 0.35, ease: "power2.in" },
            0.7,
          )
          .fromTo(
            cta,
            { opacity: 1 },
            { opacity: 0.2, ease: "power2.in" },
            0.75,
          );
      }
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className={`relative bg-devika-bg z-30 ${isMobile ? "py-20" : "section-pinned"}`}
    >
      <div
        className={`${isMobile ? "flex flex-col" : "absolute inset-0 flex"}`}
      >
        {/* Image Panel */}
        <div
          ref={imageRef}
          className={`${isMobile ? "relative w-full h-[40vh]" : "absolute left-0 top-0 w-[56vw] h-full"} overflow-hidden`}
        >
          <Image
            fill
            src="/website/process_meeting_table.jpg"
            alt="Devika Systems IT onboarding and service review meeting"
            className="object-cover image-grade"
            sizes="(max-width: 1024px) 100vw, 56vw"
          />
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
          {/* Headline */}
          <h2
            ref={headlineRef}
            className="font-heading text-3xl sm:text-4xl md:text-h2 font-semibold text-devika-text mb-8 md:mb-10 leading-none"
          >
            How we deliver.
          </h2>

          {/* Process Steps */}
          <div className="space-y-5 md:space-y-6 mb-8 md:mb-10">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  stepsRef.current[index] = el;
                }}
                className="flex items-start gap-3 md:gap-4"
              >
                <span className="font-mono text-xs md:text-sm text-devika-text-secondary opacity-90 mt-1">
                  {step.number}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 md:gap-3 mb-1">
                    <step.icon className="w-4 h-4 text-devika-accent" />
                    <h3 className="font-heading text-base md:text-lg font-semibold text-devika-text">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-devika-text-secondary text-sm ml-6 md:ml-7">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
