import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy local `/api/*` requests to external API to avoid CORS during development
      "/api": {
        target: "https://identitytemplateapi.runasp.net",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
})


