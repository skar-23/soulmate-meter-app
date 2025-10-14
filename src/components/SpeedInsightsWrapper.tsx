import React, { useEffect, useState } from "react";

// Client-only wrapper that dynamically imports the Next-compatible
// SpeedInsights export. We avoid importing this at module-eval time
// because the package exposes utility exports that can conflict with
// server-side bundling and types.
export default function SpeedInsightsWrapper() {
  const [Comp, setComp] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let mounted = true;

    // Dynamic import the React entrypoint to avoid Next.js-only APIs
    // during Vite's production build. The package exports the same
    // `SpeedInsights` component from `.../react`.
    import("@vercel/speed-insights/react")
      .then((mod) => {
        // package exposes a named export `SpeedInsights`
        const C = (mod && mod.SpeedInsights) as
          | React.ComponentType<any>
          | undefined;
        if (mounted && C) setComp(() => C);
      })
      .catch(() => {
        // ignore load failures in dev environment
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (!Comp) return null;

  return <Comp />;
}
