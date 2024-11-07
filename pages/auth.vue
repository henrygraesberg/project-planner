<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ['auth']
})
useSeoMeta({
  title: `Outline - Authenctication`,
  description: 'Authenctication page for Outline',
  ogTitle: 'Sign up for or log into Outline today!',
  ogDescription: 'Sign up for or log into Outline today!',
  ogUrl: 'http://localhost:3000/auth',
  twitterTitle: 'Outline login page',
  twitterDescription: 'Sign up for or log into Outline today!',
  twitterCard: 'summary_large_image',
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

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const authError: globalThis.Ref<null, any> = ref(null)

const signedInCookie = useCookie('signedInPreviously', {default: () => false})
const isSignUp = ref(true)

const client = useSupabaseClient()

const signUp = async () => {
  authError.value = null

  if (password.value !== confirmPassword.value) {
    authError.value = {
      code: 'mismatched_passwords',
      message: 'Passwords do not match. Please try again.'
    }
    return
  }

  const { data, error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        first_name: firstName.value,
        last_name: lastName.value,
      }
    }
  })

  authError.value = error

  if(data.user && !error) {
    authError.value = {
      code: 'user_already_exists',
      message: 'User already exists. Please sign in instead.'
    }
  }  
}
const signIn = async () => {
  authError.value = null

  const { data, error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  console.log(data)
  authError.value = error
}

const user = useSupabaseUser()
onMounted(() => {
  if(signedInCookie.value) {
    isSignUp.value = false
  }
  watchEffect(() => {
    if (user.value) {
      signedInCookie.value = true
      navigateTo('/dashboard')
    }
  })
})
</script>

<template>
  <div class="fixed top-4 w-full flex justify-center">
    <NuxtLink to="/" class="logo font-inter font-semibold text-3xl">Outline</NuxtLink>
  </div>
  <div class="flex justify-center items-center h-screen">
    <form
    @submit.prevent="() => (isSignUp ? signUp() : signIn())"
    class="flex flex-col items-center gap-6 min-w-52 w-[50vw] max-w-[50vw] p-4 bg-text-grey/60 rounded-lg max-h-fit"
    >
      <h2 class="font-bold text-2xl">
        {{ isSignUp ? "Create an account" : "Log into your account" }}
      </h2>
      <div v-if="authError" class="w-full bg-red-500 p-4 rounded-xl">Error: {{ authError.code }}<br />{{ authError.message }}</div>
      <div v-if="isSignUp" class="flex gap-2 w-full">
      <input required type="text" placeholder="First name*" v-model="firstName" class="flex-1 p-2 rounded-lg border-4 border-secondary-green focus:border-primary-cyan outline-none"/>
      <input required type="text" placeholder="Last name*" v-model="lastName" class="flex-1 p-2 rounded-lg border-4 border-secondary-green focus:border-primary-cyan outline-none" />
      </div>
      <input required type="email" placeholder="Email*" v-model="email" class="w-full p-2 rounded-lg border-4 border-secondary-green focus:border-primary-cyan outline-none" />
      <input required type="password" placeholder="Password*" v-model="password" class="w-full p-2 rounded-lg border-4 border-secondary-green focus:border-primary-cyan outline-none" />
      <input required v-if="isSignUp" type="password" v-model="confirmPassword" placeholder="Confirm password*" class="w-full p-2 rounded-lg border-4 border-secondary-green focus:border-primary-cyan outline-none" />
      <button type="submit" class="w-full bg-green-400 rounded-lg p-1">
        {{ isSignUp ? 'Sign Up' : 'Sign In' }}
      </button>
      <button type="button" @click="isSignUp = !isSignUp; authError = null" class="underline">
        {{ isSignUp ? 'Already have an account? Log in instead' : 'New to Outline? Create an account' }}
      </button>
    </form>
  </div>
</template>