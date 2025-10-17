import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'   // ⬅️ tambahkan ini

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwind()],          // ⬅️ tambahkan tailwind di sini
})
