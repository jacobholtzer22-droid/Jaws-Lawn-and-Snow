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
            {/* Call and text are separate actions on purpose — a lot of people
                will text who would never dial. Both carry the same number. */}
            <div className="grid gap-3 sm:grid-cols-2">
              <PhoneLink
                href={business.phoneHref}
                className="flex min-h-[44px] items-center gap-4 rounded-xl border border-pine/10 bg-white/60 px-5 py-4 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:border-sap hover:shadow-card active:scale-[0.99]"
                aria-label={`Call ${business.phoneDisplay}`}
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pine text-sap">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-loam/50">
                    {contact.callLabel}
                  </span>
                  <span className="font-display text-lg font-bold text-pine">
                    {business.phoneDisplay}
                  </span>
                </span>
              </PhoneLink>

              <a
                href={contact.smsHref}
                className="flex min-h-[44px] items-center gap-4 rounded-xl border border-pine/10 bg-white/60 px-5 py-4 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:border-sap hover:shadow-card active:scale-[0.99]"
                aria-label={`Text ${business.phoneDisplay}`}
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pine text-sap">
                  <MessageSquare className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-loam/50">
                    {contact.textLabel}
                  </span>
                  <span className="font-display text-lg font-bold text-pine">
                    {business.phoneDisplay}
                  </span>
                </span>
              </a>
            </div>

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
