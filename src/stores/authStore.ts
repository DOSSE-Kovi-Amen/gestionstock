import { User, type authLogin } from "~/types/user";

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>();
  const errors=ref<any|null>([])
  const isAuth = ref(false);
  const access_token = ref("");
  const loading= ref(false);

  const authUser = localStorage.getItem('auth_user');
  const authToken = localStorage.getItem('access_token');

  if (authUser) {
    // S'il y a une valeur dans le localStorage, l'utiliser
    user.value = JSON.parse(authUser);
    access_token.value = authToken ?? "";
    isAuth.value = true;
  } else {
    // Sinon, initialiser à null
    user.value = null;
    isAuth.value = false;
    access_token.value = "";
  }

  const signin = async (payload: authLogin): Promise<boolean> => {
    loading.value=true
    const { data, pending, error, refresh }:any = await useFetch(`${apiBaseURL}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: "*/*",
        "Content-type": "application/json",
      },
      body: payload
    })

    if (error.value?.statusCode == 401) {
      errors.value.push("Erreur d'authentification")
      loading.value = false
      return false;

    }

    if (error.value?.statusCode == 404) {
      errors.value=error.value.data.message
      loading.value = false
      return false;

    }

    if (error.value?.statusCode == 400) {
      errors.value=error.value.data.message
      loading.value = false
      return false;
    }

    console.log('====================================');
    console.log(data.value);
    console.log('====================================');

    if (data.value) {
      localStorage.setItem('access_token', data.value.access_token);
      localStorage.setItem('auth_user', JSON.stringify(data.value.user));
      isAuth.value = true;
      access_token.value = data.value.access_token;
      user.value = data.value?.user;
      loading.value = false
      return true;
    }
    return true;


  }

  const logout = async () => {
    localStorage.clear();
    user.value = null;
    isAuth.value = false;
    access_token.value = "";
    useRouter().push({path:"/login",query:{sessionExpired: 'true'}})
  }

  return { user, access_token,errors,loading, signin, isAuth, logout }


})

