import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components/shared": path.resolve(__dirname, "./src/components/shared"),
      "@components/layouts": path.resolve(
        __dirname,
        "./src/components/layouts",
      ),
      "@components/pages": path.resolve(__dirname, "./src/components/pages"),
      "@components/widgets": path.resolve(
        __dirname,
        "./src/components/widgets",
      ),
      "@components/dummies": path.resolve(
        __dirname,
        "./src/components/dummies",
      ),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@api": path.resolve(__dirname, "./src/api"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          piano: ['react-piano', 'soundfont-player'],
          note: ['abcjs']
        }
      }
    }
  }
});
