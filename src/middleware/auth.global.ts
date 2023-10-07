
// authentication guard.
export default defineNuxtRouteMiddleware((to, _from) => {
  const auth = useAuthStore();

  // if (to.path !== "/login" && !auth.isAuth) {
  //   return navigateTo("/login");
  // } 
  // if (to.path === "/login" && auth.isAuth) {
  //   return navigateTo("/");
  // } 
});