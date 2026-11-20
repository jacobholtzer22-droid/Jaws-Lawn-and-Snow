import SeasonHero from "@/components/SeasonHero";
import ServicesPreview from "@/components/ServicesPreview";
import FeaturedService from "@/components/FeaturedService";
import Seasons from "@/components/Seasons";
import AerialShowcase from "@/components/AerialShowcase";
import Gallery from "@/components/Gallery";
import HomeReviews from "@/components/HomeReviews";
import BeforeAfter from "@/components/BeforeAfter";
import CtaBand from "@/components/CtaBand";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import { site } from "@/site.config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("home");

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(site.homeFaq)} />
      <SeasonHero />
      <ServicesPreview />
      <FeaturedService />
      <Seasons />
      <AerialShowcase />
      <Gallery />
      <BeforeAfter />
      <HomeReviews />
      <FaqList heading="Questions before you book." items={site.homeFaq} />
      <CtaBand />
    </>
  );
}
