import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: "/src/Components",
      // layouts: "/src/Components/ProjectLayOut",
      // pages: "/src/pages",
    },
  },
});