import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    name: "Project Sprint",
    price: "From £18k",
    description: "Discovery + MVP in 8-10 weeks.",
    features: [
      "Full discovery & scoping",
      "UX/UI design",
      "MVP development",
      "2 weeks post-launch support",
    ],
    featured: false,
  },
  {
    name: "Retained Team",
    price: "From £6.5k/mo",
    description: "Design + dev support each month.",
    features: [
      "Dedicated team",
      "Unlimited revisions",
      "Priority support",
      "Monthly strategy calls",
      "Continuous improvements",
    ],
    featured: true,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const packagesRef = useRef<(HTMLDivElement | null)[]>([]);
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
    const packageElements = packagesRef.current.filter(
      (el): el is HTMLDivElement => el !== null,
    );
    const cta = ctaRef.current;

    if (
      !section ||
      !image ||
      !content ||
      !headline ||
      !body ||
      packageElements.length === 0 ||
      !cta
    )
      return;

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
            packageElements,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.03, ease: "none" },
            0.1,
          )
          .fromTo(
            cta,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, ease: "none" },
            0.16,
          );

        scrollTl
          .fromTo(
            [headline, ...packageElements],
            { x: 0, opacity: 1 },
            { x: "-10vw", opacity: 0.25, ease: "power2.in" },
            0.7,
          )
          .fromTo(
            image,
            { x: 0, opacity: 1 },
            { x: "16vw", opacity: 0.35, ease: "power2.in" },
            0.7,
          )
          .fromTo(
            [body, cta],
            { opacity: 1 },
            { opacity: 0.2, ease: "power2.in" },
            0.72,
          );
      }
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className={`relative bg-devika-bg z-80 ${isMobile ? "py-20" : "section-pinned"}`}
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
            className="font-heading text-3xl sm:text-4xl md:text-h2 font-semibold text-devika-text mb-4 leading-none"
          >
            Pricing that scales with you.
          </h2>

          {/* Body */}
          <p
            ref={bodyRef}
            className="text-base md:text-lg text-devika-text-secondary max-w-full md:max-w-[30vw] mb-6 md:mb-8 leading-relaxed"
          >
            Fixed scopes or retained teams—predictable budgets, no surprises.
          </p>

          {/* Packages */}
          <div className="space-y-4 mb-6 md:mb-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                ref={(el) => {
                  packagesRef.current[index] = el;
                }}
                className={`border p-4 md:p-5 ${pkg.featured ? "border-t-2 border-t-devika-accent border-devika-text/20" : "border-devika-text/10"}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-heading font-semibold text-devika-text text-base md:text-lg">
                    {pkg.name}
                  </h3>
                  <span className="font-mono text-sm text-devika-accent">
                    {pkg.price}
                  </span>
                </div>
                <p className="text-devika-text-secondary text-sm mb-4">
                  {pkg.description}
                </p>
                <ul className="space-y-2">
                  {pkg.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-center gap-2 text-sm text-devika-text"
                    >
                      <Check className="w-4 h-4 text-devika-accent shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            ref={ctaRef}
            className="btn-primary w-fit flex items-center gap-2 group"
          >
            Get a detailed quote
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
            src="/website/pricing_workspace_wide.jpg"
            alt="Modern Workspace"
            className="w-full h-full object-cover image-grade"
          />
        </div>
      </div>
    </section>
  );
}
