import { PortfolioVideo } from "@/components/portfolio-video";
import type { Locale } from "@/lib/i18n";

export function ShortDramaCoverVideo({ locale }: { locale: Locale }) {
  return (
    <PortfolioVideo
      locale={locale}
      label={locale === "zh" ? "AI短剧出海平台封面动画" : "AI Short Drama Studio cover animation"}
      src="/project-cases/ai-short-drama-studio-cover-fallback.mp4"
      poster="/project-cases/ai-short-drama-studio-cover-poster.jpg"
    />
  );
}
