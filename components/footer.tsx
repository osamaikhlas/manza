import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-bronze-light">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="link-underline text-sm text-cream/80">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-espresso text-cream">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <p className="font-serif text-3xl tracking-[0.06em]">{siteConfig.name}</p>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
              {siteConfig.description}
            </p>
          </div>

          <FooterColumn title="Shop" links={[...siteConfig.footerLinks.shop]} />
          <FooterColumn title="About" links={[...siteConfig.footerLinks.about]} />
          <FooterColumn title="Help" links={[...siteConfig.footerLinks.help]} />
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-cream/10 pt-8 text-[11px] uppercase tracking-[0.14em] text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteConfig.legal.year} {siteConfig.name}
          </p>
          <div className="flex flex-wrap gap-6">
            {siteConfig.legal.links.map((l) => (
              <Link key={l.label} href={l.href} className="link-underline">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-6">
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer noopener" className="link-underline">
              Instagram
            </a>
            {/* TODO: replace with real TikTok/Pinterest URLs when available */}
            <a href={siteConfig.social.tiktok} className="link-underline">
              TikTok
            </a>
            <a href={siteConfig.social.pinterest} className="link-underline">
              Pinterest
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
