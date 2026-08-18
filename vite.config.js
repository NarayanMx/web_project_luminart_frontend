import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/web_project_luminart_frontend/",
  server : {
    port: 3000
  },
});
