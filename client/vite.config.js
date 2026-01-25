import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// web browsers enforce a strict security rule called the Same-Origin Policy.Since your frontend and backend are on different ports, they are considered different origins, and the browser's security guard will block the communication. Using Vite's built-in proxy, Vite-server will try to make the calls to the backend on your behalf. From the backend's perspective, the request is coming from the Vite(which is part of same project), not from a different origin, so it happily responds. Vite then passes the response back to your code.

export default defineConfig({
  plugins: [react()],
   server: {

    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    }
  }
})

