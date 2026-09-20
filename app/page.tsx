import { Hero } from "@/components/hero";
import { CollectionSection } from "@/components/collection-section";
import { FeaturedProducts } from "@/components/featured-products";
import { NewSeasonCampaign } from "@/components/new-season-campaign";
import { BrandStory } from "@/components/brand-story";
import { Lookbook } from "@/components/lookbook";
import { Testimonials } from "@/components/testimonials";
import { InstagramGrid } from "@/components/instagram-grid";
import { Newsletter } from "@/components/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CollectionSection />
      <FeaturedProducts />
      <NewSeasonCampaign />
      <BrandStory />
      <Lookbook />
      <Testimonials />
      <InstagramGrid />
      <Newsletter />
    </>
  );
}
