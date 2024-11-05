<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ['auth']
})

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')

const signedInCookie = useCookie('signedInPreviously', {default: () => false})
const isSignUp = ref(true)

const client = useSupabaseClient()

const signUp = async () => {
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
}
const signIn = async () => {
  const { data, error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
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
      <input required type="text" placeholder="First name*" v-model="firstName" class="w-full p-2 rounded-lg border-4 border-secondary-green focus:border-primary-cyan outline-none" v-if="isSignUp" />
      <input required type="text" placeholder="Last name*" v-model="lastName" class="w-full p-2 rounded-lg border-4 border-secondary-green focus:border-primary-cyan outline-none" v-if="isSignUp" />
      <input required type="email" placeholder="Email*" v-model="email" class="w-full p-2 rounded-lg border-4 border-secondary-green focus:border-primary-cyan outline-none" />
      <input required type="password" placeholder="Password*" v-model="password" class="w-full p-2 rounded-lg border-4 border-secondary-green focus:border-primary-cyan outline-none" />
      <button type="submit" class="w-full bg-green-400 rounded-lg p-1">
        {{ isSignUp ? 'Sign Up' : 'Sign In' }}
      </button>
      <button type="button" @click="isSignUp = !isSignUp" class="underline">
        {{ isSignUp ? 'Already have an account? Log in instead' : 'New to Outline? Create an account' }}
      </button>
    </form>
  </div>
</template>