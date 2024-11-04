// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@formkit/auto-animate/nuxt',
    '@nuxt/icon',
    '@nuxtjs/supabase'
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
            'text-grey-fallback': '',
            'text-grey': 'oklch(80% 0 0 / <alpha-value>)'
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