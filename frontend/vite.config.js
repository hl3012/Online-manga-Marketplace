import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://mangastore-yui.us-east-2.elasticbeanstalk.com',  
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      }
    }
  }
})