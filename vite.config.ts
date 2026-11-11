import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 显式绑定 IPv4，避免 Windows 上 localhost 只监听 ::1 导致连接被拒绝
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
})
