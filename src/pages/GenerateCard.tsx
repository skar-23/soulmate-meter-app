import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import templateUrl from "../../template.png";
import { getZodiacSymbol } from "@/utils/zodiac";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// coords are the 1080-space positions we stored in tools/template_coords_1080.json
const COORDS = {
  name_left: { pos: [271, 328], font: 60 },
  name_right: { pos: [807, 322], font: 60 },
  percentage: { pos: [425, 1034], font: 240 },
  tagline: { pos: [501, 1271], font: 50 },
};

export default function GenerateCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const isZodiacCard = searchParams.has("sign1");
  const name1 =
    searchParams.get("sign1") || searchParams.get("name1") || "Elara";
  const name2 =
    searchParams.get("sign2") || searchParams.get("name2") || "Orion";
  const percentage = searchParams.get("percentage") || 97;

  useEffect(() => {
    // It's important to load the custom font before using it on the canvas
    document.fonts.load("bold 60px Cinzel").then(() => {
      const img = new Image();
      img.src = templateUrl;
      img.onload = () => {
        const canvas = canvasRef.current!;
        if (!canvas) return;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0);
        setLoaded(true);
        draw(ctx);
      };
    });

    // Push AdSense ads
    try {
      // @ts-expect-error - adsbygoogle is loaded from external script
      if (typeof window !== "undefined" && window.adsbygoogle) {
        // @ts-expect-error - adsbygoogle push
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        // @ts-expect-error - adsbygoogle push
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdSense error:", err);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name1, name2, percentage, isZodiacCard]);

  function draw(ctx: CanvasRenderingContext2D) {
    // redraw template first
    const img = new Image();
    img.src = templateUrl;
    img.onload = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(img, 0, 0);

      // helpers
      const drawText = (
        text: string,
        x: number,
        y: number,
        fontSize: number,
        color = "#D4AF37",
        stroke = "#0f172a",
        fontFamily = "Segoe UI"
      ) => {
        ctx.font = `bold ${fontSize}px ${fontFamily}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.lineWidth = Math.max(2, Math.floor(fontSize / 18));
        ctx.strokeStyle = stroke;
        ctx.fillStyle = color;
        ctx.strokeText(text, x, y);
        ctx.fillText(text, x, y);
      };

      // scale if needed (coords are in 1080 space)
      const scale = ctx.canvas.width / 1080;

      const nl = COORDS.name_left;
      const nr = COORDS.name_right;
      const p = COORDS.percentage;
      const t = COORDS.tagline;

      let displayText1 = name1;
      let displayText2 = name2;

      if (isZodiacCard) {
        const symbol1 = getZodiacSymbol(name1);
        const symbol2 = getZodiacSymbol(name2);
        displayText1 = `${name1} ${symbol1}`;
        displayText2 = `${name2} ${symbol2}`;
      }

      // Draw names/signs with Cinzel font
      // Make sure both names do not overflow the central ampersand area.
      // Strategy: measure both names and, if either would overlap the center, truncate both to the same length so they remain balanced.
      const centerX = ctx.canvas.width / 2;
      const ampersandClearance = 40 * scale; // pixels of clearance from center

      const measureTextWidth = (text: string, fontPx: number) => {
        ctx.font = `bold ${Math.round(fontPx)}px Cinzel`;
        return ctx.measureText(text).width;
      };

      const maxWidthForSide = (anchorX: number) => {
        if (anchorX < centerX) {
          return Math.max(0, 2 * (centerX - ampersandClearance - anchorX));
        }
        return Math.max(0, 2 * (anchorX - ampersandClearance - centerX));
      };

      const leftMax = maxWidthForSide(nl.pos[0] * scale);
      const rightMax = maxWidthForSide(nr.pos[0] * scale);

      const leftWidth = measureTextWidth(displayText1, nl.font * scale);
      const rightWidth = measureTextWidth(displayText2, nr.font * scale);

      // If either side would exceed its max, truncate both names to the same number of characters
      if (leftWidth > leftMax || rightWidth > rightMax) {
        // find maximum characters that could fit on the tighter side
        const findFitChars = (text: string, fontPx: number, maxW: number) => {
          // quick fallback: try proportional scaling by chars until it fits
          if (maxW <= 0) return 4; // extremely tight; keep a tiny label
          let lo = 1;
          let hi = text.length;
          let best = 1;
          while (lo <= hi) {
            const mid = Math.floor((lo + hi) / 2);
            const sample = text.slice(0, mid) + "…";
            const w = measureTextWidth(sample, fontPx);
            if (w <= maxW) {
              best = mid;
              lo = mid + 1;
            } else {
              hi = mid - 1;
            }
          }
          return Math.max(1, best);
        };

        const leftChars = findFitChars(displayText1, nl.font * scale, leftMax);
        const rightChars = findFitChars(
          displayText2,
          nr.font * scale,
          rightMax
        );

        // use the smaller of the two so both names have same displayed length
        const common = Math.min(leftChars, rightChars);
        displayText1 =
          displayText1.slice(0, common) +
          (displayText1.length > common ? "…" : "");
        displayText2 =
          displayText2.slice(0, common) +
          (displayText2.length > common ? "…" : "");
      }

      drawText(
        displayText1,
        nl.pos[0] * scale,
        nl.pos[1] * scale,
        nl.font * scale,
        "#D4AF37",
        "#0f172a",
        "Cinzel"
      );
      drawText(
        displayText2,
        nr.pos[0] * scale,
        nr.pos[1] * scale,
        nr.font * scale,
        "#D4AF37",
        "#0f172a",
        "Cinzel"
      );

      // Draw percentage with default Segoe UI font
      drawText(
        String(percentage),
        p.pos[0] * scale,
        p.pos[1] * scale,
        p.font * scale
      );

      const subtitle = isZodiacCard
        ? Number(percentage) >= 80
          ? "A Cosmic Union!"
          : "Written in the Stars."
        : Number(percentage) >= 90
        ? "A Celestial Connection! Soulmates."
        : "A Celestial Connection!";

      // Draw tagline with Cinzel font and golden color
      drawText(
        subtitle,
        t.pos[0] * scale,
        t.pos[1] * scale,
        t.font * scale,
        "#D4AF37",
        "#0f172a",
        "Cinzel"
      );
    };
  }

  const handleDownload = () => {
    const canvas = canvasRef.current!;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    const fileName = isZodiacCard
      ? `cosmic-connection-${name1}-${name2}.png`
      : `soulmate-${name1}-${name2}.png`;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleShare = async () => {
    try {
      const canvas = canvasRef.current!;
      const blob = await new Promise<Blob | null>((res) =>
        canvas.toBlob((b) => res(b), "image/png")
      );
      if (!blob) return;
      const fileName = isZodiacCard
        ? `cosmic-connection-${name1}-${name2}.png`
        : `soulmate-${name1}-${name2}.png`;
      const title = isZodiacCard ? "Cosmic Connection" : "Soulmate Card";
      const filesArray = [
        new File([blob], fileName, {
          type: "image/png",
        }),
      ];
      if (navigator.canShare && navigator.canShare({ files: filesArray })) {
        await navigator.share({ files: filesArray, title: title });
      } else {
        alert("Share not supported on this browser. Please download instead.");
      }
    } catch (e) {
      console.error(e);
      alert("Share failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col">
      <Helmet>
        <title>Generate Your Love Score Card - Skar Love Calculator</title>
        <link
          rel="canonical"
          href="https://www.skarlovecalculator.app/generate-card"
        />
        <meta
          name="description"
          content="Create and download a shareable love score card with your personalized compatibility result. Share your love percentage with friends!"
        />
        <meta
          name="keywords"
          content="create shearble love score card, download love calculator result image"
        />
      </Helmet>
      <Header />
      <main className="flex-grow p-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            {isZodiacCard ? "Your Cosmic Connection Card" : "Your Love Card"}
          </h1>

          {/* Ad - Above the card */}
          <div className="flex justify-center mb-6">
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-4776127788688436"
              data-ad-slot="3361838152"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          </div>

          <div className="flex flex-col items-center">
            <div className="mt-6">
              <canvas
                ref={canvasRef}
                style={{
                  maxWidth: "480px",
                  width: "100%",
                  borderRadius: 8,
                  boxShadow: "0 4px 14px rgba(2,6,23,0.6)",
                }}
              />
            </div>

            <div className="flex gap-4 mt-6">
              <Button onClick={handleDownload} disabled={!loaded} size="lg">
                <Download className="mr-2 h-5 w-5" />
                Download
              </Button>
              <Button
                onClick={handleShare}
                disabled={!loaded}
                size="lg"
                variant="outline"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </Button>
            </div>
          </div>

          {/* Ad - Below buttons */}
          <div className="flex justify-center mt-8 mb-8">
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-4776127788688436"
              data-ad-slot="3647589248"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          </div>

          {/* SEO Content Section */}
          <section className="mt-12 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>How to Use Your Love Score Card</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p>
                  Congratulations! You've generated your personalized love
                  compatibility card. This beautiful card displays your unique
                  love percentage and can be easily shared with friends, posted
                  on social media, or saved as a keepsake of your romantic
                  journey.
                </p>

                <h3 className="font-semibold text-foreground mt-6">
                  Downloading Your Card
                </h3>
                <p>
                  Click the "Download" button to save your love card as a
                  high-quality PNG image. The card will be saved to your device
                  with a unique filename that includes both names, making it
                  easy to organize and find later. You can then upload it to
                  Instagram, TikTok, Facebook, or any other platform you prefer.
                </p>

                <h3 className="font-semibold text-foreground mt-6">
                  Sharing Directly
                </h3>
                <p>
                  Use the "Share" button to instantly share your love card
                  through your device's native sharing options. This works great
                  on mobile devices, allowing you to quickly send your results
                  via messaging apps, email, or social media without downloading
                  first.
                </p>

                <h3 className="font-semibold text-foreground mt-6">
                  Why Share Your Love Card?
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Fun way to announce your relationship status or
                    compatibility
                  </li>
                  <li>Great conversation starter with friends and family</li>
                  <li>
                    Create engaging content for your social media followers
                  </li>
                  <li>
                    Save as a digital memory of your relationship milestone
                  </li>
                  <li>
                    Compare results with friends to see who has the highest
                    match
                  </li>
                </ul>

                <h3 className="font-semibold text-foreground mt-6">
                  Card Customization
                </h3>
                <p>
                  Each card is uniquely generated based on your inputs.
                  Name-based cards display both names prominently with your love
                  percentage, while zodiac cards include astrological symbols
                  for a cosmic touch. The elegant design features:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Beautiful celestial background imagery</li>
                  <li>Golden text accents for a premium look</li>
                  <li>Large, bold percentage display</li>
                  <li>Romantic taglines based on your compatibility score</li>
                  <li>
                    Professional quality suitable for printing or digital
                    sharing
                  </li>
                </ul>

                <h3 className="font-semibold text-foreground mt-6">
                  Tips for Best Results
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Use clear, correctly spelled names for the best appearance
                  </li>
                  <li>
                    Keep names reasonably short to fit perfectly on the card
                  </li>
                  <li>Download in PNG format for the highest quality</li>
                  <li>
                    Share on platforms that support high-resolution images
                  </li>
                  <li>
                    Create multiple cards to compare different name combinations
                  </li>
                </ul>

                <p className="mt-6">
                  Remember, while these love cards are fun and entertaining,
                  they're designed for amusement purposes only. True
                  compatibility comes from communication, shared values, and
                  mutual respect. Use your love card as a lighthearted way to
                  celebrate your connection, but always remember that real
                  relationships require genuine effort and understanding from
                  both partners.
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
