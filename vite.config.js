import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://port-folio-backend-two.vercel.app',
        changeOrigin: true,
        secure: false,
      },
      '/mail-send': {
        target: 'https://port-folio-backend-two.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
