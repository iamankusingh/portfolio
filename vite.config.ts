import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const deploymentId = env.Deployment_ID?.trim();
  const endpoint = env.Web_app?.trim() || (deploymentId
    ? `https://script.google.com/macros/s/${deploymentId}/exec`
    : "");

  if (endpoint && !/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(endpoint)) {
    throw new Error("Web_app must be a Google Apps Script deployment URL ending in /exec.");
  }

  return {
    plugins: [react(), tailwindcss()],
    // This public submission URL is the only custom env value sent to the client.
    define: {
      "import.meta.env.VITE_CONTACT_ENDPOINT": JSON.stringify(endpoint),
    },
  };
});
