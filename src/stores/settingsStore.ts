import { Setting } from "~/types";

export const useSettingsStore = defineStore('setting', () => {
  const settings = ref<Setting>();
  const errors = ref<any>([]);
  const loading = ref(false);
  const authToken = ref("");

  authToken.value = localStorage.getItem('access_token') ?? ""

  const headers = {
    // Accept: "*/*",
    // "Content-type": "application/json",
    'Authorization': `Bearer ${authToken.value}`, // Include the Bearer token

  }


  // get Data
  const getData = async () => {
    loading.value = true;
    const { data, pending, error, refresh }: any = await useFetch(`${apiBaseURL}/settings/latest`, {
      headers: headers
    })
    if (error.value?.statusCode == 401) {
      await useAuthStore().logout();
    }

    settings.value = data.value;
    console.log('=============dta=======================');
    console.log(settings.value);
    console.log('====================================');
    if (data.value) {
      loading.value = false
    }
  }
  // post Data
  const updated_ata = async (id: string, payload: any) => {
    errors.value = [];
    loading.value = true;
    const { data, error } = await useFetch(`${apiBaseURL}/settings/${id}`, {
      headers: headers,
      method: 'PATCH',
      body: payload
    })

    if (error.value?.statusCode == 401) {
      useAuthStore().logout();
    }
    console.log('====================================');
    console.log(error.value?.data.errors);
    console.log('====================================');
    if (error.value?.statusCode == 400) {
      errors.value = error.value?.data.errors;

    }
    if (data.value) {
      await getData()
      loading.value = false
      return true
    }
  }

  // Call getData
  getData()


  return { settings, loading, errors, getData, updated_ata }
})

