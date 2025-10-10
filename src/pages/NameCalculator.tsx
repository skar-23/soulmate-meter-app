import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { calculateLoveByNames, getLoveMessage } from "@/utils/loveCalculator";
import namesBg from "@/assets/names-bg.jpg";

const NameCalculator = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleCalculate = () => {
    if (name1.trim() && name2.trim()) {
      const percentage = calculateLoveByNames(name1, name2);
      setResult(percentage);
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setName1("");
    setName2("");
    setResult(null);
    setShowResult(false);
  };

  const loveData = result ? getLoveMessage(result) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Header />
      
      <main className="container py-12">
        <article>
          {/* SEO Header */}
          <header className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Love Calculator by Names
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Calculate love compatibility using names. Enter two names below to discover your romantic match percentage instantly!
            </p>
          </header>

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
                    Type the names of both people to calculate love compatibility
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

              {/* Result Card */}
              <Card 
                className="relative overflow-hidden border-accent/20"
                style={{
                  backgroundImage: `url(${namesBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
                
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 fill-primary text-primary animate-heartbeat" />
                    Love Percentage Result
                  </CardTitle>
                  <CardDescription>
                    {showResult ? "Your compatibility score" : "Results will appear here"}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  {showResult && result !== null && loveData ? (
                    <div className="space-y-6 animate-fadeInUp">
                      <div className="text-center">
                        <div className="mb-4 text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          {result}%
                        </div>
                        <h3 className="mb-2 text-2xl font-semibold">{loveData.title}</h3>
                        <p className="text-muted-foreground">{loveData.message}</p>
                      </div>

                      <div className="rounded-lg bg-secondary/50 p-4 text-center backdrop-blur-sm">
                        <p className="text-sm font-medium">
                          {name1} 💕 {name2}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-64 items-center justify-center text-center">
                      <div className="space-y-3">
                        <Heart className="mx-auto h-16 w-16 text-muted-foreground/30" />
                        <p className="text-muted-foreground">
                          Enter two names and click Calculate to see your love percentage!
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
                <CardTitle>How Does the Name Love Calculator Work?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p>
                  Our name-based love calculator uses a time-tested algorithm that analyzes the letters in both names 
                  to generate a unique compatibility percentage. This fun tool has been popular for generations and 
                  provides instant results for testing romantic compatibility.
                </p>
                <h3 className="font-semibold text-foreground">Features of Our Name Calculator:</h3>
                <ul>
                  <li>Instant love percentage calculation based on names</li>
                  <li>Fun and entertaining romantic compatibility test</li>
                  <li>No registration or personal information required</li>
                  <li>Unlimited free tests for you and your friends</li>
                  <li>Works with any names in any language</li>
                </ul>
                <p>
                  Remember, this is meant for entertainment purposes only. True love and compatibility depend on many 
                  factors beyond what any calculator can measure!
                </p>
              </CardContent>
            </Card>
          </section>
        </article>
      </main>
    </div>
  );
};

export default NameCalculator;
