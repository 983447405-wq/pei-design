import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 28, stiffness: 420, mass: 0.4 });
  const springY = useSpring(cursorY, { damping: 28, stiffness: 420, mass: 0.4 });
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const updateEnabled = () => setIsEnabled(media.matches);

    updateEnabled();
    media.addEventListener("change", updateEnabled);

    return () => media.removeEventListener("change", updateEnabled);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("has-custom-cursor", isEnabled);

    if (!isEnabled) return undefined;

    const moveCursor = (event) => {
      cursorX.set(event.clientX - 16);
      cursorY.set(event.clientY - 16);
    };

    const interactiveElements = Array.from(
      document.querySelectorAll("a, button, input, textarea, [data-cursor-grow]"),
    );
    const enter = () => setIsHovering(true);
    const leave = () => setIsHovering(false);

    window.addEventListener("pointermove", moveCursor);
    interactiveElements.forEach((element) => {
      element.addEventListener("pointerenter", enter);
      element.addEventListener("pointerleave", leave);
    });

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", moveCursor);
      interactiveElements.forEach((element) => {
        element.removeEventListener("pointerenter", enter);
        element.removeEventListener("pointerleave", leave);
      });
    };
  }, [cursorX, cursorY, isEnabled]);

  if (!isEnabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-8 w-8 rounded-full border border-ink/70 mix-blend-difference lg:block"
      style={{ x: springX, y: springY }}
      animate={{
        scale: isHovering ? 1.9 : 1,
        backgroundColor: isHovering ? "rgba(247, 240, 230, 0.38)" : "rgba(247, 240, 230, 0)",
      }}
      transition={{ duration: 0.18 }}
      aria-hidden="true"
    >
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper" />
    </motion.div>
  );
}
