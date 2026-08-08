import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, Sparkles } from "lucide-react";
import { dictionary } from "@/content/dictionary";
import { profile } from "@/content/profile";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

function WeChatIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M10.7 17.3c-.82.2-1.7.27-2.6.17L4.5 19l.92-2.58C3.92 15.3 3 13.72 3 12c0-3.04 2.82-5.5 6.3-5.5 2.5 0 4.66 1.27 5.68 3.1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M11 14.15c0-2.54 2.24-4.6 5-4.6s5 2.06 5 4.6-2.24 4.6-5 4.6c-.55 0-1.08-.08-1.57-.23L11.6 20l.72-2.12A4.43 4.43 0 0 1 11 14.15Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path d="M7.2 11h.01M11.2 11h.01M14.6 14h.01M17.7 14h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

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
    Phone
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
                  "focus-ring contact-action group relative grid h-12 w-12 place-items-center rounded-full border border-line bg-panel2 text-muted transition hover:border-lineStrong hover:bg-white/[0.06] hover:text-text";

                if (link.label === "WeChat") {
                  return (
                    <button aria-label={link.label} className={className} key={link.label} type="button">
                      <WeChatIcon className="h-6 w-6" />
                      <span className="contact-tooltip contact-tooltip-qr" role="tooltip">
                        <Image alt="WeChat QR code" height={202} src="/wechat-qr.jpg" width={160} />
                      </span>
                    </button>
                  );
                }

                if (link.label === "Phone") {
                  return (
                    <a aria-label={link.label} className={className} href={link.href} key={link.label}>
                      <Icon className="h-[22px] w-[22px]" />
                      <span className="contact-tooltip contact-tooltip-text" role="tooltip">
                        15272508556
                      </span>
                    </a>
                  );
                }

                if (link.label === "Email") {
                  return (
                    <button aria-label={link.label} className={className} key={link.label} type="button">
                      <Icon className="h-[22px] w-[22px]" />
                      <span className="contact-tooltip contact-tooltip-text" role="tooltip">
                        {profile.email}
                      </span>
                    </button>
                  );
                }

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
