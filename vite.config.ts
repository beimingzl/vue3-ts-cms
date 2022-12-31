import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: false,
    port: 8080,
    open: true,
    cors: true,
    proxy: {
      '^/api': {
        target: 'http://example.com:5000',
        rewrite: (path) => path.replace(/^\/api/, ''),
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // 分包配置，配置完成自动按需加载
          vue: ['vue', 'vue-router', 'pinia']
        }
      }
    }
  }
})
