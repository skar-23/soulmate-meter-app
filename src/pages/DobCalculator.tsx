import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Calendar as CalendarIcon, Download } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Header from "@/components/Header";
import { getZodiacSign, getZodiacCompatibility } from "@/utils/zodiac";
import { cn } from "@/lib/utils";
import dobBg from "@/assets/dob-bg.jpg";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";

const DobCalculator = () => {
  const [date1, setDate1] = useState<Date>();
  const [date2, setDate2] = useState<Date>();
  const [result, setResult] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [sign1, setSign1] = useState<string>("");
  const [sign2, setSign2] = useState<string>("");

  useEffect(() => {
    // Push AdSense ads
    try {
      // @ts-expect-error - adsbygoogle is loaded from external script
      if (typeof window !== "undefined" && window.adsbygoogle) {
        // @ts-expect-error - adsbygoogle push
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  const handleCalculate = () => {
    if (date1 && date2) {
      const sign1 = getZodiacSign(date1);
      const sign2 = getZodiacSign(date2);
      const percentage = getZodiacCompatibility(sign1, sign2);
      setResult(percentage);
      setSign1(sign1);
      setSign2(sign2);
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setDate1(undefined);
    setDate2(undefined);
    setResult(null);
    setShowResult(false);
    setSign1("");
    setSign2("");
  };

  // Build absolute OG image URL
  const canonicalBase = "https://www.skarlovecalculator.app";
  const absoluteOgImage = `${canonicalBase}${dobBg}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "Skar Love Calculator by Birth Date",
        description:
          "Calculate love compatibility based on zodiac signs from birth dates. Free, private, and shareable.",
        url: "https://www.skarlovecalculator.app/dob-calculator",
        applicationCategory: "Entertainment",
        operatingSystem: "Web",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How does birth date compatibility work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "It's based on zodiac sign compatibility. We determine each person's zodiac sign from their birth date and then calculate a compatibility score based on traditional astrological pairings.",
            },
          },
          {
            "@type": "Question",
            name: "Is this astrology-based test accurate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "This calculator is for entertainment purposes. While astrology can offer fun insights, true compatibility is complex and depends on many factors beyond zodiac signs.",
            },
          },
          {
            "@type": "Question",
            name: "Is my birth date information saved?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Your birth date is only used for the on-the-spot calculation and is not stored on our servers.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col">
      <Helmet>
        <title>
          Love Percentage Calculator by Date of Birth - Zodiac Compatibility
        </title>
        <link
          rel="canonical"
          href="https://www.skarlovecalculator.app/dob-calculator"
        />
        <meta
          name="description"
          content="Find your love percentage by date of birth. Our free tool uses zodiac signs to calculate romantic compatibility. Get an instant, shareable result."
        />
        <meta
          name="keywords"
          content="love calculator by birth date,birth date love test,zodiac compatibility test,skar love calculator by birth date,compatibility test astrology,star sign compatibility test,zodiac sign compatibility test,love calculator by date of birth,horoscope compatibility test,dob love calculator,couple compatibility bybirth date,love calculator according to date of birth,love calculator based on date of birth,love meter by date of birth,astrology signs love calculator"
        />

        <meta
          property="og:title"
          content="Love Percentage Calculator by Date of Birth - Zodiac Test"
        />
        <meta
          property="og:description"
          content="Find your love percentage by date of birth. Our free tool uses zodiac signs to calculate romantic compatibility. Get an instant, shareable result."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.skarlovecalculator.app/dob-calculator"
        />
        <meta property="og:image" content={absoluteOgImage} />
        <link rel="preload" as="image" href={absoluteOgImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Love Percentage Calculator by Date of Birth - Zodiac Test"
        />
        <meta
          name="twitter:description"
          content="Find your love percentage by date of birth. Our free tool uses zodiac signs to calculate romantic compatibility. Get an instant, shareable result."
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
              Love Percentage Calculator by Date of Birth
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Discover your romantic compatibility based on astrology. Select
              two birth dates to get an instant love percentage based on zodiac
              signs.
            </p>
          </header>

          {/* Calculator Section */}
          <section className="mx-auto max-w-4xl">
            {/* Ad - Above calculator */}
            <div className="flex justify-center mb-8">
              <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-4776127788688436"
                data-ad-slot="YOUR_AD_SLOT_6"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Input Card */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    Select Birth Dates
                  </CardTitle>
                  <CardDescription>
                    Choose the birth dates of both people to calculate
                    compatibility
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>First Person's Birth Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date1 && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date1 ? format(date1, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 sm:w-[320px] w-full max-w-sm"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={date1}
                          onSelect={setDate1}
                          initialFocus
                          captionLayout="dropdown-buttons"
                          fromYear={1920}
                          toYear={new Date().getFullYear()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Second Person's Birth Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date2 && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date2 ? format(date2, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 sm:w-[320px] w-full max-w-sm"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={date2}
                          onSelect={setDate2}
                          initialFocus
                          captionLayout="dropdown-buttons"
                          fromYear={1920}
                          toYear={new Date().getFullYear()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleCalculate}
                      disabled={!date1 || !date2}
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

              {/* Result Card */}
              <Card
                className="relative overflow-hidden border-accent/20"
                style={{
                  backgroundImage: `url(${absoluteOgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />

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
                  {showResult && result !== null ? (
                    <div className="space-y-6 animate-fadeInUp">
                      <div className="text-center">
                        <div className="mb-4 text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          {result}%
                        </div>
                        <h3 className="mb-2 text-2xl font-semibold">
                          A Cosmic Connection!
                        </h3>
                        <p className="text-muted-foreground">
                          Your zodiac signs, {sign1} and {sign2}, have a special
                          bond.
                        </p>
                      </div>

                      <div className="rounded-lg bg-secondary/50 p-4 text-center backdrop-blur-sm">
                        <p className="text-sm font-medium">
                          {date1 && format(date1, "MMM dd, yyyy")} 💕{" "}
                          {date2 && format(date2, "MMM dd, yyyy")}
                        </p>
                      </div>

                      <div className="flex justify-center">
                        <Link
                          to={`/generate-card?sign1=${sign1}&sign2=${sign2}&percentage=${result}`}
                        >
                          <Button variant="romantic" size="lg">
                            <Download className="mr-2 h-5 w-5" />
                            Generate Card
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-64 items-center justify-center text-center">
                      <div className="space-y-3">
                        <Heart className="mx-auto h-16 w-16 text-muted-foreground/30" />
                        <p className="text-muted-foreground">
                          Select two birth dates and click Calculate to see your
                          love percentage!
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
                  Our birthdate love calculator uses astrological principles to
                  analyze the compatibility between two people based on their
                  dates of birth. By comparing their zodiac signs, we generate a
                  personalized love percentage that reflects your romantic
                  compatibility.
                </p>
                <h3 className="font-semibold text-foreground">
                  Features of Our Date Calculator:
                </h3>
                <ul>
                  <li>Astrology-based compatibility calculation</li>
                  <li>More personalized than name-based calculations</li>
                  <li>Easy-to-use calendar interface for date selection</li>
                  <li>Instant results with detailed interpretations</li>
                  <li>Free unlimited tests with no registration</li>
                </ul>
                <h3 className="font-semibold text-foreground">
                  Understanding Astrology in Love:
                </h3>
                <p>
                  Astrology has been used for centuries to understand
                  relationships and compatibility. By identifying the zodiac
                  signs, we can identify patterns and connections that might
                  indicate romantic harmony. While this is a fun tool, remember
                  that real relationships are built on communication, trust, and
                  mutual respect!
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

export default DobCalculator;
