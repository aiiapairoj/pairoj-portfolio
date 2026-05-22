/**
 * Inline JSON-LD injector. Use inside a server component to attach schema.org data
 * to a specific page (in addition to the site-wide schemas in app/layout.tsx).
 */
export default function JsonLd({ id, data }: { id: string; data: unknown }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
