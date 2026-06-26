import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import Hero from "./components/Hero.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import Navbar from "./components/Navbar.jsx";
import Services from "./components/Services.jsx";
import Work from "./components/Work.jsx";

const sections = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

const sectionIds = sections.map((section) => section.id);

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const updateFromScroll = () => {
      const current = ids.reduce((latest, id) => {
        const element = document.getElementById(id);
        if (!element) return latest;
        return element.getBoundingClientRect().top <= window.innerHeight * 0.38 ? id : latest;
      }, ids[0]);

      setActive(current);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActive(visible.target.id);
        }
      },
      {
        rootMargin: "0px 0px -55% 0px",
        threshold: [0.15, 0.35, 0.55],
      },
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateFromScroll);
    };
  }, [ids]);

  return active;
}

export default function App() {
  const activeSection = useActiveSection(sectionIds);

  return (
    <div className="relative min-h-screen overflow-hidden text-ink">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-80"
        aria-hidden="true"
      >
        <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(rgba(23,20,16,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(23,20,16,0.045)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-porcelain to-transparent" />
      </div>

      <AnimatePresence mode="wait">
        <LoadingScreen />
      </AnimatePresence>

      <CustomCursor />
      <Navbar sections={sections} activeSection={activeSection} />

      <main className="relative z-10">
        <Hero />
        <Work />
        <About />
        <Services />
        <Contact />
      </main>
    </div>
  );
}
