import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(() => {
    try {
      return sessionStorage.getItem("portfolio-loader-seen") !== "true";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!isVisible) return undefined;

    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem("portfolio-loader-seen", "true");
      } catch {
        // Session storage can be unavailable in private browsing contexts.
      }
      setIsVisible(false);
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink text-paper"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: "-8%", transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } }}
    >
      <motion.div
        className="flex flex-col items-center gap-5"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <motion.div
          className="grid h-16 w-16 place-items-center border border-paper/40 font-display text-4xl italic"
          animate={{ rotate: [0, 0, 90, 90, 180] }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
        >
          E
        </motion.div>
        <div className="text-sm font-medium uppercase text-paper/70">Elena Vale Studio</div>
      </motion.div>
    </motion.div>
  );
}
