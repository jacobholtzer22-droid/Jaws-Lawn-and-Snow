import SeasonHero from "@/components/SeasonHero";
import ServicesPreview from "@/components/ServicesPreview";
import FeaturedService from "@/components/FeaturedService";
import Seasons from "@/components/Seasons";
import Gallery from "@/components/Gallery";
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
      <Gallery />
      <CtaBand />
    </>
  );
}
