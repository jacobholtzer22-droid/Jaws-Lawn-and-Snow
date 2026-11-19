import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Jaws Lawn &amp; Snow" },
  description: "How Jaws Lawn &amp; Snow handles the information you share on this website.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold sm:text-4xl">Privacy Policy</h1>
      <div className="mt-8 space-y-4 text-base leading-relaxed opacity-90">
        <h2 className="pt-4 text-xl font-semibold">Who we are</h2>
        <p>
          This website belongs to Jaws Lawn &amp; Snow. Questions about this page can go to us at <a href="tel:+17342622365" className="underline underline-offset-2">(734) 262-2365</a>.
        </p>
        <h2 className="pt-4 text-xl font-semibold">What our contact form collects</h2>
        <p>
          When you send us a message, we collect the name, phone number, email address and message you type in. We use that only to reply to you about your request. We do not sell it.
        </p>
        <h2 className="pt-4 text-xl font-semibold">Cookies and analytics</h2>
        <p>
          We count visits to this site without cookies: we log the page viewed, the site that linked here, ad campaign tags and an approximate location (country, region and city), and we never store your IP address.
        </p>
        <p>
          If you click OK on the cookie banner, we also use PostHog to record how you use this site (clicks, scrolling and a replay of your visit, with anything you type hidden); you can change your choice at any time with the Cookie settings link at the bottom of every page, and if your browser sends a Global Privacy Control signal we leave this off.
        </p>
      </div>
    </div>
  );
}
