import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const drawerVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 260,
      staggerChildren: 0.06,
      delayChildren: 0.12,
    },
  },
  exit: { x: "100%", transition: { duration: 0.28, ease: [0.76, 0, 0.24, 1] } },
};

const linkVariants = {
  hidden: { opacity: 0, x: 26 },
  visible: { opacity: 1, x: 0 },
};

export default function Navbar({ sections, activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "border-b border-ink/10 bg-porcelain/76 shadow-soft backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8" aria-label="Primary">
        <a href="#home" className="group flex items-center gap-3" aria-label="Elena Vale home">
          <span className="grid h-10 w-10 place-items-center border border-ink bg-ink font-display text-2xl italic text-paper transition-transform duration-300 group-hover:rotate-6">
            E
          </span>
          <span className="hidden text-sm font-semibold uppercase sm:block">Elena Vale</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="group relative px-4 py-3 text-sm font-medium text-ink/72 transition-colors hover:text-ink"
            >
              {section.label}
              <span
                className={`absolute bottom-2 left-4 h-px bg-ink transition-all duration-300 ${
                  activeSection === section.id ? "w-[calc(100%-2rem)]" : "w-0 group-hover:w-[calc(100%-2rem)]"
                }`}
              />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper shadow-soft transition hover:scale-[1.03] hover:bg-clay hover:shadow-lift md:inline-flex"
        >
          Start a Project
        </a>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 bg-porcelain/70 md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.button
              className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm md:hidden"
              aria-label="Close menu overlay"
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-50 flex h-dvh w-[84vw] max-w-sm flex-col justify-between bg-ink p-6 text-paper shadow-lift md:hidden"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl italic">E</span>
                <button
                  type="button"
                  className="grid h-11 w-11 place-items-center rounded-full border border-paper/25"
                  aria-label="Close menu"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid gap-3">
                {sections.map((section) => (
                  <motion.a
                    key={section.id}
                    href={`#${section.id}`}
                    className="border-b border-paper/12 py-4 font-display text-5xl"
                    variants={linkVariants}
                    onClick={() => setIsOpen(false)}
                  >
                    {section.label}
                  </motion.a>
                ))}
              </div>

              <motion.a
                href="mailto:hello@elenavale.studio"
                className="rounded-full bg-paper px-5 py-3 text-center text-sm font-semibold text-ink"
                variants={linkVariants}
              >
                hello@elenavale.studio
              </motion.a>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
