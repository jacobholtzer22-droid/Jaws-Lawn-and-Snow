/**
 * Renders a JSON-LD block. `<` is escaped to < so a stray "</script>" in
 * any string can never break out of the tag.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
