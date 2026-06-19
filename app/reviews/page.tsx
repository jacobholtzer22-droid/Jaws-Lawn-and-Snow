import PageHeader from "@/components/PageHeader";
import Reviews from "@/components/Reviews";
import CtaBand from "@/components/CtaBand";
import { site } from "@/site.config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("reviews");

export default function ReviewsPage() {
  const { reviews } = site;

  return (
    <>
      <PageHeader
        eyebrow={reviews.eyebrow}
        title={reviews.heading}
        subtitle={reviews.sub}
      />
      <Reviews hideHeading />
      <CtaBand />
    </>
  );
}
