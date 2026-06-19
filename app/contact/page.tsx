import PageHeader from "@/components/PageHeader";
import Contact from "@/components/Contact";
import { site } from "@/site.config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("contact");

export default function ContactPage() {
  const { contact } = site;

  return (
    <>
      <PageHeader
        eyebrow={contact.eyebrow}
        title={contact.heading}
        subtitle={contact.sub}
      />
      <Contact hideHeading />
    </>
  );
}
