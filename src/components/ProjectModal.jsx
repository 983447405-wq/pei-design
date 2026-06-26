import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProjectModal({ project, onClose }) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, project]);

  if (!project) return null;

  const images = [project.hero, ...project.gallery];
  const move = (direction) => {
    setActiveImage((current) => (current + direction + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] grid place-items-center bg-ink/45 p-4 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={onClose}
        role="presentation"
      >
        <motion.div
          className="relative max-h-[92dvh] w-full max-w-5xl overflow-y-auto rounded-lg bg-porcelain text-ink shadow-lift"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onMouseDown={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-ink text-paper transition hover:scale-105"
            aria-label="Close project detail"
            onClick={onClose}
          >
            <X size={20} aria-hidden="true" />
          </button>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="bg-ink/5 p-4 md:p-6">
              <div className="relative overflow-hidden rounded-lg border border-ink/10 bg-paper">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={images[activeImage]}
                    src={images[activeImage]}
                    alt={`${project.title} gallery image ${activeImage + 1}`}
                    className="aspect-[4/3] w-full object-cover"
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.28 }}
                  />
                </AnimatePresence>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-porcelain transition hover:border-ink"
                  aria-label="Previous project image"
                  onClick={() => move(-1)}
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                </button>

                <div className="flex gap-2 overflow-x-auto" aria-label="Project gallery thumbnails">
                  {images.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      className={`h-14 w-20 shrink-0 overflow-hidden rounded border transition ${
                        activeImage === index ? "border-ink" : "border-ink/10 opacity-60 hover:opacity-100"
                      }`}
                      aria-label={`Show image ${index + 1}`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img src={image} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-porcelain transition hover:border-ink"
                  aria-label="Next project image"
                  onClick={() => move(1)}
                >
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="p-7 md:p-10">
              <p className="text-sm font-semibold uppercase text-clay">{project.category}</p>
              <h2 id="project-modal-title" className="mt-4 font-display text-6xl leading-none">
                {project.title}
              </h2>
              <p className="mt-6 text-lg leading-8 text-smoke">{project.description}</p>

              <dl className="mt-9 grid grid-cols-2 gap-5 border-t border-ink/10 pt-7">
                <div>
                  <dt className="text-xs font-semibold uppercase text-smoke">Client</dt>
                  <dd className="mt-2 font-semibold">{project.client}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase text-smoke">Year</dt>
                  <dd className="mt-2 font-semibold">{project.year}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-xs font-semibold uppercase text-smoke">Role</dt>
                  <dd className="mt-2 font-semibold">{project.role}</dd>
                </div>
              </dl>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
