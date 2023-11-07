import { Role } from "~/types/role";

export const useRolesStore = defineStore('role', () => {
  const roles = ref<Role[]>([]);
  const errors = ref<any>([]);
  const loading = ref(false);
  const authToken = ref("");
 
  authToken.value = localStorage.getItem('access_token') ?? ""

  const headers = {
    Accept: "*/*",
    "Content-type": "application/json",
    'Authorization': `Bearer ${authToken.value}`, // Include the Bearer token

  }

  // get Data
  const getData = async () => {
    loading.value = true;
    const { data, pending, error, refresh }: any = await useFetch(`${apiBaseURL}/roles`, {
      headers: headers
    })
    if (error.value?.statusCode == 401) {
      await useAuthStore().logout();
    }

    roles.value = data.value;
    console.log('=============dta=======================');
    console.log(roles.value);
    console.log('====================================');
    if (data.value) {
      loading.value = false
    }
  }
 
  // Call getData
  getData()


  return { roles, loading, errors, getData }
})

