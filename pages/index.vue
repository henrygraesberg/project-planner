<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
useSeoMeta({
  title: 'Outline - The FOSS project planner',
  description: 'Outline - The Free and Open Source Service that helps you plan the development of your free and open source services!'
})
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }
  ]
})
</script>

<template>
  <div>
    <h1>Landing Page</h1>
  </div>
</template>