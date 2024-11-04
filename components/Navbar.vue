<script setup lang="ts">
const client = useSupabaseClient()

let loggedIn = ref(false)

const signOut = async () => {
  const { error } = await client.auth.signOut()

  navigateTo('/')

  if (error) {
    console.error(error)
  }
}

const logInLogOut = () => {
  if (loggedIn.value) {
    signOut()
  } else {
    navigateTo('/auth')
  }
}

const user = useSupabaseUser()
onMounted(() => {
  watchEffect(() => {
    console.log("watch effect")
    console.log(user.value)

    if (user.value) {
      loggedIn.value = true
    } else {
      loggedIn.value = false
    }

    console.log(loggedIn.value)
  })
})

</script>

<template>
  <nav class="flex px-14 py-3 justify-between">
    <NuxtLink to="/">
      <h1>outline</h1>
    </NuxtLink>
    <button class="p-2 bg-text-grey grid place-content-center rounded-full" @click="logInLogOut()">
      <h3 v-show="loggedIn">Log out</h3>
      <Icon v-show="!loggedIn" name="ph:user-bold" :ssr="true" class="text-2xl" />
    </button>
  </nav>
</template>