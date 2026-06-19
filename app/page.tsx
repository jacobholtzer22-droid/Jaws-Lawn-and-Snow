import SeasonHero from "@/components/SeasonHero";
import Seasons from "@/components/Seasons";
import Gallery from "@/components/Gallery";
import CtaBand from "@/components/CtaBand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("home");

export default function Home() {
  return (
    <>
      <SeasonHero />
      <Seasons />
      <Gallery />
      <CtaBand />
    </>
  );
}
