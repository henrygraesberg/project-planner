<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const email = ref('')
const password = ref('')

const isSignUp = ref(true)

const client = useSupabaseClient()

const signUp = async () => {
  const { data, error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
  })
  console.log("sign up")
  console.log(data.user)
  console.log(error)
}
const signIn = async () => {
  const { data, error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  console.log("sign in")
  console.log(data.user)
  console.log(error)
}

const user = useSupabaseUser()
onMounted(() => {
  watchEffect(() => {
    if (user.value) {
      console.log(user.value)
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
      <input type="email" placeholder="Email" v-model="email" class="w-full p-2 rounded-lg" />
      <input type="password" placeholder="Password" v-model="password" class="w-full p-2 rounded-lg" />
      <button type="submit" class="w-full bg-green-400 rounded-lg">
        {{ isSignUp ? 'Sign Up' : 'Sign In' }}
      </button>
      <button type="button" @click="isSignUp = !isSignUp">
        {{ isSignUp ? 'Already have an account?' : 'Create an account' }}
      </button>
    </form>
  </div>
</template>