// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000, //frontend port
    proxy: {
      '/api': {
        target: 'http://localhost:8529', // Change this to your backend's URL and port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
