import PageHeader from "@/components/PageHeader";
import WhyUs from "@/components/WhyUs";
import ServiceArea from "@/components/ServiceArea";
import { site } from "@/site.config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("about");

export default function AboutPage() {
  const { whyUs } = site;

  return (
    <>
      <PageHeader eyebrow={whyUs.eyebrow} title={whyUs.heading} />
      <WhyUs hideHeading />
      <ServiceArea />
    </>
  );
}
