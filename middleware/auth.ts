export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  if(!user.value && (to.path === '/dashboard' || to.path === '/profile')) {
    return navigateTo('/')
  } else if(user.value && (to.path === '/auth' || to.path === '/')) {
    return navigateTo('/dashboard')
  }
})