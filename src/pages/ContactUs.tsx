import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col">
      <Header />
      <main className="container py-12 flex-grow">
        <section className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Have questions or feedback? We'd love to hear from you! 
              </p>
              <p>
                You can reach us by email at:
                <a href="mailto:contact@yourdomain.com" className="text-primary"> contact@yourdomain.com</a>
              </p>
              <p>
                We do our best to respond to all inquiries within 48 hours.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
