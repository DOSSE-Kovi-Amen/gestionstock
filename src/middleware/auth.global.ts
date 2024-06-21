
// authentication guard.
export default defineNuxtRouteMiddleware((to, _from) => {
  const auth = useAuthStore();

  if (to.path === "/auth/login/" && auth.isAuth) {
    return navigateTo("/");
  }  
});