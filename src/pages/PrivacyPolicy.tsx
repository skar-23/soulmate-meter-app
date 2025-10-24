import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, Calendar, Heart } from "lucide-react";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col">
      <Helmet>
        <title>Privacy Policy - Skar Love Calculator</title>
        <meta
          name="description"
          content="Read the privacy policy for Skar Love Calculator to understand how we handle your data. We are committed to protecting your privacy and ensuring your information is safe."
        />
        <meta
          name="keywords"
          content="skar love calculator privacy policy, data use love app, skar love calculator data"
        />
      </Helmet>
      <Header />
      <main className="container py-12 flex-grow">
        <section className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Privacy Policy for Skar Love Calculator</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Your privacy is important to us. It is Skar Love Calculator's policy to respect your privacy regarding any information we may collect from you across our website, https://skarlovecalculator.app, and other sites we own and operate.
              </p>
              <p>
                We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
              </p>
              <p>
                We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
              </p>
              <p>
                We don’t share any personally identifying information publicly or with third-parties, except when required to by law.
              </p>
              <p>
                Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
              </p>
              <p>
                You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.
              </p>
              <p>
                Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us at contact@skarlovecalculator.app.
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

export default PrivacyPolicy;
