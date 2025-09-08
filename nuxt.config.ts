import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap' }
      ]
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  vite: {
    plugins: [nodePolyfills()]
  },
  modules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    // Options
  },
  routeRules: {
    // '/': { cache: { maxAge: 60, swr: true } },
  },
})
