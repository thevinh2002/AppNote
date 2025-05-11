import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "global": 'window', // Giữ lại cấu hình của bạn
  },
  // server: {
  //   hmr: false, // Tắt Fast Refresh (HMR)
  // },
});
