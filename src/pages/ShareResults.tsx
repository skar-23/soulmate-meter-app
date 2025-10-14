import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ShareResults: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://skarlovecalculator.app/share-results";
  const shareText = encodeURIComponent(
    "Check out my love compatibility result on Skar Love Calculator!"
  );

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  const tryNativeShare = async () => {
    if ((navigator as any).share) {
      try {
        await (navigator as any).share({
          title: "Skar Love Calculator",
          text: "Check my love compatibility!",
          url: shareUrl,
        });
      } catch (e) {
        console.error("Share canceled or failed", e);
      }
    } else {
      copyLink();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Share Your Results — Skar Love Calculator</title>
        <meta
          name="description"
          content="Share your love calculator results with friends. Quick share buttons for Twitter, Facebook, WhatsApp and more."
        />
      </Helmet>

      <Header />

      <main className="container py-12 flex-grow">
        <div className="mx-auto max-w-2xl bg-card p-8 rounded-lg shadow-sm text-center">
          <h1 className="text-2xl font-bold mb-4">Share Your Results</h1>
          <p className="mb-6 text-muted-foreground">
            Let your friends know your love percentage — pick a platform or copy
            the link.
          </p>

          <h2 className="text-lg font-semibold mb-4">Sample share images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { src: "/generated/sample1.png", caption: "Sample 1" },
              { src: "/generated/sample2.png", caption: "Sample 2" },
            ].map((img) => (
              <div key={img.src} className="bg-muted p-2 rounded-md">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-40 object-cover rounded-md"
                />
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm">{img.caption}</p>
                  <div className="flex items-center gap-2">
                    <a
                      href={img.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary underline"
                    >
                      Open
                    </a>
                    <button
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(
                            window.location.origin + img.src
                          );
                        } catch (e) {
                          console.error(e);
                        }
                      }}
                      className="text-sm text-muted-foreground"
                    >
                      Copy URL
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="mb-4 text-muted-foreground">
              Generate these types of result images from names or birth dates
              and download them to share with your friends. The samples below
              show how a final share image may look.
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <Link
              to="/"
              className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md"
            >
              Return to home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShareResults;
