import PageHeader from "@/components/PageHeader";
import Services from "@/components/Services";
import FeaturedService from "@/components/FeaturedService";
import { site } from "@/site.config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("services");

export default function ServicesPage() {
  const { servicesIntro } = site;

  return (
    <>
      <PageHeader
        eyebrow={servicesIntro.eyebrow}
        title={servicesIntro.heading}
        subtitle={servicesIntro.sub}
      />
      <Services hideHeading />
      <FeaturedService />
    </>
  );
}
