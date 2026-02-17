import { useRef, useLayoutEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Menu, X, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const menuItems = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  // { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isScrolling = useRef(false);

  useLayoutEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((href: string) => {
    setMenuOpen(false);

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
          isScrolling.current = false;
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
            isScrolling.current = false;
            if (snapTrigger) snapTrigger.enable();
          },
        });
      }
    }
  }, []);

  return (
    <>
      {/* Main Navigation */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 ${
          scrolled
            ? "bg-black backdrop-blur-md border-b border-devika-text/10"
            : "bg-black"
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-[4vw] py-4">
          {/* Logo */}
          <a
            href="#"
            className="font-heading font-bold text-devika-text text-lg md:text-xl hover:text-devika-accent transition-colors"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#");
            }}
          >
            <img src="/logo.png" alt="Devika Systems" className="h-26" />
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.href)}
                className="text-devika-text-secondary hover:text-devika-text transition-colors text-lg font-semibold"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection("#contact")}
              className="hidden md:flex btn-primary text-sm items-center gap-2 group"
            >
              Start a project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-devika-text p-2"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-99 bg-devika-bg transition-all duration-300 lg:hidden ${
          menuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 pt-20">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(item.href)}
              className="font-heading text-2xl md:text-3xl text-devika-text hover:text-devika-accent transition-colors py-2"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection("#contact")}
            className="btn-primary mt-6 flex items-center gap-2 group"
          >
            Start a project
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </>
  );
}
