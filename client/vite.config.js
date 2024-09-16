import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9821
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, '../assets'),
    },
  },
  publicDir: 'public',
  base: '/',
})