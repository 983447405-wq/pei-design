import { AnimatePresence, motion } from "framer-motion";
import { Dribbble, Instagram, Linkedin, Loader2, Mail, Send } from "lucide-react";
import { useState } from "react";
import SectionReveal from "./SectionReveal.jsx";

const socials = [
  { label: "Dribbble", href: "https://dribbble.com/", icon: Dribbble },
  { label: "Instagram", href: "https://instagram.com/", icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com/", icon: Linkedin },
];

export default function Contact() {
  const [isSending, setIsSending] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSending) return;

    const form = event.currentTarget;
    setIsSending(true);
    window.setTimeout(() => {
      form.reset();
      setIsSending(false);
      setShowToast(true);
      window.setTimeout(() => setShowToast(false), 2600);
    }, 1500);
  };

  return (
    <SectionReveal id="contact" className="px-5 pb-8 pt-24 md:px-8 lg:pt-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase text-clay">Contact</p>
          <h2 className="max-w-3xl font-display text-6xl leading-none md:text-8xl">Let&apos;s work together</h2>

          <form className="mt-12 grid gap-7" onSubmit={handleSubmit}>
            <Field label="Name" name="name" type="text" autoComplete="name" />
            <Field label="Email" name="email" type="email" autoComplete="email" />
            <Field label="Message" name="message" textarea />

            <button
              type="submit"
              className="inline-flex w-fit items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-paper shadow-soft transition hover:scale-[1.03] hover:bg-clay hover:shadow-lift disabled:cursor-wait disabled:opacity-70"
              disabled={isSending}
            >
              {isSending ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
              {isSending ? "Sending" : "Send Message"}
            </button>
          </form>
        </div>

        <aside className="flex flex-col justify-between gap-10 border-t border-ink/10 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
          <div>
            <p className="text-sm font-semibold uppercase text-clay">Direct</p>
            <a
              href="mailto:hello@elenavale.studio"
              className="mt-4 inline-flex items-center gap-3 text-2xl font-semibold transition hover:text-clay"
            >
              <Mail size={22} aria-hidden="true" />
              hello@elenavale.studio
            </a>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase text-clay">Social</p>
            <div className="mt-5 flex gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 bg-porcelain text-ink transition hover:border-clay hover:text-clay"
                    whileHover={{ y: [0, -5, 0], transition: { duration: 0.38 } }}
                  >
                    <Icon size={20} aria-hidden="true" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      <footer className="mx-auto mt-20 flex max-w-7xl flex-col gap-4 border-t border-ink/10 py-7 text-sm text-smoke md:flex-row md:items-center md:justify-between">
        <p>© 2026 Elena Vale Studio. All rights reserved.</p>
        <a href="#home" className="font-semibold text-ink hover:text-clay">
          Back to top
        </a>
      </footer>

      <AnimatePresence>
        {showToast ? (
          <motion.div
            className="fixed left-1/2 top-6 z-[95] -translate-x-1/2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper shadow-lift"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            role="status"
          >
            Message sent!
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SectionReveal>
  );
}

function Field({ label, name, type = "text", textarea = false, autoComplete }) {
  const inputClass =
    "peer w-full bg-transparent py-3 text-lg text-ink placeholder:text-transparent focus:outline-none";

  return (
    <label className="group relative block">
      <span className="text-sm font-semibold uppercase text-smoke">{label}</span>
      {textarea ? (
        <textarea
          name={name}
          rows="4"
          className={`${inputClass} resize-none`}
          placeholder={label}
          required
        />
      ) : (
        <input
          name={name}
          type={type}
          className={inputClass}
          placeholder={label}
          autoComplete={autoComplete}
          required
        />
      )}
      <span className="absolute bottom-0 left-0 h-px w-full bg-ink/20" aria-hidden="true" />
      <span className="absolute bottom-0 left-0 h-px w-0 bg-clay transition-all duration-300 peer-focus:w-full" aria-hidden="true" />
    </label>
  );
}
