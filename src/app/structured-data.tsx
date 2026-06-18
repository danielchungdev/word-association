const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wordassociation.app";

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Word Association",
  url: siteUrl,
  applicationCategory: "GameApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  description:
    "A free daily word chain puzzle game. Associate 8 words in sequence using compound words and popular phrases. A new challenge every day.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  genre: "Word Game",
  audience: {
    "@type": "Audience",
    audienceType: "General",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you play Word Association?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each day you are presented with a chain of 8 words. Starting from the first word, find a word that links the current word to the next one via a compound word or popular phrase. For example, 'OUT' connects to 'SIDE' because 'outside' is a compound word. Continue the chain until all 8 words are connected.",
      },
    },
    {
      "@type": "Question",
      name: "How often does a new Word Association puzzle come out?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A brand-new puzzle is released every day at midnight. Once you complete today's challenge, you can return tomorrow for the next one.",
      },
    },
    {
      "@type": "Question",
      name: "What counts as a valid word association?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Valid associations include closed compound words (e.g. 'sunshine'), open compound words (e.g. 'almond milk'), and hyphenated compound words. The connection must link the current word to the immediately following word — you cannot skip words in the chain.",
      },
    },
    {
      "@type": "Question",
      name: "Are my stats saved?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Your completion history, streak, and guess distribution are saved locally in your browser so your progress persists between sessions on the same device.",
      },
    },
    {
      "@type": "Question",
      name: "Is Word Association free to play?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Word Association is completely free to play with no sign-up required.",
      },
    },
  ],
};

export function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
