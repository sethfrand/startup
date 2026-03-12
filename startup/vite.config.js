import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err) => console.log('proxy error', err));
          proxy.on('proxyReq', (_, req) => console.log('proxying:', req.method, req.url));
          proxy.on('proxyRes', (res, req) => console.log('proxy response:', res.statusCode, req.url));
        }
      }
    }
  }
})