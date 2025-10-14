import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import SpeedInsightsWrapper from "./components/SpeedInsightsWrapper";

const root = createRoot(document.getElementById("root")!);

root.render(
  <>
    <App />
    {process.env.NODE_ENV === "production" && <SpeedInsightsWrapper />}
  </>
);
