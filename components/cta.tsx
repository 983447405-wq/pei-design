import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { dictionary } from "@/content/dictionary";
import { profile } from "@/content/profile";
import { localizedPath, type Locale } from "@/lib/i18n";

const socialIcon = {
  Email: Mail,
  Phone
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
            <p className="portfolio-eyebrow portfolio-eyebrow-plain mb-5 justify-center">Contact</p>
            <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-white md:text-6xl">
              {dict.home.ctaTitle}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/60 md:text-lg">{dict.home.ctaBody}</p>
            <a className="portfolio-button portfolio-button-primary mt-8 inline-flex items-center gap-2 font-mono text-sm" href="tel:15272508556">
              <Phone className="h-4 w-4" />
              15272508556
            </a>
          </div>
          <div className="mt-8 flex justify-center gap-3">
            {profile.socialLinks.map((link) => {
              const Icon = socialIcon[link.label as keyof typeof socialIcon] ?? Mail;
              const className =
                "focus-ring contact-action group relative grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition hover:bg-white/[0.08] hover:text-white";

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
      </div>
    </section>
  );
}
