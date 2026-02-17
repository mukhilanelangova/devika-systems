import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    title: "Managed Infrastructure for Field Operations",
    category: "Managed IT & Infrastructure",
    tags: ["Managed Services", "Monitoring", "Cloud", "Security", "Support"],
    stack: {
      frontend: ["Monitoring Dashboard", "Alert Systems"],
      backend: ["Device Management", "Patch Management", "Automation"],
      infra: ["AWS", "Cloud Hosting", "Backup Systems"],
    },
    description:
      "Provided fully managed IT infrastructure, device monitoring, and secure cloud access for a nationwide field operations team.",
    keyFeatures: [
      "24/7 infrastructure monitoring",
      "Remote device management & support",
      "Automated patching and updates",
      "Secure cloud access for distributed teams",
    ],
    outcomes: [
      "Reduced IT incidents by 45%",
      "Improved system reliability and uptime",
      "Enabled seamless remote operations",
    ],
    metrics: ["99.99% uptime", "24/7 monitoring", "<5 min response"],
    image: "/website/case_fieldops.jpg",
  },

  {
    title: "Secure Cloud & IT Management for Finance Team",
    category: "Cloud Management & Security",
    tags: ["Cloud", "Security", "Managed IT", "Backup"],
    stack: {
      frontend: ["Admin Portal", "Monitoring Tools"],
      backend: ["Identity Management", "Access Control"],
      infra: ["Cloud Infrastructure", "Automated Backups", "Disaster Recovery"],
    },
    description:
      "Delivered secure cloud infrastructure, identity management, and continuous monitoring for a financial services organization.",
    keyFeatures: [
      "Secure cloud environment setup",
      "Role-based access and identity management",
      "Automated backups and disaster recovery",
      "Continuous monitoring and threat prevention",
    ],
    outcomes: [
      "Improved security posture",
      "Reduced downtime risks",
      "Ensured compliance and data protection",
    ],
    metrics: ["Zero data loss", "99.99% uptime", "24/7 protection"],
    image: "/website/case_finance.jpg",
  },

  {
    title: "Endpoint Management & IT Support for Retail Business",
    category: "Endpoint Management & Support",
    tags: ["Endpoint Management", "Remote Support", "Security", "Monitoring"],
    stack: {
      frontend: ["Support Dashboard", "Monitoring Tools"],
      backend: ["Remote Management", "Patch Automation"],
      infra: ["Endpoint Protection", "Cloud Monitoring", "Backup Systems"],
    },
    description:
      "Managed endpoints, security, and IT support for a growing retail organization, ensuring reliable and secure operations.",
    keyFeatures: [
      "Remote monitoring and management",
      "Automated security updates and patching",
      "Endpoint protection and threat detection",
      "Fast remote IT support and issue resolution",
    ],
    outcomes: [
      "Reduced support tickets by 50%",
      "Improved endpoint security",
      "Ensured uninterrupted business operations",
    ],
    metrics: ["24/7 support", "<10 min response", "100% managed endpoints"],
    image: "/website/case_ai_assistant.jpg",
  },
];

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const caseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const caseElements = caseRefs.current.filter(
      (el): el is HTMLDivElement => el !== null,
    );

    if (!section || !header || caseElements.length === 0) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Case cards animation
      caseElements.forEach((caseEl) => {
        const image = caseEl.querySelector(".case-image");
        const panel = caseEl.querySelector(".case-panel");
        const title = caseEl.querySelector(".case-title");
        const metrics = caseEl.querySelectorAll(".case-metric");
        const imgElement = caseEl.querySelector(".case-image img");

        if (!image || !panel || !title) return;

        gsap.fromTo(
          image,
          { x: "-12vw", opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: caseEl,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );

        gsap.fromTo(
          panel,
          { x: "12vw", opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: caseEl,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );

        gsap.fromTo(
          title,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: caseEl,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );

        gsap.fromTo(
          metrics,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: caseEl,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // Parallax on image (desktop only)
        if (imgElement && window.innerWidth >= 1024) {
          gsap.fromTo(
            imgElement,
            { y: -18 },
            {
              y: 18,
              ease: "none",
              scrollTrigger: {
                trigger: caseEl,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-devika-bg z-40 py-16 md:py-[10vh] px-4 md:px-[8vw]"
    >
      {/* Header */}
      <div ref={headerRef} className="mb-10 md:mb-16">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-h2 font-semibold text-devika-text mb-4">
          Selected work.
        </h2>
        <p className="text-base md:text-lg text-devika-text-secondary max-w-full md:max-w-[52vw]">
          A few recent builds—designed for clarity, engineered for scale.
        </p>
      </div>

      {/* Case Cards */}
      <div className="space-y-16 md:space-y-24">
        {cases.map((caseItem, idx) => (
          <div
            key={idx}
            ref={(el) => {
              caseRefs.current[idx] = el;
            }}
            className="flex flex-col lg:flex-row gap-6 md:gap-8 min-h-auto lg:min-h-[72vh]"
          >
            {/* Image */}
            <div className="case-image relative w-full lg:w-[58vw] h-[35vh] md:h-[50vh] lg:h-[72vh] overflow-hidden">
              <img
                src={caseItem.image}
                alt={caseItem.title}
                className="w-full h-full object-cover image-grade scale-110"
              />
            </div>

            {/* Info Panel */}
            <div className="case-panel w-full lg:w-[34vw] flex flex-col justify-center lg:min-h-[72vh]">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {caseItem.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="font-mono-label text-devika-text-secondary px-2 md:px-3 py-1 border border-devika-text-secondary/20 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="case-title font-heading text-2xl sm:text-3xl md:text-h3 font-semibold text-devika-text mb-4">
                {caseItem.title}
              </h3>

              {/* Description */}
              <p className="text-devika-text-secondary mb-6 leading-relaxed text-sm md:text-base">
                {caseItem.description}
              </p>

              {/* Metrics */}
              <div className="flex flex-wrap gap-4 md:gap-8 mb-6 md:mb-8">
                {caseItem.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="case-metric">
                    <span className="font-mono text-xs md:text-sm text-devika-accent">
                      {metric}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
