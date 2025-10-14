# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/52db672e-8274-44f7-997f-498de9157e20

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/52db672e-8274-44f7-997f-498de9157e20) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/52db672e-8274-44f7-997f-498de9157e20) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Vercel Speed Insights (optional)

If you want to collect performance metrics via Vercel Speed Insights in production, follow these steps:

1. Install the package in your project locally (run on your machine):

```powershell
npm install @vercel/speed-insights
```

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
```

Note: This repo adds `@vercel/speed-insights` to `package.json` and includes `src/components/SpeedInsightsWrapper.tsx`, but you still need to run `npm install` locally and enable the integration in your Vercel dashboard. Deployment to production is required for Speed Insights to collect data.
