<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
useSeoMeta({
  title: 'Outline - Dashboard'
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
    <h1>Dashboard</h1>
  </div>
</template>