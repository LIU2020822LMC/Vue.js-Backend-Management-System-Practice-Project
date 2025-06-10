import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  server: {
    proxy: {
      '/api': {
        target: 'https://apifoxmock.com/m1/4068509-0-default', // 完整基地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 移除 /api 前缀（按需）
      }
    }
  },
  plugins: [vue()],
  //这个resolve是添加的别名
  resolve: {
    alias: [
      {
        find: "@",
        replacement: "/src",
      },
    ],
  },
});
