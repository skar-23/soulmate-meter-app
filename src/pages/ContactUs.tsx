import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    // Honeypot spam protection: if botcheck is filled, silently abort
    if (data.botcheck) {
      console.warn("Bot detected via honeypot");
      setIsSubmitting(false);
      return;
    }

    // Prepare payload for Web3Forms
    const payload = {
      access_key:"45c74fe3-651b-4c8a-9b14-e08559d14718",
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (
        res.ok &&
        (json.success || json.message === "success" || json.success === true)
      ) {
        // Success — redirect to internal thank-you page (no external redirection)
        window.location.href = "/thank-you";
      } else {
        console.error("Web3Forms error:", json);
        alert("Failed to send message. Please try again later.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("An error occurred. Please check your connection and try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col">
      <Helmet>
        <title>Contact Us - Skar Love Calculator</title>
        <meta
          name="description"
          content="Contact Skar Love Calculator for support, feedback, or inquiries. Report a bug or get in touch with our customer support team."
        />
        <meta
          name="keywords"
          content="SkarLove Calculator contact, report a bug on love calculator, love calculator customer support"
        />
        <link rel="canonical" href="https://www.skarlovecalculator.app/contact-us" />
      </Helmet>
      <Header />
      <main className="container py-12 flex-grow">
        <section className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-muted-foreground">
                  Have questions or feedback about Skar Love Calculator? We'd
                  love to hear from you! Fill out the form below and we'll get
                  back to you as soon as possible.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Web3Forms hidden access key - set via Vite env var when available */}
                <input
                  type="hidden"
                  name="access_key"
                  value="45c74fe3-651b-4c8a-9b14-e08559d14718"
                />
                {/* Honeypot field - keep hidden from users; bots may fill it */}
                <input
                  type="text"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                />
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Enter the subject"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                    className="min-h-[100px]"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
