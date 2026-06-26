import Link from "next/link";
import { defaultLocale, localizedPath } from "@/lib/i18n";

export default function RootPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-ink px-6 text-text">
      <div className="max-w-xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-blue">Pei Design</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.055em] md:text-6xl">AI Product Designer Portfolio</h1>
        <p className="mt-5 leading-7 text-muted">Choose a language to enter the portfolio. 选择语言进入作品集。</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link className="focus-ring rounded-md bg-text px-5 py-3 text-sm font-semibold text-ink" href={localizedPath(defaultLocale, "")}>
            中文
          </Link>
          <Link className="focus-ring rounded-md border border-line px-5 py-3 text-sm font-semibold text-text" href="/en">
            English
          </Link>
        </div>
      </div>
    </main>
  );
}
