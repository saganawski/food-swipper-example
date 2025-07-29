import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ command, mode }) => {
  // Use GitHub Pages base path only for production deployment
  const base =
    command === "build" && process.env.GITHUB_PAGES
      ? "/food-swipper-example/"
      : "/";

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["icon.svg", "icon-192.png"],
        manifest: false, // Use the existing manifest.json file
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg,json,txt,woff2}"],
          navigateFallback: "index.html",
          cleanupOutdatedCaches: true,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "google-fonts-cache",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/images\.pexels\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "pexels-images-cache",
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
              handler: "CacheFirst",
              options: {
                cacheName: "images-cache",
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: true,
        },
        // Use existing manifest.webmanifest file
        manifestFilename: "manifest.webmanifest",
        useCredentials: false,
        injectRegister: "auto",
        minify: true,
      }),
    ],
    base,
    optimizeDeps: {
      exclude: ["lucide-react"],
    },
  };
});
