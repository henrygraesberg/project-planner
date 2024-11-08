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
    if (user.value) {
      loggedIn.value = true
    } else {
      loggedIn.value = false
    }
  })
})

</script>

<template>
  <nav class="flex px-14 py-3 justify-between">
    <NuxtLink to="/">
      <h1 class="font-inter font-semibold text-3xl logo">Outline</h1>
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
      from-secondary-green
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
          <span class="font-extrabold">{{ loggedIn ? user?.user_metadata.first_name : 'Outline' }}</span>
        </h1>

        <div v-show="loggedIn" class="flex flex-col">
        <NuxtLink to="/profile" @click="userMenuOpen = false" class="font-thin w-fit">
          Profile
        </NuxtLink>
        <button @click="() => {signOut(); userMenuOpen = false}" class="self-end font-thin underline">
          Log out
        </button>
        </div>
        
        <div v-show="!loggedIn">
        <NuxtLink to="/auth" @click="userMenuOpen = false" class="font-thin underline">
          Sign in/Sign up
        </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>