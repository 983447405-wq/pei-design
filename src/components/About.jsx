import { motion } from "framer-motion";
import { Download } from "lucide-react";
import portrait from "../assets/profile/designer-portrait.png";
import SectionReveal from "./SectionReveal.jsx";

const timeline = [
  { year: "2026", title: "Independent Art Director", company: "Elena Vale Studio" },
  { year: "2023", title: "Senior Product Designer", company: "Northstar Labs" },
  { year: "2020", title: "Visual Designer", company: "Field & Form" },
];

export default function About() {
  return (
    <SectionReveal id="about" className="px-5 py-24 md:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <motion.div
          className="relative mx-auto w-full max-w-md"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute -inset-5 border border-ink/15" aria-hidden="true" />
          <img
            src={portrait}
            alt="Stylized portrait of designer Elena Vale"
            className="relative aspect-[4/5] w-full rounded-lg border border-ink/10 object-cover shadow-lift"
            loading="lazy"
          />
        </motion.div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase text-clay">About Me</p>
          <h2 className="font-display text-6xl leading-none md:text-8xl">About Me</h2>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-smoke md:text-xl">
            I work where brand systems meet product behavior. My practice is built on clear hierarchy,
            emotionally precise art direction, and interfaces that make complex ideas feel unusually easy
            to understand.
          </p>
          <p className="mt-5 max-w-2xl leading-8 text-smoke">
            Over the last seven years I have partnered with founders, editors, cultural institutions, and
            product teams to turn early concepts into identities, launch systems, and durable digital
            experiences.
          </p>

          <ol className="mt-10 space-y-7 border-l border-ink/15">
            {timeline.map((item, index) => (
              <motion.li
                key={`${item.year}-${item.title}`}
                className="relative grid gap-1 pl-7"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.65 }}
                transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
              >
                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-clay" aria-hidden="true" />
                <time className="text-sm font-semibold text-clay">{item.year}</time>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-smoke">{item.company}</p>
              </motion.li>
            ))}
          </ol>

          <a
            href="/Elena-Vale-CV.pdf"
            className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full border border-ink px-6 py-4 text-sm font-semibold"
          >
            <span className="absolute inset-x-0 bottom-0 h-0 bg-ink transition-all duration-300 group-hover:h-full" />
            <Download size={18} className="relative z-10 transition-colors group-hover:text-paper" aria-hidden="true" />
            <span className="relative z-10 transition-colors group-hover:text-paper">Download CV</span>
          </a>
        </div>
      </div>
    </SectionReveal>
  );
}
