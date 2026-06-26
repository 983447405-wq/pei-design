import { AnimatePresence, motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useMemo, useState } from "react";
import { filters, projects } from "../data/projects.js";
import ProjectModal from "./ProjectModal.jsx";
import SectionReveal from "./SectionReveal.jsx";

export default function Work() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <SectionReveal id="work" className="relative px-5 py-24 md:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase text-clay">Selected Work</p>
            <div className="flex items-center gap-5">
              <h2 className="font-display text-6xl leading-none md:text-8xl">Selected Work</h2>
              <span className="hidden h-px flex-1 bg-ink/25 md:block" aria-hidden="true" />
            </div>
          </div>

          <div className="flex flex-wrap justify-start gap-4 lg:justify-end" aria-label="Project filters">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`relative px-1 py-2 text-sm transition ${
                  activeFilter === filter ? "font-bold text-ink" : "font-medium text-smoke hover:text-ink"
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-ink transition-all duration-300 ${
                    activeFilter === filter ? "w-full" : "w-0"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={() => setSelectedProject(project)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </SectionReveal>
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      transition={{ duration: 0.42, ease: "easeOut" }}
      className="group overflow-hidden rounded-lg border border-ink/10 bg-porcelain shadow-soft"
    >
      <button type="button" className="block w-full text-left" onClick={onOpen} aria-label={`Open ${project.title}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-line">
          <motion.img
            src={project.hero}
            alt={`${project.title} project thumbnail`}
            className="h-full w-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.05]"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-end justify-between bg-black/0 p-5 opacity-0 transition duration-300 group-hover:bg-black/60 group-hover:opacity-100">
            <div className="text-paper">
              <h3 className="text-2xl font-semibold">{project.title}</h3>
              <p className="mt-1 text-sm text-paper/75">{project.category}</p>
            </div>
            <span className="grid h-12 w-12 place-items-center rounded-full bg-paper text-ink">
              <Eye size={20} aria-hidden="true" />
            </span>
          </div>
        </div>
        <div className="flex items-start justify-between gap-5 p-5">
          <div>
            <p className="text-xs font-semibold uppercase text-clay">{project.category}</p>
            <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
          </div>
          <span className="text-sm text-smoke">{project.year}</span>
        </div>
      </button>
    </motion.article>
  );
}
