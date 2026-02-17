import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  { initials: "JD", name: "James Davies" },
  { initials: "SM", name: "Sarah Mitchell" },
  { initials: "AK", name: "Alex Kumar" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const avatarsRef = useRef<HTMLDivElement>(null);
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
    const body = bodyRef.current;
    const avatars = avatarsRef.current;
    const cta = ctaRef.current;

    if (
      !section ||
      !image ||
      !content ||
      !headline ||
      !body ||
      !avatars ||
      !cta
    )
      return;

    const avatarElements = avatars.querySelectorAll(".avatar");

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
            body,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, ease: "none" },
            0.08,
          )
          .fromTo(
            avatarElements,
            { scale: 0.85, opacity: 0 },
            { scale: 1, opacity: 1, stagger: 0.02, ease: "none" },
            0.1,
          )
          .fromTo(
            cta,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, ease: "none" },
            0.15,
          );

        scrollTl
          .fromTo(
            [headline, body],
            { y: 0, opacity: 1 },
            { y: "-10vh", opacity: 0.25, ease: "power2.in" },
            0.7,
          )
          .fromTo(
            avatars,
            { y: 0, opacity: 1 },
            { y: "6vh", opacity: 0.2, ease: "power2.in" },
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
      className={`relative bg-devika-bg z-60 ${isMobile ? "py-20" : "section-pinned"}`}
    >
      <div
        className={`${isMobile ? "flex flex-col" : "absolute inset-0 flex"}`}
      >
        {/* Image Panel */}
        <div
          ref={imageRef}
          className={`${isMobile ? "w-full h-[40vh]" : "absolute left-0 top-0 w-[56vw] h-full"} overflow-hidden`}
        >
          <img
            src="/website/about_team_portrait.jpg"
            alt="Devika Team"
            className="w-full h-full object-cover image-grade"
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
            className="font-heading text-3xl sm:text-4xl md:text-h2 font-semibold text-devika-text mb-6 leading-none"
          >
            Built by a small team with big standards.
          </h2>

          {/* Body */}
          <p
            ref={bodyRef}
            className="text-base md:text-lg text-devika-text-secondary max-w-full md:max-w-[32vw] mb-8 md:mb-10 leading-relaxed"
          >
            We're a UK-based studio partnering with founders, product teams and
            operators who want clarity, speed, and craft.
          </p>

          {/* Team Avatars */}
          <div ref={avatarsRef} className="mb-8 md:mb-10">
            <span className="font-mono-label text-devika-text-secondary block mb-4">
              Meet the team
            </span>
            <div className="flex items-center">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="avatar w-12 h-12 md:w-14 md:h-14 rounded-full border border-devika-text/20 flex items-center justify-center bg-devika-bg -ml-3 first:ml-0"
                  style={{ zIndex: teamMembers.length - index }}
                  title={member.name}
                >
                  <span className="font-mono text-xs md:text-sm text-devika-text">
                    {member.initials}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            ref={ctaRef}
            className="btn-secondary w-fit flex items-center gap-2 group"
          >
            Learn more about us
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
