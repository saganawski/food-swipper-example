import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://saganawski.github.io/food-swipper-example/",
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
