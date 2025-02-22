import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: "**/*.tsx",
    }),
  ],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@components", replacement: "/src/components" },
      { find: "@interfaces", replacement: "/src/interfaces" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@services", replacement: "/src/services" },
      { find: "@styles", replacement: "/src/styles" },
      { find: "@utils", replacement: "/src/utils" },
    ],
  },
  server: { watch: { usePolling: true } },
});
