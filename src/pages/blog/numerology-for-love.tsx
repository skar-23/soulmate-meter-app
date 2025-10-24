import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NumerologyForLove: React.FC = () => {
  const siteUrl = "https://skarlovecalculator.app"; // change if different
  const pageUrl = `${siteUrl}/blog/numerology-for-love`;
  const publishedDate = "2025-10-13"; // placeholder, update as needed
  const modifiedDate = publishedDate;
  const authorName = "Skar Team"; // please provide real author/name if available

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    headline: "Numerology for Love: How Our Birthdate Compatibility Works",
    description:
      "An approachable explanation of how numerology-inspired birthdate compatibility is calculated and what it means for your relationship compatibility.",
    image: `${siteUrl}/generated/Numerology_Love_Compatibility.png`,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Skar Love Calculator",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    datePublished: publishedDate,
    dateModified: modifiedDate,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>
          Numerology for Love — How Our Birthdate Compatibility Works
        </title>
        <meta
          name="description"
          content="Learn how our birthdate compatibility calculator uses numerology-inspired methods to estimate relationship compatibility."
        />
        <meta
          name="keywords"
          content="numerology for love compatibility, love calculator numerology secrets, how numerology predicts love"
        />
        <meta
          property="og:title"
          content="Numerology for Love — How Our Birthdate Compatibility Works"
        />
        <meta
          property="og:description"
          content="Learn how our birthdate compatibility calculator uses numerology-inspired methods to estimate relationship compatibility."
        />
        <meta
          property="og:image"
          content={`${siteUrl}/generated/Numerology_Love_Compatibility.png`}
        />
        <link rel="canonical" href={pageUrl} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header />

      <main className="container py-12 flex-grow">
        <article className="mx-auto max-w-3xl bg-card p-8 rounded-lg shadow-sm">
          <img
            src="/generated/Numerology_Love_Compatibility.png"
            alt="Numerology love compatibility"
            className="w-full h-auto max-h-72 object-contain rounded-md mb-6 bg-muted/5"
          />

          <div className="flex items-center gap-4 mb-6">
            <img
              src="/heart.png"
              alt="author avatar"
              className="h-12 w-12 rounded-full object-contain bg-white p-1"
            />
            <div>
              <p className="text-sm font-semibold">{authorName}</p>
              <p className="text-xs text-muted-foreground">
                Published {publishedDate}
              </p>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-4">
            Numerology for Love: How Our Birthdate Compatibility Works
          </h1>

          <div className="prose prose-lg">
            <p>
              Our birthdate compatibility calculator uses a numerology-inspired
              approach to compare the core numbers derived from two birth dates.
              The method is intended for entertainment and to provide fun
              insights into relationship dynamics; it should not be used as a
              substitute for professional relationship advice.
            </p>

            <h2>What is Numerology?</h2>
            <p>
              Numerology is a historical system that assigns meaning to numbers
              derived from names and birth dates. While not a science,
              numerology has been used in many cultures as a symbolic tool for
              personality analysis and life-path reflection. For historical
              context, see reputable references such as Britannica and
              History.com.
            </p>

            <h2>How we calculate compatibility</h2>
            <ol>
              <li>
                <strong>Life path numbers:</strong> We calculate the life path
                number for each person by summing the digits of the birth date
                components (day, month, year) and reducing to a single digit or
                a master number (11, 22, 33) following common numerology rules.
              </li>
              <li>
                <strong>Core number comparison:</strong> We compare life path
                numbers, expression numbers (if applicable), and look for
                complementary patterns used in traditional numerology.
              </li>
              <li>
                <strong>Score mapping:</strong> The numerical relationships are
                converted to a friendly percentage (love percentage) using an
                internal mapping that weights certain matches higher. This is a
                heuristic designed for entertainment.
              </li>
            </ol>

            <h2>Sources and further reading</h2>
            <ul>
              <li>
                <a
                  href="https://www.britannica.com/topic/numerology"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Numerology — Encyclopaedia Britannica
                </a>
              </li>
              <li>
                <a
                  href="https://www.history.com/news/what-is-numerology"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  A brief history of numerology — History.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Related academic discussions on symbolic systems (example –
                  placeholder)
                </a>
              </li>
            </ul>

            <h2>Privacy and use</h2>
            <p>
              We do not require or store personal data to run the calculator on
              your device. If you choose to share results on social platforms,
              remember those shares may contain non-personal details about the
              test.
            </p>

            <div className="mt-8">
              <Link
                to="/dob-calculator"
                className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md"
              >
                Try the Birthdate Calculator
              </Link>
              <Link
                to="/"
                className="inline-block ml-4 text-sm text-muted-foreground"
              >
                Back to home
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default NumerologyForLove;
