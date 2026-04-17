export default function Head() {
  return (
    <>
      <link rel="icon" type="image/png" href="/My-logo.png" />
      <link rel="shortcut icon" href="/My-logo.png" />
      <link rel="apple-touch-icon" href="/My-logo.png" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Gabi Fixes",
            url: "https://gabifixes.com",
            logo: "https://gabifixes.com/My-logo.png",
            description:
              "Premium skincare and beauty products for radiant, healthy skin.",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1-555-123-4567",
              contactType: "customer service",
            },
            sameAs: [
              "https://www.facebook.com/gabifixes",
              "https://www.instagram.com/gabifixes",
              "https://twitter.com/gabifixes",
            ],
          }),
        }}
      />
    </>
  );
}
