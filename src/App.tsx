import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import React, { Suspense } from "react";

// Lazily import the page components
const Index = React.lazy(() => import("./pages/Index"));
const NameCalculator = React.lazy(() => import("./pages/NameCalculator"));
const DobCalculator = React.lazy(() => import("./pages/DobCalculator"));
const NumerologyForLove = React.lazy(() => import("./pages/blog/numerology-for-love"));
const ShareResults = React.lazy(() => import("./pages/ShareResults"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const GenerateCard = React.lazy(() => import("./pages/GenerateCard"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = React.lazy(() => import("./pages/TermsOfService"));
const ThankYou = React.lazy(() => import("./pages/ThankYou"));

const queryClient = new QueryClient();

// A simple loading fallback component
const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="text-xl font-semibold">Loading...</div>
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/name-calculator" element={<NameCalculator />} />
              <Route path="/generate-card" element={<GenerateCard />} />
              <Route path="/dob-calculator" element={<DobCalculator />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route
                path="/blog/numerology-for-love"
                element={<NumerologyForLove />}
              />
              <Route path="/share-results" element={<ShareResults />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
