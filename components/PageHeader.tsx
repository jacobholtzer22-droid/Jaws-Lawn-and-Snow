type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

/**
 * Interior-page header band. Pine background gives the (transparent-at-top) fixed
 * header a dark backdrop so its light text stays legible, and the top padding
 * clears the fixed header. Renders the page's single <h1>; section headings below
 * are <h2>. Carries the mowing-stripe motif (field-rule) along the bottom edge.
 */
export default function PageHeader({ eyebrow, title, subtitle }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-pine to-pine-dark pt-28 pb-14 sm:pt-32 sm:pb-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(118deg, #ffffff 0 18px, transparent 18px 36px)",
        }}
        aria-hidden="true"
      />
      <div className="container-page relative">
        <p
          className="eyebrow mb-4 text-birch animate-fade-up"
          style={{ animationDelay: "40ms" }}
        >
          {eyebrow}
        </p>
        <h1
          className="h-display text-4xl text-birch animate-fade-up sm:text-5xl"
          style={{ animationDelay: "120ms" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-4 max-w-2xl text-base text-birch/75 animate-fade-up sm:text-lg"
            style={{ animationDelay: "200ms" }}
          >
            {subtitle}
          </p>
        )}
      </div>
      <div className="field-rule absolute inset-x-0 bottom-0" />
    </section>
  );
}
