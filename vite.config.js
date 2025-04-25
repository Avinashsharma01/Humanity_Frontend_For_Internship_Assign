import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables based on mode
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    define: {
      // Make env variables available in your app
      'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || (mode === 'production' ? 'https://34.10.166.233' : 'http://34.10.166.233')),
      'process.env.NODE_ENV': JSON.stringify(mode)
    }
  }
})
