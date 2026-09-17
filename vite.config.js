import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'development' ? '/' : '/autopilot/',
  plugins: [react(), tailwindcss()],
  // A page of its own for /clipwing-vs-opusclip: the same app, but with its own
  // title, description and share image in the HTML, which link previews read
  // without running any JavaScript.
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        'clipwing-vs-opusclip': path.resolve(__dirname, 'clipwing-vs-opusclip.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    // Ensure a single React instance across app + shadcn/Radix deps
    // (prevents "Invalid hook call" from a duplicated React copy).
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'radix-ui',
      'react-day-picker',
      'date-fns',
      'lucide-react',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
    ],
  },
}))
