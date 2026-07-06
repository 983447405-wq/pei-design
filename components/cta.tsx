import Link from "next/link";
import { Github, Mail, PenLine } from "lucide-react";
import { dictionary } from "@/content/dictionary";
import { profile } from "@/content/profile";
import { localizedPath, type Locale } from "@/lib/i18n";

const socialIcon = {
  Email: Mail,
  GitHub: Github,
  Blog: PenLine
};

export function ContactCTA({ locale }: { locale: Locale }) {
  const dict = dictionary[locale];

  return (
    <section className="shell relative z-10 pb-20 md:pb-32">
      <div className="liquid-glass motion-card relative overflow-hidden rounded-3xl px-8 py-16 text-center md:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(600px circle at 50% 0%, rgba(255,255,255,0.15), transparent 70%)" }}
        />
        <div className="relative z-10">
          <div className="mx-auto max-w-3xl">
            <p className="portfolio-eyebrow mb-5 justify-center">Contact</p>
            <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-white md:text-6xl">
              {dict.home.ctaTitle}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/60 md:text-lg">{dict.home.ctaBody}</p>
            <a className="portfolio-button portfolio-button-primary mt-8 font-mono text-sm" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
          <div className="mt-8 flex justify-center gap-3">
            {profile.socialLinks.map((link) => {
              const Icon = socialIcon[link.label as keyof typeof socialIcon] ?? Mail;
              const className =
                "focus-ring grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition hover:bg-white/[0.08] hover:text-white";

              if (link.href.startsWith("/")) {
                return (
                  <Link aria-label={link.label} className={className} href={localizedPath(locale, link.href)} key={link.label}>
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              }

              if (link.href.startsWith("mailto:")) {
                return (
                  <a aria-label={link.label} className={className} href={link.href} key={link.label}>
                    <Icon className="h-5 w-5" />
                  </a>
                );
              }

              return (
                <a aria-label={link.label} className={className} href={link.href} key={link.label} rel="noreferrer" target="_blank">
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
