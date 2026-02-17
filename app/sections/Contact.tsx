import { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Mail, MapPin, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      "Thank you for your message! We will get back to you within 24 hours.",
    );
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const copy = copyRef.current;
    const form = formRef.current;
    const details = detailsRef.current;

    if (!section || !headline || !copy || !form || !details) return;

    const formFields = form.querySelectorAll(".form-field");

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headline,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headline,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Copy animation
      gsap.fromTo(
        copy,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: copy,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Form fields animation
      gsap.fromTo(
        formFields,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.5,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: form,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Details animation
      gsap.fromTo(
        details,
        { x: "6vw", opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: details,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-devika-bg z-90 py-16 md:py-[14vh] px-4 md:px-[8vw] min-h-screen"
    >
      <div className="flex flex-col lg:flex-row gap-10 md:gap-16">
        {/* Left Column - Form */}
        <div className="flex-1 max-w-full lg:max-w-[40vw]">
          {/* Headline */}
          <h2
            ref={headlineRef}
            className="font-heading text-3xl sm:text-4xl md:text-h2 font-semibold text-devika-text mb-4"
          >
            Let's build something precise.
          </h2>

          {/* Copy */}
          <p
            ref={copyRef}
            className="text-base md:text-lg text-devika-text-secondary mb-8 md:mb-10"
          >
            Tell us what you're shipping. We will reply within 24 hours.
          </p>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-5 md:space-y-6"
          >
            <div className="form-field">
              <label className="font-mono-label text-devika-text-secondary block mb-2 text-xs">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-transparent border border-devika-text/20 px-4 py-3 text-devika-text focus:border-devika-accent focus:outline-none transition-colors text-sm md:text-base"
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-field">
              <label className="font-mono-label text-devika-text-secondary block mb-2 text-xs">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-transparent border border-devika-text/20 px-4 py-3 text-devika-text focus:border-devika-accent focus:outline-none transition-colors text-sm md:text-base"
                placeholder="you@company.com"
                required
              />
            </div>

            <div className="form-field">
              <label className="font-mono-label text-devika-text-secondary block mb-2 text-xs">
                Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full bg-transparent border border-devika-text/20 px-4 py-3 text-devika-text focus:border-devika-accent focus:outline-none transition-colors text-sm md:text-base"
                placeholder="Your company"
              />
            </div>

            <div className="form-field">
              <label className="font-mono-label text-devika-text-secondary block mb-2 text-xs">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-transparent border border-devika-text/20 px-4 py-3 text-devika-text focus:border-devika-accent focus:outline-none transition-colors resize-none text-sm md:text-base"
                rows={5}
                placeholder="Tell us about your project..."
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary flex items-center gap-2 group w-full md:w-auto justify-center"
            >
              Send message
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>

        {/* Right Column - Details */}
        <div ref={detailsRef} className="lg:w-[28vw] lg:pt-[10vh]">
          <div className="space-y-6 md:space-y-8">
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-devika-accent mt-1 shrink-0" />
              <div>
                <span className="font-mono-label text-devika-text-secondary block mb-1 text-xs">
                  Email
                </span>
                <a
                  href="mailto:info@devikasystems.co.uk"
                  className="text-devika-text hover:text-devika-accent transition-colors text-sm md:text-base"
                >
                  info@devikasystems.co.uk
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-devika-accent mt-1 shrink-0" />
              <div>
                <span className="font-mono-label text-devika-text-secondary block mb-1 text-xs">
                  Location
                </span>
                <p className="text-devika-text text-sm md:text-base">
                  South Wales, UK
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 md:mt-24 pt-6 md:pt-8 border-t border-devika-text/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-devika-text text-lg md:text-xl">
              DEVIKA
            </span>
          </div>
          <p className="text-devika-text-secondary text-xs md:text-sm text-center">
            © {new Date().getFullYear()} Devika Systems Ltd. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4 md:gap-6">
            {/* <a
              href="#"
              className="text-devika-text-secondary hover:text-devika-text transition-colors text-xs md:text-sm"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-devika-text-secondary hover:text-devika-text transition-colors text-xs md:text-sm"
            >
              Terms
            </a> */}
          </div>
        </div>
      </footer>
    </section>
  );
}
