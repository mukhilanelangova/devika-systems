import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const partners = [
  {
    quote:
      "Devika's attention to detail is totally on point with our brief. Fast, reliable and good value. <br/> <br/>Creating solutions and delivering in one cohesive and intuitive package. <br/> <br/> Able to listen, understand and implement a brief efficiently, effectively and affordably.",
    name: "Director",
    company: "stephens Wilmot Solicitors",
  },
  {
    quote:
      "Fast, transparent, and obsessively detailed. They delivered our fintech platform ahead of schedule with zero compromises on quality.",
    name: "",
    company: "Fintech Startup",
  },
  {
    quote: "and many more...",
    // name: "Design Director",
    // company: "Retail Brand",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current.filter(
      (el): el is HTMLDivElement => el !== null,
    );

    if (!section || !title || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        title,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Cards animation
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-devika-bg z-70 py-16 md:py-[10vh] px-4 md:px-[8vw]"
    >
      {/* Title */}
      <h2
        ref={titleRef}
        className="font-heading text-3xl sm:text-4xl md:text-h2 font-semibold text-devika-text mb-8 md:mb-12"
      >
        What clients say.
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {partners.map((eachPartner, index) => (
          <div
            key={index}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="border border-devika-text/10 p-6 md:p-8 flex flex-col justify-between min-h-auto md:min-h-[34vh] hover:border-devika-text/20 transition-colors duration-300"
          >
            <div>
              <Quote className="w-6 h-6 md:w-8 md:h-8 text-devika-accent mb-4 md:mb-6 opacity-60" />
              <div className="text-devika-text leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
                <div dangerouslySetInnerHTML={{ __html: eachPartner.quote }} />
              </div>
            </div>
            <div>
              <p className="font-heading font-semibold text-devika-text text-sm md:text-base">
                {eachPartner.name}
              </p>
              <p className="font-mono-label text-devika-text-secondary mt-1 text-xs">
                {eachPartner.company}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
