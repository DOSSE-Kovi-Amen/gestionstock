import type { LossForm, Loss } from "~/types";

export const useLossesStore = defineStore('loss', () => {
  const losses = ref<Loss[]>([]);
  const errors = ref<any>([]);
  const loading = ref(false);
  const authToken = ref("");
 
  authToken.value = localStorage.getItem('access_token') ?? ""

  const headers = {
    Accept: "*/*",
    "Content-type": "application/json",
    'Authorization': `Bearer ${authToken.value}`, // Include the Bearer token

  }

  const lossesCount = () => {
    return losses.value.length
  }
  // get Data
  const getData = async () => {
    loading.value = true;
    const { data, pending, error, refresh }: any = await useFetch(`${apiBaseURL}/losses`, {
      headers: headers
    })
    if (error.value?.statusCode == 401) {
      await useAuthStore().logout();
    }

    losses.value = data.value;
    console.log('=============dta=======================');
    console.log(losses.value);
    console.log('====================================');
    if (data.value) {
      loading.value = false
    }
  }
  // post Data
  const postData = async (payload: LossForm) => {
    errors.value = [];
    console.log('================post====================');
    console.log(payload);
    console.log('====================================');
    const { data, error } = await useFetch(`${apiBaseURL}/losses`, {
      headers: headers,
      method: 'POST',
      body: {...payload}
    })

    if (error.value?.statusCode == 401) {
      useAuthStore().logout();
    }
    console.log('====================================');
    console.log(error.value?.data.errors);
    console.log('====================================');
    if (error.value?.statusCode == 422) {
      errors.value = error.value?.data.errors;
    
    }
    if (data.value) {
      await getData()

      return true
    }
  }

  const updatedData = async (payload: LossForm, id: string) => {
    errors.value = [];
    const { data, error } = await useFetch(`${apiBaseURL}/losses/${id}`, {
      method: 'PATCH',
      headers: headers,
      body: {...payload}
    })

    if (error.value?.statusCode == 401) {
      useAuthStore().logout();
    }
    if (error.value?.statusCode == 422) {
      errors.value = error.value?.data.errors;
    }
    if (data.value) {
      await getData()

      return true
    }
  }

  const deleteData = async (id: string) => {
    const { data, error } = await useFetch(`${apiBaseURL}/losses/${id}`, {
      method: 'DELETE',
      headers: headers,
    })
    await getData()
  }
  // Call getData
  getData()


  return { losses, loading, errors, lossesCount, getData, postData, updatedData, deleteData }
})

