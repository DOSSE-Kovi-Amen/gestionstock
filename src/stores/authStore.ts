import { User, type authLogin } from "~/types/users";

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>();
  const isAuth = ref(false);
  const access_token = ref("");

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

    const { data, pending, error, refresh }: any = await useFetch(`${apiBaseURL}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: "*/*",
        "Content-type": "application/json",
      },
      body: payload
    })

    if (error.value?.statusCode == 401) {
      return false;
    }



    if (data.value) {
      localStorage.setItem('access_token', data.value.data.access_token);
      localStorage.setItem('auth_user', JSON.stringify(data.value.data.user));
      isAuth.value = true;
      access_token.value = data.value.data.access_token;
      user.value = data.value?.data.user;
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

  return { user, access_token, signin, isAuth, logout }


})

