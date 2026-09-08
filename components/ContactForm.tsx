"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, Check, Loader2, AlertTriangle } from "lucide-react";
import { site } from "@/site.config";
import { CONVERSIONS, reportConversion } from "@/lib/gtag-conversions";
import PhoneLink from "./PhoneLink";

type Status = "idle" | "submitting" | "success" | "error";

/** Honeypot field name. A real person never sees or fills this. */
const HONEYPOT = "hp_7d3a_ref";

export default function ContactForm() {
  const { contact, business, crm } = site;
  const f = contact.form;
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cityZip, setCityZip] = useState("");
  const [service, setService] = useState("");
  const [frequency, setFrequency] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [message, setMessage] = useState("");
  const [smsConsent, setSmsConsent] = useState(false); // real checkbox, never auto-true
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  /**
   * The CRM contract is a fixed set of fields — it has no columns for address,
   * service, frequency or contact preference. Rather than inventing payload
   * keys the CRM would silently drop, the structured answers are composed into
   * the one free-text field it does read.
   */
  function composeMessage() {
    const lines = [
      address && `Service address: ${address}`,
      cityZip && `City / ZIP: ${cityZip}`,
      service && `Service requested: ${service}`,
      frequency && `Mowing frequency: ${frequency}`,
      contactMethod && `Preferred contact: ${contactMethod}`,
      message.trim() && `\nNotes: ${message.trim()}`,
    ].filter(Boolean);
    return lines.join("\n");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    try {
      const res = await fetch(crm.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Body is EXACTLY these fields — do not add/rename (CRM contract).
        // hp_7d3a_ref is the honeypot the CRM's spam scorer reads.
        body: JSON.stringify({
          name,
          phone,
          email,
          message: composeMessage(),
          smsConsent,
          businessSlug: crm.businessSlug,
          [HONEYPOT]: hp,
        }),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      // Google Ads conversion — fired ONLY once the CRM has accepted the lead,
      // never on mount or page load.
      reportConversion(CONVERSIONS.quoteForm);
      setStatus("success");
      // Dedicated thank-you URL so the conversion has a page to land on.
      // No query string: nothing the customer typed goes into the URL.
      router.push("/thanks");
    } catch {
      // Keep the user's typed input on failure — never wipe it.
      setStatus("error");
    }
  }

  /* ---- Success: replace the form (also shown briefly before /thanks loads) ---- */
  if (status === "success") {
    return (
      <div className="rounded-2xl border border-pine/10 bg-white p-8 text-center sm:p-12">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-sap/20 text-sap-dark">
          <Check className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="h-display mt-6 text-2xl text-pine">
          {contact.successHeading}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-base text-loam/65">
          {contact.successBody}
        </p>
        <PhoneLink
          href={business.phoneHref}
          className="btn-dark mt-7 px-7 py-4 text-base"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          {business.phoneDisplay}
        </PhoneLink>
      </div>
    );
  }

  /* ---- Form ---- */
  const fieldClass =
    "w-full rounded-xl border border-pine/15 bg-white px-4 py-3.5 text-[15px] text-loam placeholder:text-loam/35 focus:border-sap focus:outline-none focus-visible:outline-none";
  const labelClass = "mb-1.5 block text-sm font-semibold text-loam";
  const optional = (
    <span className="font-normal text-loam/40">{f.optionalLabel}</span>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-pine/10 bg-white p-6 sm:p-8"
      noValidate
    >
      {/* Honeypot. `hidden` is the HTML attribute, not a CSS class, so it stays
          hidden even if stylesheets fail. Never shown to, or reachable by, a
          real visitor. */}
      <div hidden>
        <label htmlFor={HONEYPOT}>Leave this field empty</label>
        <input
          id={HONEYPOT}
          name={HONEYPOT}
          type="text"
          autoComplete="off"
          tabIndex={-1}
          value={hp}
          onChange={(e) => setHp(e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            {f.nameLabel}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
            placeholder={f.namePlaceholder}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            {f.phoneLabel}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={fieldClass}
            placeholder={f.phonePlaceholder}
          />
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="address" className={labelClass}>
            {f.addressLabel}
          </label>
          <input
            id="address"
            name="address"
            type="text"
            required
            autoComplete="street-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={fieldClass}
            placeholder={f.addressPlaceholder}
          />
        </div>
        <div>
          <label htmlFor="cityZip" className={labelClass}>
            {f.cityZipLabel}
          </label>
          <input
            id="cityZip"
            name="cityZip"
            type="text"
            required
            value={cityZip}
            onChange={(e) => setCityZip(e.target.value)}
            className={fieldClass}
            placeholder={f.cityZipPlaceholder}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="service" className={labelClass}>
          {f.serviceLabel}
        </label>
        <select
          id="service"
          name="service"
          required
          value={service}
          onChange={(e) => setService(e.target.value)}
          className={fieldClass}
        >
          <option value="">{f.servicePlaceholder}</option>
          {f.serviceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="frequency" className={labelClass}>
            {f.frequencyLabel} {optional}
          </label>
          <select
            id="frequency"
            name="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className={fieldClass}
          >
            <option value="">—</option>
            {f.frequencyOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="contactMethod" className={labelClass}>
            {f.contactMethodLabel} {optional}
          </label>
          <select
            id="contactMethod"
            name="contactMethod"
            value={contactMethod}
            onChange={(e) => setContactMethod(e.target.value)}
            className={fieldClass}
          >
            <option value="">—</option>
            {f.contactMethodOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="email" className={labelClass}>
          {f.emailLabel} {optional}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClass}
          placeholder={f.emailPlaceholder}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={labelClass}>
          {f.messageLabel} {optional}
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${fieldClass} resize-y`}
          placeholder={f.messagePlaceholder}
        />
        <p className="mt-2 text-[13px] text-loam/55">{f.photoHint}</p>
      </div>

      {/* TCPA consent — real checkbox, default unchecked */}
      <div className="mt-5 flex items-start gap-3">
        <input
          id="smsConsent"
          name="smsConsent"
          type="checkbox"
          checked={smsConsent}
          onChange={(e) => setSmsConsent(e.target.checked)}
          className="mt-0.5 h-6 w-6 shrink-0 cursor-pointer accent-sap"
        />
        <label
          htmlFor="smsConsent"
          className="text-[13px] leading-relaxed text-loam/60"
        >
          {contact.consentLabel}
        </label>
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="mt-5 flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 px-4 py-3.5 text-sm text-red-800"
        >
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <span>
            {contact.errorLead}{" "}
            <PhoneLink
              href={business.phoneHref}
              className="font-semibold underline underline-offset-2"
            >
              {business.phoneDisplay}
            </PhoneLink>
            .
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary mt-6 w-full px-7 py-4 text-base disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            {f.submittingLabel}
          </>
        ) : (
          f.submitLabel
        )}
      </button>
    </form>
  );
}
