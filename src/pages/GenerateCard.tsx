import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import templateUrl from "../../template.png";

// coords are the 1080-space positions we stored in tools/template_coords_1080.json
const COORDS = {
  name_left: { pos: [271, 328], font: 60 },
  name_right: { pos: [807, 322], font: 60 },
  percentage: { pos: [475, 1024], font: 240 },
  tagline: { pos: [501, 1271], font: 50 },
};

export default function GenerateCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [name1, setName1] = useState("Elara");
  const [name2, setName2] = useState("Orion");
  const [percentage, setPercentage] = useState(97);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
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

      // handle query params (auto-generate, download, share)
      const params = new URLSearchParams(window.location.search);
      const qn1 = params.get("name1");
      const qn2 = params.get("name2");
      const qp = params.get("percentage");
      const qd = params.get("download");
      const qs = params.get("share");
      if (qn1) setName1(qn1);
      if (qn2) setName2(qn2);
      if (qp) setPercentage(Number(qp));
      setTimeout(() => {
        if (qd === "1") handleDownload();
        if (qs === "1") handleShare();
      }, 300);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        stroke = "#0f172a"
      ) => {
        ctx.font = `bold ${fontSize}px Segoe UI`;
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
      drawText(name1, nl.pos[0] * scale, nl.pos[1] * scale, nl.font * scale);
      drawText(name2, nr.pos[0] * scale, nr.pos[1] * scale, nr.font * scale);
      drawText(
        String(percentage),
        p.pos[0] * scale,
        p.pos[1] * scale,
        p.font * scale
      );

      const subtitle =
        percentage >= 90
          ? "A Celestial Connection! Soulmates."
          : "A Celestial Connection!";
      drawText(
        subtitle,
        t.pos[0] * scale,
        t.pos[1] * scale,
        t.font * scale,
        "#ffffff"
      );
    };
  }

  const handleGenerate = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    draw(ctx);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current!;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `soulmate-${name1}-${name2}.png`;
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
      const filesArray = [
        new File([blob], `soulmate-${name1}-${name2}.png`, {
          type: "image/png",
        }),
      ];
      // @ts-ignore
      if (navigator.canShare && navigator.canShare({ files: filesArray })) {
        // @ts-ignore
        await navigator.share({ files: filesArray, title: "Soulmate card" });
      } else {
        alert("Share not supported on this browser. Please download instead.");
      }
    } catch (e) {
      console.error(e);
      alert("Share failed.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Generate Card</h2>
      <div className="grid grid-cols-2 gap-4 max-w-xl">
        <input
          value={name1}
          onChange={(e) => setName1(e.target.value)}
          placeholder="Name 1"
          className="input input-bordered"
        />
        <input
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          placeholder="Name 2"
          className="input input-bordered"
        />
        <input
          type="number"
          value={percentage}
          onChange={(e) => setPercentage(Number(e.target.value))}
          className="input input-bordered col-span-1"
        />
        <div className="flex gap-2">
          <button
            className="btn btn-primary"
            onClick={handleGenerate}
            disabled={!loaded}
          >
            Generate
          </button>
          <button className="btn" onClick={handleDownload} disabled={!loaded}>
            Download
          </button>
          <button className="btn" onClick={handleShare} disabled={!loaded}>
            Share
          </button>
        </div>
      </div>

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
    </div>
  );
}
