import SeasonHero from "@/components/SeasonHero";
import ServicesPreview from "@/components/ServicesPreview";
import FeaturedService from "@/components/FeaturedService";
import Seasons from "@/components/Seasons";
import AerialShowcase from "@/components/AerialShowcase";
import Gallery from "@/components/Gallery";
import HomeReviews from "@/components/HomeReviews";
import BeforeAfter from "@/components/BeforeAfter";
import CtaBand from "@/components/CtaBand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("home");

export default function Home() {
  return (
    <>
      <SeasonHero />
      <ServicesPreview />
      <FeaturedService />
      <Seasons />
      <AerialShowcase />
      <Gallery />
      <BeforeAfter />
      <HomeReviews />
      <CtaBand />
    </>
  );
}
