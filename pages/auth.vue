<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const email = ref('')
const password = ref('')

const signedInCookie = useCookie('signedInPreviously')
const isSignUp = ref(true)

const client = useSupabaseClient()

const signUp = async () => {
  const { data, error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
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
  <div class="flex justify-center">
    <form
    @submit.prevent="() => (isSignUp ? signUp() : signIn())"
    class="flex flex-col items-center gap-4 w-[50%] p-4 bg-text-grey/60 rounded-lg"
    >
      <h2 class="font-bold text-2xl">
        {{ isSignUp ? "Create an account" : "Log into your account" }}
      </h2>
      <input type="email" placeholder="Email" v-model="email" class="w-full p-2 rounded-lg" />
      <input type="password" placeholder="Password" v-model="password" class="w-full p-2 rounded-lg" />
      <button type="submit" class="w-full bg-green-400 rounded-lg">
        {{ isSignUp ? 'Sign Up' : 'Sign In' }}
      </button>
      <button type="button" @click="isSignUp = !isSignUp" class="border-b-2 border-b-black">
        {{ isSignUp ? 'Already have an account? Log in instead' : 'New user? Create an account' }}
      </button>
    </form>
  </div>
</template>