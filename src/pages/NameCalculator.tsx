import { useState } from "react";
import { Heart, Sparkles, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { calculateLoveByNames, getLoveMessage } from "@/utils/loveCalculator";
import namesBg from "@/assets/names-bg.jpg";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";

const NameCalculator = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [resultSwapped, setResultSwapped] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const handleCalculate = () => {
    if (name1.trim() && name2.trim()) {
      const percentage = calculateLoveByNames(name1, name2);
      const percentageSwapped = calculateLoveByNames(name2, name1);
      setResult(percentage);
      setResultSwapped(percentageSwapped);
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setName1("");
    setName2("");
    setResult(null);
    setShowResult(false);
  };

  const generateCard = () => {
    if (!name1.trim() || !name2.trim() || result === null) return;
    const maxPerc = Math.max(result, resultSwapped ?? 0);
    navigate(
      `/generate-card?name1=${encodeURIComponent(
        name1
      )}&name2=${encodeURIComponent(name2)}&percentage=${maxPerc}`
    );
  };

  const loveData = result ? getLoveMessage(result) : null;

  // Build absolute OG image URL from canonical base so social previews reference the correct domain
  const canonicalBase = "https://www.skarlovecalculator.app";
  const absoluteOgImage = `${canonicalBase}${namesBg}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "Skar Name Love Calculator",
        description:
          "Calculate name-based love compatibility as an instant percentage. Private, free, and shareable.",
        url: "https://www.skarlovecalculator.app/name-calculator",
        applicationCategory: "Game",
        operatingSystem: "Web",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is this test scientific?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The Skar Name Love Calculator is for entertainment and provides a fun, name-based percentage. True relationship compatibility depends on many real-world factors.",
            },
          },
          {
            "@type": "Question",
            name: "Do you store the names I enter?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Names are used only to calculate the result and are not stored permanently.",
            },
          },
          {
            "@type": "Question",
            name: "Can I share my result?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. You can generate a shareable result card and download or post it to social media.",
            },
          },
        ],
      },
    ],
  };

  const getDominanceText = () => {
    if (result == null || resultSwapped == null) return null;
    if (result > resultSwapped)
      return `${name1} appears to have more influence in this pairing.`;
    if (result < resultSwapped)
      return `${name2} appears to have more influence in this pairing.`;
    return `Both names show equal influence.`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col">
      <Helmet>
        <title>
          Skar Love Percentage Calculator by Names - Free Compatibility Test
        </title>
        <link
          rel="canonical"
          href="https://www.skarlovecalculator.app/name-calculator"
        />
        <meta
          name="description"
          content="Enter two names to calculate an instant love percentage — private, free, and easy to share. Generate a shareable result card and learn what different percentage ranges typically mean."
        />
        <meta
          name="keywords"
          content="skar love calculator by name, name compatibility, love test by name, couple name calculator, free love test, relationship calculator,love percentage calculator"
        />

        <meta
          property="og:title"
          content="Love Calculator by Names — Free Name Compatibility Test"
        />
        <meta
          property="og:description"
          content="Enter two names to calculate an instant love percentage — private, free, and easy to share. Generate a shareable result card and learn what different percentage ranges typically mean."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.skarlovecalculator.app/name-calculator"
        />
        <meta property="og:image" content={absoluteOgImage} />
        <link rel="preload" as="image" href={absoluteOgImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Love Calculator by Names — Free Name Compatibility Test"
        />
        <meta
          name="twitter:description"
          content="Enter two names to calculate an instant love percentage — private, free, and easy to share. Generate a shareable result card and learn what different percentage ranges typically mean."
        />
        <meta name="twitter:image" content={absoluteOgImage} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Header />

      <main className="container py-12 flex-grow">
        <article>
          {/* SEO Header */}
          <header className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Love Percentage Calculator by Names
            </h1>
            {/* <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Enter two names to calculate an instant love percentage — private,
              free, and easy to share.
            </p> */}
            <h2 className="mt-4 text-xl font-medium text-foreground/90">
              Love Percentage Calculator by Names — Share Result Cards
            </h2>
          </header>

          {/* Crawlable intro block (SEO) */}
          <section className="mx-auto mb-8 max-w-3xl text-muted-foreground prose prose-sm">
            <p>
              Enter your partner name below to instantly calculate a love percentage
              between you.Results are generated on the fly — no sign-up or
              personal data required — and you can download or share a visually
              pleasing result card if you want to save or post the outcome. Use
              the love percentage as a playful conversation starter or a quick,
              light-hearted way to explore name-based compatibility. While the
              percentage gives an easy-to-understand snapshot, remember this
              tool is for entertainment: true relationship compatibility depends
              on many real-world factors beyond any name-based score. We
              prioritize privacy (names aren’t stored permanently).
            </p>
          </section>

          {/* Calculator Section */}
          <section className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Input Card */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Enter Your Names
                  </CardTitle>
                  <CardDescription>
                    Type the names of both people to calculate love
                    compatibility
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name1">First Name</Label>
                    <Input
                      id="name1"
                      placeholder="Enter first name"
                      value={name1}
                      onChange={(e) => setName1(e.target.value)}
                      className="text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name2">Second Name</Label>
                    <Input
                      id="name2"
                      placeholder="Enter second name"
                      value={name2}
                      onChange={(e) => setName2(e.target.value)}
                      className="text-base"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleCalculate}
                      disabled={!name1.trim() || !name2.trim()}
                      variant="romantic"
                      className="flex-1"
                      size="lg"
                    >
                      <Heart className="mr-2 h-5 w-5" />
                      Calculate Love
                    </Button>
                    {showResult && (
                      <Button onClick={handleReset} variant="outline" size="lg">
                        Reset
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Result Card (in-place highlighted) */}
              <Card
                className={
                  "relative overflow-hidden border-accent/20 transition-shadow duration-200 " +
                  (showResult
                    ? "shadow-2xl ring-2 ring-primary/30 bg-gradient-to-br from-white to-slate-50"
                    : "")
                }
                style={
                  showResult
                    ? {}
                    : {
                        backgroundImage: `url(${namesBg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                }
              >
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 fill-primary text-primary animate-heartbeat" />
                    Love Percentage Result
                  </CardTitle>
                  <CardDescription>
                    {showResult
                      ? "Your compatibility score"
                      : "Results will appear here"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  {showResult && result !== null && loveData ? (
                    <div className="space-y-6 animate-fadeInUp">
                      <div className="text-center">
                        <div className="mb-4 text-7xl sm:text-8xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          {result}%
                        </div>
                        <h3 className="mb-2 text-2xl font-semibold">
                          {loveData.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {loveData.message}
                        </p>
                      </div>

                      {/* Swapped result comparison */}
                      <div className="rounded-lg bg-secondary/60 p-4 text-center backdrop-blur-sm">
                        <p className="text-sm font-medium">Comparison</p>
                        <div className="flex items-center justify-center gap-4 mt-2">
                          <div className="text-center">
                            <div className="text-3xl font-bold">{result}%</div>
                            <div className="text-xs text-muted-foreground">
                              {name1} + {name2}
                            </div>
                          </div>
                          <div className="text-2xl text-muted-foreground">
                            vs
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold">
                              {resultSwapped}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {name2} + {name1}
                            </div>
                          </div>
                        </div>

                        <p className="mt-3 text-sm">{getDominanceText()}</p>
                      </div>

                      <div className="flex justify-center">
                        <Button
                          onClick={generateCard}
                          variant="romantic"
                          size="lg"
                        >
                          <Download className="mr-2 h-5 w-5" />
                          Generate Card
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-64 items-center justify-center text-center">
                      <div className="space-y-3">
                        <Heart className="mx-auto h-16 w-16 text-muted-foreground/30" />
                        <p className="text-muted-foreground">
                          Enter two names and click Calculate to see your love
                          percentage!
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>

          {/* SEO Content */}
          <section className="mx-auto mt-16 max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle>How Does the Skar Love Calculator Work?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p>
                  Our name-based love calculator uses a time-tested algorithm
                  that analyzes the letters in both names to generate a unique
                  compatibility percentage. This fun tool has been popular for
                  generations and provides instant results for testing romantic
                  compatibility.
                </p>
                <h3 className="font-semibold text-foreground">
                  Features of Our Name Calculator:
                </h3>
                <ul>
                  <li>Instant love percentage calculation based on names</li>
                  <li>Fun and entertaining romantic compatibility test</li>
                  <li>No registration or personal information required</li>
                  <li>Unlimited free tests for you and your friends</li>
                  <li>Works with any names in any language</li>
                </ul>
                <p>
                  Remember, this is meant for entertainment purposes only. True
                  love and compatibility depend on many factors beyond what any
                  calculator can measure!
                </p>
              </CardContent>
            </Card>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default NameCalculator;
