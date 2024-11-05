// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@formkit/auto-animate/nuxt',
    '@nuxt/icon',
    '@nuxtjs/supabase',
    '@nuxt/fonts'
  ],
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true,
    vscode: {
      reuseExistingServer: true
    }
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            'text-grey': 'rgb(190 190 190 / <alpha-value>)',
            'primary-green': 'rgb(33 255 98 / <alpha-value>)',
            'secondary-green': 'rgb(16 255 168 / <alpha-value>)',
            'primary-cyan': 'rgb(35 252 247 / <alpha-value>)'
          },
          fontFamily: {
            'inter': ['Inter', 'sans-serif']
          }
        }
      }
    }
  },
  supabase: {
    redirectOptions: {
      login: '/auth',
      callback: '/dashboard',
      include: ['/dashboard, /dashboard/**/*']
    }
  }
})