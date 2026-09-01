import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * The reader service answers /api in production, where nginx proxies it inside
 * the container network. In development it is a separate process, so the dev
 * server forwards the same path — which keeps the app's fetches identical in
 * both, with no base URL to configure in the bundle.
 *
 *   npm run dev:reader                              a local shelf
 *   READER_ORIGIN=https://spiderman.lan npm run dev the deployed one
 *
 * `secure: false` because the deployed origin sits behind Caddy's internal CA.
 */
const READER_ORIGIN = process.env.READER_ORIGIN || 'http://localhost:8787'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
    proxy: {
      '/api': { target: READER_ORIGIN, changeOrigin: true, secure: false },
    },
  },
})
