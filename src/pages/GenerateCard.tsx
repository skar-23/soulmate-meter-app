import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import templateUrl from "../../template.png";
import { getZodiacSymbol } from "@/utils/zodiac";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  const name1 = searchParams.get("sign1") || searchParams.get("name1") || "Elara";
  const name2 = searchParams.get("sign2") || searchParams.get("name2") || "Orion";
  const percentage = searchParams.get("percentage") || 97;

  useEffect(() => {
    // It's important to load the custom font before using it on the canvas
    document.fonts.load('bold 60px Cinzel').then(() => {
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
      drawText(displayText1, nl.pos[0] * scale, nl.pos[1] * scale, nl.font * scale, "#D4AF37", "#0f172a", "Cinzel");
      drawText(displayText2, nr.pos[0] * scale, nr.pos[1] * scale, nr.font * scale, "#D4AF37", "#0f172a", "Cinzel");

      // Draw percentage with default Segoe UI font
      drawText(
        String(percentage),
        p.pos[0] * scale,
        p.pos[1] * scale,
        p.font * scale
      );

      const subtitle =
        isZodiacCard
            ? (Number(percentage) >= 80 ? "A Cosmic Union!" : "Written in the Stars.")
            : (Number(percentage) >= 90 ? "A Celestial Connection! Soulmates." : "A Celestial Connection!");

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
    const fileName = isZodiacCard ? `cosmic-connection-${name1}-${name2}.png` : `soulmate-${name1}-${name2}.png`;
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
      const fileName = isZodiacCard ? `cosmic-connection-${name1}-${name2}.png` : `soulmate-${name1}-${name2}.png`;
      const title = isZodiacCard ? "Cosmic Connection" : "Soulmate Card";
      const filesArray = [
        new File([blob], fileName, {
          type: "image/png",
        }),
      ];
      // @ts-ignore
      if (navigator.canShare && navigator.canShare({ files: filesArray })) {
        // @ts-ignore
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
        <Header />
        <main className="flex-grow p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">{isZodiacCard ? "Your Cosmic Connection Card" : "Your Love Card"}</h2>
            
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
                <Button onClick={handleShare} disabled={!loaded} size="lg" variant="outline">
                    <Share2 className="mr-2 h-5 w-5" />
                    Share
                </Button>
            </div>
        </main>
        <Footer />
    </div>
  );
}