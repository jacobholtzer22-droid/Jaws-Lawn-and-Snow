import { Phone, MessageSquare, CalendarClock } from "lucide-react";
import Section from "./Section";
import ContactForm from "./ContactForm";
import BrandWatermark from "./BrandWatermark";
import PhoneLink from "./PhoneLink";
import { site } from "@/site.config";

const INFO_ICONS = [MessageSquare, CalendarClock] as const;

/** `hideHeading` drops the title block when a PageHeader already provides the page title. */
export default function Contact({ hideHeading = false }: { hideHeading?: boolean }) {
  const { contact, business } = site;

  return (
    <Section
      id="contact"
      tone="birch"
      className="stripe-wash relative isolate overflow-hidden"
    >
      <BrandWatermark
        tone="navy"
        className="-left-12 bottom-4 hidden w-[300px] opacity-[0.04] lg:block"
      />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          {!hideHeading && (
            <>
              <p className="eyebrow mb-4">{contact.eyebrow}</p>
              <h2 className="h-display text-3xl text-pine sm:text-5xl">
                {contact.heading}
              </h2>
              <p className="mt-4 max-w-md text-base text-loam/65">
                {contact.sub}
              </p>
            </>
          )}

          <div className={`${hideHeading ? "" : "mt-8"} space-y-4`}>
            <PhoneLink
              href={business.phoneHref}
              className="flex items-center gap-4 rounded-xl border border-pine/10 bg-white/60 px-5 py-4 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:border-sap hover:shadow-card active:scale-[0.99]"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-pine text-sap">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wider text-loam/50">
                  {contact.callOrTextLabel}
                </span>
                <span className="font-display text-lg font-bold text-pine">
                  {business.phoneDisplay}
                </span>
              </span>
            </PhoneLink>

            {contact.infoLines.map((line, i) => {
              const Icon = INFO_ICONS[i] ?? MessageSquare;
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 px-1 text-sm text-loam/65"
                >
                  <Icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-sap-dark"
                    aria-hidden="true"
                  />
                  <span>{line}</span>
                </div>
              );
            })}
          </div>
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}
