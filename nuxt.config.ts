// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  pages: true,

  srcDir: "./src",

  app: {
    head: {
      title: "Gestion  stock",
      link: [
        // Liens CDN vers les fichiers CSS
        {
          rel: 'stylesheet',
          // href: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.datatables.net/v/dt/jq-3.7.0/jszip-3.10.1/dt-1.13.6/b-2.4.2/b-colvis-2.4.2/b-html5-2.4.2/r-2.5.0/sl-1.7.0/datatables.min.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css',
        },
      ],
      
      
    },
  },

  css: ["@/assets/styles/main.scss"],

  modules: [
    '@nuxtjs/tailwindcss',
    "@pinia/nuxt",

  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
    ],
  },
  imports:{
    dirs:["./stores"]
  },
})
