// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  // APP CONFIG
  app: {
    
    // APP METADATA
    head: {
      htmlAttrs: {"data-theme": "soccus"},
    } 

  },

  css: [
    '~/assets/css/main.css',
    '~/assets/css/fonts.css',
  ],

  // MODULES
  modules: [
    '@pinia/nuxt', 
    '@nuxtjs/tailwindcss'
  ],

  // PINIA CONFIG
  pinia: {
    storesDirs: ['./stores/**'],
  },

  // TAILWIND CONFIG
  tailwindcss: {
    cssPath:    ['~/assets/css/main.css', {injectPosition: 'first'}],
    configPath: 'tailwind.config',
    viewer:     true,
  },

  // RUNTIME CONFIG
  runtimeConfig: {
    // ...PUBLIC KEYS
    public: {
      directus: process.env.DIRECTUS_URL || 'http://localhost:8055',
    },
  },

  // DEV CONFIG
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
})