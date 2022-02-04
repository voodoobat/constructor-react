import path from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import eslint from 'vite-plugin-eslint'

export default defineConfig(({ mode }) => ({
  plugins: [ eslint({ cache: false }), react(), svgr() ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@scss': path.resolve(__dirname, 'src/scss/'),
      '@store': path.resolve(__dirname, 'src/store/'),
      '@src': path.resolve(__dirname, 'src/')
    }
  },
  preview: {
    port: 3000
  },
  server: {
    https: true
  },
  css: {
    modules: {
      generateScopedName: mode == 'production'
        ? '[hash:base64:5]'
        : '[name]_[local]_[hash:base64:5]'
    }
  },
  build: {
    outDir: 'build'
  }
}))
