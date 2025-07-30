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
        manifest: {
          name: "FoodSwipe - Restaurant Matcher",
          short_name: "FoodSwipe",
          description: "Swipe through local restaurants and match with partners to find dining options together",
          start_url: base,
          display: "standalone",
          background_color: "#ffffff",
          theme_color: "#f97316",
          orientation: "portrait",
          scope: base,
          categories: ["food", "lifestyle", "social"],
          icons: [
            {
              src: `${base}icon.svg`,
              sizes: "any",
              type: "image/svg+xml"
            },
            {
              src: `${base}icon-192.png`,
              sizes: "192x192",
              type: "image/png"
            }
          ]
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg,json,txt,woff2}"],
          navigateFallback: "index.html",
          navigateFallbackDenylist: [/^\/_/, /^\/[^/?]+\.[^/]+$/],
          cleanupOutdatedCaches: true,
          additionalManifestEntries: [
            { url: '404.html', revision: null }
          ],
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
