// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  // DEV CONFIG
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  // MODULES
  modules: [
    '@pinia/nuxt'
  ],

  // PINIA CONFIG
  pinia: {
    storesDirs: ['./stores/**'],
  },

  // RUNTIME CONFIG
  runtimeConfig: {
    // ...PUBLIC KEYS
    public: {
      directus: process.env.DIRECTUS_URL || 'http://localhost:8055',
    },
  },

})
