<script setup lang="ts">
const client = useSupabaseClient()

let loggedIn = ref(false)

let userMenuOpen = ref(false)

const signOut = async () => {
  const { error } = await client.auth.signOut()

  navigateTo('/')

  if (error) {
    console.error(error)
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
    <div class="flex">
      <button class="p-2 bg-text-grey grid place-content-center rounded-full" @click="() => {userMenuOpen = !userMenuOpen}">
        <Icon name="ph:user-bold" :ssr="true" class="text-2xl" />
      </button>
      <div class="flex
      flex-col
      absolute
      right-14
      top-14
      bg-gradient-to-tr
      from-primary-green
      to-primary-cyan
      p-3
      rounded-xl
      min-w-36
      gap-4"
      v-show="userMenuOpen"
      >
        <h1 class="text-xl">
          Welcome{{ loggedIn ? ',' : ' to' }}
          <br />
          <span class="font-bold">{{ loggedIn ? user?.user_metadata.first_name : 'Outline' }}</span>
        </h1>

        <div v-show="loggedIn" class="flex flex-col">
        <NuxtLink to="/profile" @click="userMenuOpen = false">
          Profile
        </NuxtLink>
        <button @click="() => {signOut(); userMenuOpen = false}" class="self-end">
          Log out
        </button>
        </div>
        
        <div v-show="!loggedIn">
        <NuxtLink to="/auth" @click="userMenuOpen = false">
          Sign in/Sign up
        </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>