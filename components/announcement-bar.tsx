import { siteConfig } from "@/lib/site";

export function AnnouncementBar() {
  if (!siteConfig.announcement) return null;
  return (
    <div className="relative z-30 flex h-9 items-center justify-center bg-espresso px-4 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-cream">
      <p>{siteConfig.announcement}</p>
    </div>
  );
}
