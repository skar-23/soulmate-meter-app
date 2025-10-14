# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/52db672e-8274-44f7-997f-498de9157e20

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
