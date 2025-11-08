import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Register service worker (non-blocking)
// Ensure any previously-registered service workers are removed to avoid stale-cache / 404 issues
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const regs = await navigator.serviceWorker.getRegistrations();
      for (const r of regs) {
        await r.unregister();
      }
      // Do not register a new service worker here — leaving registration out prevents the app
      // from being stuck serving cached (possibly-missing) assets in some browsers.
    } catch (e) {
      // ignore errors
    }
  });
}