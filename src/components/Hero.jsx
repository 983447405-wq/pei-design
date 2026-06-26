import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

const words = "I design experiences that matter".split(" ");

const wordContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.25,
    },
  },
};

const wordItem = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-dvh items-center overflow-hidden px-5 pb-20 pt-28 md:px-8 lg:pt-24"
      aria-labelledby="hero-title"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-4xl">
          <motion.p
            className="mb-7 text-sm font-semibold uppercase text-clay"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            Freelance Designer & Art Director
          </motion.p>

          <motion.h1
            id="hero-title"
            className="flex flex-wrap gap-x-4 gap-y-1 font-display text-[clamp(4.1rem,10vw,8.75rem)] leading-[0.86] text-ink md:gap-x-6"
            variants={wordContainer}
            initial="hidden"
            animate="visible"
          >
            {words.map((word) => (
              <motion.span key={word} className="inline-block overflow-hidden pb-2" variants={wordItem}>
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="mt-8 max-w-xl text-lg leading-8 text-smoke md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.5, ease: "easeOut" }}
          >
            I shape identities, interfaces, and motion systems for culture-led brands and ambitious digital products.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.68, ease: "easeOut" }}
          >
            <a
              href="#work"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-paper shadow-soft transition duration-300 hover:scale-[1.03] hover:bg-clay hover:shadow-lift"
            >
              View My Work
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-ink/20 px-7 py-4 text-sm font-semibold text-ink transition duration-300 hover:border-ink hover:bg-porcelain"
            >
              Contact
            </a>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto aspect-square w-full max-w-[34rem]"
          initial={{ opacity: 0, scale: 0.92, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-[7%] border border-ink/20"
            animate={{ rotate: 360, opacity: [0.65, 0.35, 0.65] }}
            transition={{ rotate: { duration: 24, repeat: Infinity, ease: "linear" }, opacity: { duration: 5, repeat: Infinity } }}
          />
          <motion.div
            className="absolute inset-[16%] bg-clay/90 shadow-lift"
            style={{ clipPath: "polygon(50% 0%, 92% 24%, 84% 76%, 50% 100%, 8% 76%, 16% 24%)" }}
            animate={{ rotate: -360, opacity: [0.82, 0.58, 0.82] }}
            transition={{ rotate: { duration: 28, repeat: Infinity, ease: "linear" }, opacity: { duration: 6, repeat: Infinity } }}
          />
          <motion.div
            className="absolute inset-[26%] bg-cedar"
            style={{ clipPath: "circle(48% at 50% 50%)" }}
            animate={{ scale: [1, 0.92, 1], opacity: [0.9, 0.68, 0.9] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute left-8 top-9 h-28 w-20 bg-paper/80 shadow-soft backdrop-blur" />
          <div className="absolute bottom-12 right-7 h-24 w-36 border border-ink/20 bg-brass/80 shadow-soft" />
          <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 bg-ink text-paper shadow-lift">
            <div className="grid h-full place-items-center font-display text-7xl italic">E</div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#work"
        className="absolute bottom-8 left-1/2 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full border border-ink/20 bg-porcelain/80 text-ink shadow-soft backdrop-blur"
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll to work"
      >
        <ArrowDown size={20} aria-hidden="true" />
      </motion.a>
    </section>
  );
}
