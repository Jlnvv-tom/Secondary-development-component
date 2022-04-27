import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080, // 自定义端口号，一般3000以后
    open: true, // 是否自动浏览器打开
  }
})
