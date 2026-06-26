import { motion } from "framer-motion";
import { Clapperboard, Palette, PanelsTopLeft } from "lucide-react";
import SectionReveal from "./SectionReveal.jsx";

const services = [
  {
    title: "Brand Identity",
    text: "Naming, identity systems, launch art direction, and brand guidelines with a point of view.",
    icon: Palette,
  },
  {
    title: "UI/UX Design",
    text: "Product strategy, interaction models, responsive interfaces, and design systems for digital teams.",
    icon: PanelsTopLeft,
  },
  {
    title: "Motion Graphics",
    text: "Motion principles, interface animation, campaign loops, and storyboards for expressive launches.",
    icon: Clapperboard,
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Services() {
  return (
    <SectionReveal id="services" className="px-5 py-20 md:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase text-clay">What I Do</p>
            <h2 className="font-display text-6xl leading-none md:text-8xl">What I Do</h2>
          </div>
          <p className="max-w-md leading-7 text-smoke">
            Compact, senior-level support for teams that need a sharper visual system and a more useful product experience.
          </p>
        </div>

        <motion.div
          className="grid gap-5 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.28 }}
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                className="group rounded-lg border border-ink/10 bg-porcelain p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift"
                variants={item}
              >
                <div className="mb-12 grid h-14 w-14 place-items-center rounded-full bg-ink text-paper transition duration-300 group-hover:rotate-[15deg] group-hover:scale-110 group-hover:bg-clay">
                  <Icon size={24} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold">{service.title}</h3>
                <p className="mt-4 leading-7 text-smoke">{service.text}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </SectionReveal>
  );
}
