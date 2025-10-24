import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, Calendar, Heart } from "lucide-react";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col">
      <Helmet>
        <title>About Skar Love Calculator</title>
        <meta
          name="description"
          content="Learn more about Skar Love Calculator, our mission, and our team. Discover the story behind our fun and engaging love compatibility tools."
        />
        <meta
          name="keywords"
          content="Skar Love Calculator, who runs skar love calculator, love calculator creator"
        />
      </Helmet>
      <Header />
      <main className="container py-12 flex-grow">
        <section className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">About Skar Love Calculator</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Welcome to Skar Love Calculator! Our mission is to provide a fun and engaging way for people to explore their romantic compatibility with others. Whether you believe in the power of names or the wisdom of astrology, we have a calculator for you.
              </p>
              <p>
                Our team is passionate about helping people connect and understand each other better. We believe that our tools can be a starting point for meaningful conversations and relationships. While our calculators are meant for entertainment, we hope they bring a little bit of magic and fun into your life.
              </p>
              <p>
                Thank you for visiting Skar Love Calculator. We hope you enjoy our love calculators as much as we enjoyed creating them for you!
              </p>
            </CardContent>
          </Card>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-6">Explore More</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-primary/20 transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                    <User className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle>Name Compatibility</CardTitle>
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
                  <CardTitle>Numerology For Love</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="w-full">
                    <Link to="/blog/numerology-for-love">Read Our Blog →</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
