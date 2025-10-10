import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col">
      <Header />
      <main className="container py-12 flex-grow">
        <section className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">About Us</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Welcome to our love calculator website! Our mission is to provide a fun and engaging way for people to explore their romantic compatibility with others. Whether you believe in the power of names, the wisdom of astrology, or the science of numerology, we have a calculator for you.
              </p>
              <p>
                Our team is passionate about helping people connect and understand each other better. We believe that our tools can be a starting point for meaningful conversations and relationships. While our calculators are meant for entertainment, we hope they bring a little bit of magic and fun into your life.
              </p>
              <p>
                Thank you for visiting our website. We hope you enjoy our love calculators as much as we enjoyed creating them for you!
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
