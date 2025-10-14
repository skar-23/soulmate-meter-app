# Welcome to our project

## Project info

**URL**: "https://www.skarlovecalculator.app"

# SkarTeam — Soulmate Meter App

This repository contains the frontend for the Soulmate Meter web app. The project was implemented and is maintained by SkarTeam.

Quick start

1. Clone the repository:

```powershell
git clone <YOUR_GIT_URL>
cd soulmate-meter-app
```

2. Install dependencies:

```powershell
npm install
```

3. Run the development server:

```powershell
npm run dev
```

Build for production

```powershell
npm run build
npm run preview
```

Notes

- The app is built with Vite, React and TypeScript. Styling uses Tailwind CSS.
- Static assets (including generated share images) are stored in the `public/` folder and served directly by the dev/prod server.
- For the optional Vercel Speed Insights integration see `src/components/SpeedInsightsWrapper.tsx`. To enable in production, install `@vercel/speed-insights` and enable the integration in your Vercel dashboard.

Maintainers

- SkarTeam

License

- Add your license information here (for example MIT).

````

2. Vercel offers a managed integration — enable Speed Insights in your Vercel project settings. See the Vercel docs for details.

3. Add the `SpeedInsightsWrapper` component somewhere in your app layout (for example in `src/main.tsx` or in a production-only layout component):

```tsx
import SpeedInsightsWrapper from "@/components/SpeedInsightsWrapper";

function App() {
  return (
    <>
      {/* your app */}
      {process.env.NODE_ENV === "production" && <SpeedInsightsWrapper />}
    </>
  );
}
````

Note: This repo adds `@vercel/speed-insights` to `package.json` and includes `src/components/SpeedInsightsWrapper.tsx`, but you still need to run `npm install` locally and enable the integration in your Vercel dashboard. Deployment to production is required for Speed Insights to collect data.

## Getting started with Vercel Speed Insights

This project includes an optional integration with Vercel Speed Insights. Follow these steps to enable and verify it:

1. Install the package locally (if you haven't already):

```powershell
npm install
```

Or install only the package:

```powershell
npm i @vercel/speed-insights
```

2. Enable Speed Insights for your Vercel project:

- Open your project in the Vercel dashboard and go to the "Speed Insights" tab, then click "Enable". This will add the runtime routes under `/_vercel/speed-insights/*` after the next deployment.

3. Placement in this repo:

- The project ships a client wrapper at `src/components/SpeedInsightsWrapper.tsx`. The wrapper dynamically imports the package's React entrypoint to avoid Next-only APIs during Vite builds.
- We mount the wrapper in `src/main.tsx` behind a production-only guard so it only runs on deployed builds:

```tsx
import SpeedInsightsWrapper from "./components/SpeedInsightsWrapper";

// inside your root render
{
  process.env.NODE_ENV === "production" && <SpeedInsightsWrapper />;
}
```

4. Deploy to Vercel

- Deploy a preview or production build to Vercel by pushing to your connected repo or using the Vercel CLI (`vercel deploy`).

5. Verify

- Visit your deployed site and confirm the tracking script appears (look for `/_vercel/speed-insights/script.js` in the page body).
- Open the Vercel dashboard -> Speed Insights to view collected metrics after visitors have used the site.

Notes

- Speed Insights collects metrics only on Vercel-hosted deployments (preview or production). Local `npm run dev` will not populate the dashboard.
- If you migrate this app to Next.js in the future, you can switch the wrapper to import `@vercel/speed-insights/next` and render the named `SpeedInsights` export directly in `app/layout.tsx`.
