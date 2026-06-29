import { defaultLocale, localizedPath } from "@/lib/i18n";

export default function RootPage() {
  const target = localizedPath(defaultLocale, "");

  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <script dangerouslySetInnerHTML={{ __html: `window.location.replace(${JSON.stringify(target)});` }} />
      <main className="min-h-screen bg-ink" aria-label="Redirecting to portfolio">
        <a className="sr-only" href={target}>
          Enter portfolio
        </a>
      </main>
    </>
  );
}
