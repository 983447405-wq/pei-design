import type { Metadata } from "next";
import Link from "next/link";
import { Github, Mail, PenLine, Sparkles } from "lucide-react";
import { dictionary } from "@/content/dictionary";
import { profile } from "@/content/profile";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "zh";
  return {
    title: dictionary[locale].nav.contact,
    description: dictionary[locale].contact.subtitle
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "zh") as Locale;
  const dict = dictionary[locale];
  const socialIcon = {
    Email: Mail,
    GitHub: Github,
    Blog: PenLine
  };

  return (
    <main className="shell grid min-h-[calc(100svh-4rem)] items-center py-16">
      <section className="glass gradient-border motion-rise overflow-hidden rounded-2xl p-8 md:p-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-blue">Contact</p>
            <h1 className="text-balance text-4xl font-semibold tracking-[-0.055em] text-text md:text-6xl">{dict.contact.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{dict.contact.subtitle}</p>
            <div className="mt-8">
              <a
                className="focus-ring motion-sheen inline-flex items-center gap-2 rounded-md bg-text px-5 py-3 text-sm font-semibold text-ink transition hover:bg-blue"
                href={`mailto:${site.email}`}
              >
                <Mail className="h-4 w-4" />
                {dict.contact.emailLabel}
              </a>
            </div>
            <p className="mt-6 font-mono text-xs text-muted">{profile.email}</p>
            <div className="mt-8 flex gap-3">
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
          <div className="rounded-xl border border-line bg-panel p-5">
            <Sparkles className="mb-8 h-6 w-6 text-blue" />
            <div className="grid gap-3">
              {profile.contactOptions[locale].map((option) => (
                <div className="rounded-lg border border-line bg-ink/40 p-4 text-muted" key={option}>
                  {option}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
