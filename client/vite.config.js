import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "GetYourTicket",
        short_name: "GYT",
        description: "Book tickets & experiences worldwide",
        theme_color: "#0b2343",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
