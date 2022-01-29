import fs from 'fs'
import path from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [ react(), svgr() ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@scss': path.resolve(__dirname, 'src/scss/'),
      '@store': path.resolve(__dirname, 'src/store/'),
      '@src': path.resolve(__dirname, 'src/')
    }
  },
  server: {
    https: true,
    key: fs.readFileSync('./certs/key'),
    cert: fs.readFileSync('./certs/crt')
  },
  build: {
    outDir: 'build'
  }
})
