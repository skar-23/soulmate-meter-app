import React from "react";

// This wrapper dynamically imports the Vercel SpeedInsights component
// and renders it only on the client to avoid SSR build-time issues.
export default function SpeedInsightsWrapper() {
  if (typeof window === "undefined") return null;

  // Import lazily so bundlers don't include this in server builds
  const SpeedInsights = React.lazy(() => import("@vercel/speed-insights"));

  return (
    <React.Suspense fallback={null}>
      {/* @ts-ignore - the package exports a React component */}
      <SpeedInsights />
    </React.Suspense>
  );
}
