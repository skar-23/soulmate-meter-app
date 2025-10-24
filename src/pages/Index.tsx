import { Heart, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/Header";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";

const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Skar Love Calculator",
        alternateName: "Skar Love",
        url: "https://www.skarlovecalculator.app",
        logo: "https://www.skarlovecalculator.app/favicon.ico",
        sameAs: [
          "https://www.instagram.com/skarlovecalculator",
          "https://twitter.com/skarlovecal2025",
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How accurate is the love calculation percentage?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "It's a novelty score based on an algorithm. For fun only! We recommend consulting relationship experts for real advice.",
            },
          },
          {
            "@type": "Question",
            name: "Can I share my results on social media?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, absolutely! We encourage you to share your unique SkarLovecalculator results on TikTok, Instagram, or any platform.",
            },
          },
          {
            "@type": "Question",
            name: "Is this calculator free to use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, the SkarLoveCalculator is 100% free, and you can use it as many times as you like.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Skar Love Calculator - Test Your Love Compatibility</title>
        <meta
          name="description"
          content="Calculate your love compatibility with Skar Love Calculator, our free love calculator. Test by names or birth dates and discover your romantic destiny. Fun, fast, and free!"
        />
        <meta
          name="keywords"
          content="love,love calculator,love compatibility test,love percentage calculator,free online love calcuator,free love test,love score checker,Best free online love calculator for couples,skar love calculator,love calculator by name,love calculator by birthdate,love estimator,love calculate by name,love calculator based on names,true love calculator,real love calculator"
        />
        <meta
          property="og:title"
          content="Skar Love Calculator - Test Your Love Compatibility"
        />
        <meta
          property="og:description"
          content="Calculate your love compatibility with Skar Love Calculator, our free love calculator. Test by names or birth dates and discover your romantic destiny. Fun, fast, and free!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://skarlovecalculator.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Skar Love Calculator - Test Your Love Compatibility"
        />
        <meta
          name="twitter:description"
          content="Calculate your love compatibility with Skar Love Calculator, our free love calculator. Test by names or birth dates and discover your romantic destiny. Fun, fast, and free!"
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 md:py-32 lg:py-32 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10">
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Skar Love Calculator
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Discover Your Compatibility Score
                </span>
              </h1>

              <p className="mb-8 text-base text-muted-foreground md:text-lg lg:text-xl">
                Calculate your love percentage with our fun and free love
                calculator. Test compatibility by names or birth dates and
                discover your romantic destiny!
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button asChild size="lg" variant="romantic" className="group">
                  <Link to="/name-calculator">
                    <User className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                    Calculate by Names
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary/50 hover:border-primary"
                >
                  <Link to="/dob-calculator">
                    <Calendar className="mr-2 h-5 w-5" />
                    Calculate by Dates
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Maximize Your Match: Name Compatibility vs. Birthdate Love Test
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-primary/20 transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                    <User className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle>Name Compatibility</CardTitle>
                  <CardDescription>
                    Enter two names and discover the love percentage based on
                    name compatibility analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="w-full">
                    <Link to="/name-calculator">Try Name Calculator →</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-accent/20 transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-primary">
                    <Calendar className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <CardTitle>Birthdate Match</CardTitle>
                  <CardDescription>
                    Calculate love compatibility using birth dates for a more
                    personalized result
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="w-full">
                    <Link to="/dob-calculator">Try Date Calculator →</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-primary/20 transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                    <Heart className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle>Instant Results</CardTitle>
                  <CardDescription>
                    Get your love percentage instantly with fun interpretations
                    and relationship insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Free • No signup required • Unlimited tests
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container max-w-4xl">
            <article className="prose prose-gray max-w-none">
              <h2 className="text-3xl font-bold mb-6">
                About Our Love Calculator
              </h2>

              <p className="text-lg text-muted-foreground mb-6">
                We'''re a fun, entertaining way to test romantic compatibility and
                see your love percentage. Whether you'''re curious about a crush,
                testing your relationship, or just having fun with friends, our
                love percentage calculator provides instant results that help
                you explore your relationship compatibility, based on either
                names or birth dates.
              </p>

              <h3 className="text-2xl font-semibold mb-4">
                Name-Based Love Calculator
              </h3>
              <p className="text-muted-foreground mb-6">
                The name compatibility calculator analyzes the letters in both
                names to generate a unique love percentage. This traditional
                method has been used for generations to predict romantic
                compatibility and is perfect for quick, fun results.
              </p>

              <h3 className="text-2xl font-semibold mb-4">
                Birthdate Love Test
              </h3>
              <p className="text-muted-foreground mb-6">
                For a more personalized approach, try our birthdate calculator.
                By comparing birth dates, we calculate compatibility based on
                <Link to="/blog/numerology-for-love" className="underline ml-1">
                  numerological principles
                </Link>
                , providing insights into your romantic match.
              </p>

              <h3 className="text-2xl font-semibold mb-4">
                Why Use Skar Love Calculator?
              </h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Fun way to break the ice with someone special</li>
                <li>Entertainment for parties and social gatherings</li>
                <li>Curiosity about relationship compatibility</li>
                <li>Free and instant results with no registration</li>
                <li>
                  <Link to="/share-results" className="underline">
                    Share results with friends on social media
                  </Link>
                </li>
              </ul>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
