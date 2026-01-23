import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy local `/api/*` requests to Business API
      "/api": {
        target: "https://stratifybackend-new.runasp.net",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      // Proxy local `/auth/*` requests to Identity API
      "/auth": {
        target: "https://identitytemplateapi.runasp.net",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/auth/, ""),
      },
    },
  },
})


