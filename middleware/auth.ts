export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  console.log('user', user.value)
  console.log('user.value false?', !user.value)
  console.log(!user.value && to.path === '/dashboard')
  console.log('to', to.path)

  if(!user.value && to.path === '/dashboard') {
    console.log('redirecting to /')
    return navigateTo('/')
  } else if(user.value && (to.path === '/auth' || to.path === '/')) {
    return navigateTo('/dashboard')
  }
})