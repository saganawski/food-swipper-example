import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  const base = command === "build" ? "/food-swipper-example/" : "/";

  return {
    plugins: [react()],
    base,
    optimizeDeps: {
      exclude: ["lucide-react"],
    },
  };
});
