import type { User, authLogin } from "~/types/user";

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>();
  const errors = ref<any | null>([])
  const isAuth = ref(false);
  const access_token = ref("");
  const loading = ref(false);

  const authToken = localStorage.getItem('access_token');

  if (authToken) {
    // S'il y a une valeur dans le localStorage, l'utiliser
    access_token.value = authToken ?? "";
    isAuth.value = true;
  } else {
    // Sinon, initialiser à null
    isAuth.value = false;
    access_token.value = "";
  }

  const signin = async (payload: authLogin): Promise<boolean> => {
    loading.value = true
    const { data, pending, error, refresh }:any = await useFetch(`${apiBaseURL}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: "*/*",
        "Content-type": "application/json",
      },
      body: payload
    })

    if (error.value?.statusCode == 401) {
      errors.value[0]=error.value?.data.message
      loading.value = false
      return false;
    }

    console.log('====================================');
    console.log(error.value?.data.message);
    console.log('====================================');

    if (error.value?.statusCode == 423) {
      errors.value[0]=error.value?.data.message
      loading.value = false
      return false;
    }

    if (error.value?.statusCode == 404) {
      errors.value = ["Cet utilisateur n'existe pas"]
      loading.value = false
      return false;

    }

    if (error.value?.statusCode == 422) {
      errors.value = error.value.data.errors
      loading.value = false
      return false;
    }

    console.log('====================================');
    console.log(data.value);
    console.log('====================================');

    if (data.value) {
      localStorage.setItem('access_token', data.value.authorisation.token);
      localStorage.setItem('auth_user', JSON.stringify(data.value.user));
      isAuth.value = true;
      access_token.value = data.value.authorisation.token;
      user.value = data.value?.user;
      loading.value = false
      return true;
    }
    return true;


  }
  const getProfile = async () => {
    const { data, error } = await useFetch(`${apiBaseURL}/auth/me`, {
      method: 'GET',
      headers: {
        Accept: "*/*",
        "Content-type": "application/json",
        'Authorization': `Bearer ${access_token.value}`, // Include the Bearer token

      },
    })

    if (error.value?.statusCode == 401) {
      useAuthStore().logout();
    }
    if (error.value?.statusCode == 422) {
      errors.value = error.value?.data.errors;
    }

    if (data.value) {
      user.value = data.value
      return data.value
    } else {
      useAuthStore().logout();
    }

  }


  getProfile()

  const logout = async () => {
    localStorage.clear();
    user.value = null;
    isAuth.value = false;
    access_token.value = "";
    useRouter().push({ path: "/login", query: { sessionExpired: 'true' } })
  }

  return { user, access_token, getProfile, 
    // changePwdOrName,
     errors, loading, signin, isAuth, logout }


})

