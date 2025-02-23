// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  colorMode: {
    preference: 'light'
  },
  modules: [
    'nuxt-mongoose',
    '@nuxt/ui',
    '@nuxt/eslint',
    '@pinia/nuxt'
  ],
  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {
      user: process.env.MONGO_USERNAME,
      pass: process.env.MONGO_PASSWORD,
    },
    modelsDir: 'models',
    devtools: true,
  },
  nitro: {
    experimental: {
      websocket: true
    }
  },
  app: {
    head: {
      title: 'Antavo Inventory manager',
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
    }
  },
})