import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Lock,
  Wrench,
  ShieldCheck,
  RefreshCw,
  Headphones,
  AlertTriangle,
  Wifi,
  Network,
  Router,
  Phone,
  Monitor,
  Printer,
  HardDrive,
  Clock,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  // Security & Protection
  { icon: ShieldCheck, text: "Antivirus installation & protection" },
  { icon: Lock, text: "Firewall setup & security configuration" },
  { icon: AlertTriangle, text: "Virus removal & system cleanup" },

  // Connectivity & Network
  { icon: Wifi, text: "Wi-Fi setup, extension & troubleshooting" },
  { icon: Network, text: "LAN cabling & network configuration" },
  { icon: Router, text: "Router & modem setup" },

  // Communication
  { icon: Phone, text: "Telephone & VoIP system setup" },
  { icon: Headphones, text: "Call issues & line troubleshooting" },

  // Devices & Systems
  { icon: Monitor, text: "Desktop & laptop setup" },
  { icon: Printer, text: "Printer installation & sharing" },
  { icon: HardDrive, text: "Data backup & recovery" },

  // Support & Maintenance
  { icon: Wrench, text: "On-site & remote IT support" },
  { icon: RefreshCw, text: "Regular maintenance & updates" },
  { icon: Clock, text: "Annual maintenance contracts (AMC)" },
];

export default function Services() {
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
            headline.querySelectorAll(".word"),
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.02, ease: "none" },
            0.05,
          )
          .fromTo(
            [body, list, cta],
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.03, ease: "none" },
            0.1,
          );

        scrollTl
          .fromTo(
            headline,
            { x: 0, opacity: 1 },
            { x: "-14vw", opacity: 0.25, ease: "power2.in" },
            0.7,
          )
          .fromTo(
            [body, list, cta],
            { x: 0, opacity: 1 },
            { x: "-10vw", opacity: 0.2, ease: "power2.in" },
            0.72,
          )
          .fromTo(
            image,
            { x: 0, opacity: 1 },
            { x: "18vw", opacity: 0.35, ease: "power2.in" },
            0.7,
          );
      }
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`relative bg-devika-bg z-20 ${isMobile ? "py-20" : "section-pinned"}`}
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
            className="font-heading text-3xl sm:text-4xl md:text-h2 font-semibold text-devika-text mb-6 md:mb-8 leading-none"
          >
            <span className="word inline-block">Your Everyday IT Partner</span>
          </h2>

          {/* Body */}
          <p
            ref={bodyRef}
            className="text-base md:text-lg text-devika-text-secondary max-w-full md:max-w-[30vw] mb-8 md:mb-10 leading-relaxed"
          >
            From antivirus and Wi-Fi to phones and support, we handle your IT
            end-to-end.
          </p>

          {/* Services List */}
          <ul ref={listRef} className="space-y-4 mb-8 md:mb-10">
            {services.map((service, index) => (
              <li key={index} className="flex items-center gap-4">
                <div className="w-2 h-2 bg-devika-accent shrink-0" />
                <service.icon className="w-5 h-5 text-devika-text-secondary" />
                <span className="text-devika-text text-sm md:text-base">
                  {service.text}
                </span>
              </li>
            ))}
          </ul>
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
            src="/website/services_laptop_detail.jpg"
            alt="Software Development"
            className="w-full h-full object-cover image-grade"
          />
        </div>
      </div>
    </section>
  );
}
