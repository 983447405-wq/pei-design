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
    <section className="shell pb-20">
      <div className="glass gradient-border motion-card overflow-hidden rounded-2xl p-8 md:p-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-blue">Contact</p>
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.035em] text-text md:text-5xl">{dict.home.ctaTitle}</h2>
            <p className="mt-5 text-lg leading-8 text-muted">{dict.home.ctaBody}</p>
            <a className="mt-7 inline-block font-mono text-sm text-text transition hover:text-blue" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
          <div className="flex gap-3">
            {profile.socialLinks.map((link) => {
              const Icon = socialIcon[link.label as keyof typeof socialIcon] ?? Mail;
              const className =
                "focus-ring grid h-12 w-12 place-items-center rounded-full border border-line bg-panel2 text-muted transition hover:border-lineStrong hover:bg-white/[0.06] hover:text-text";

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
