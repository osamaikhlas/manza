import Image from "next/image";
import Link from "next/link";

export function NewSeasonCampaign() {
  return (
    <section className="relative h-[70svh] min-h-[440px] w-full overflow-hidden">
      <Image
        src="/images/campaign-new-season.jpg"
        alt="Manza new season campaign"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-espresso/45" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-ivory">
        <p className="reveal text-[11px] font-semibold uppercase tracking-[0.3em] text-cream/80">
          New Season
        </p>
        <h2 className="reveal mt-5 font-serif text-4xl font-light italic tracking-tight sm:text-5xl">
          Quiet confidence.
        </h2>
        <Link
          href="/shop"
          className="reveal mt-8 border border-ivory/70 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-ivory/10"
        >
          Shop The Collection
        </Link>
      </div>
    </section>
  );
}
