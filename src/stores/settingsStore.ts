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
  const postData = async (payload: any) => {
    errors.value = [];
    console.log('================post====================');
    console.log(payload);
    console.log('====================================');
    const { data, error } = await useFetch(`${apiBaseURL}/settings`, {
      headers: headers,
      method: 'POST',
      body: { ...payload }
    })

    if (error.value?.statusCode == 401) {
      useAuthStore().logout();
    }
    console.log('====================================');
    console.log(error.value?.message);
    console.log('====================================');
    if (error.value?.statusCode == 400) {
      errors.value = error.value?.data.message;

    }
    if (data.value) {
      await getData()

      return true
    }
  }
 
  // Call getData
  getData()


  return { settings, loading, errors, getData, postData }
})

