import { Stock, StockForm } from "~/types";

export const useStocksStore = defineStore('stock', () => {
  const stocks = ref<Stock[]>([]);
  const errors = ref<any>([]);
  const loading = ref(false);
  const authToken = ref("");
 
  authToken.value = localStorage.getItem('access_token') ?? ""

  const headers = {
    Accept: "*/*",
    "Content-type": "application/json",
    'Authorization': `Bearer ${authToken.value}`, // Include the Bearer token

  }

  const stocksCount = () => {
    return stocks.value.length
  }
  // get Data
  const getData = async () => {
    loading.value = true;
    const { data, pending, error, refresh }: any = await useFetch(`${apiBaseURL}/stocks`, {
      headers: headers
    })
    if (error.value?.statusCode == 401) {
      await useAuthStore().logout();
    }

    stocks.value = data.value;
    console.log('=============dta=======================');
    console.log(stocks.value);
    console.log('====================================');
    if (data.value) {
      loading.value = false
    }
  }
  // post Data
  const postData = async (payload: StockForm) => {
    errors.value = [];
    console.log('================post====================');
    console.log(payload);
    console.log('====================================');
    const { data, error } = await useFetch(`${apiBaseURL}/stocks`, {
      headers: headers,
      method: 'POST',
      body: {...payload}
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

  const updateData = async (payload: StockForm, id: string) => {
    errors.value = [];
    const { data, error } = await useFetch(`${apiBaseURL}/stocks/${id}`, {
      method: 'PATCH',
      headers: headers,
      body: payload
    })

    if (error.value?.statusCode == 401) {
      useAuthStore().logout();
    }
    if (error.value?.statusCode == 400) {
      errors.value = error.value?.data.errors;
    }
    if (data.value) {
      await getData()

      return true
    }
  }

  const deleteData = async (id: string) => {
    const { data, error } = await useFetch(`${apiBaseURL}/stocks/${id}`, {
      method: 'DELETE',
      headers: headers,
    })
    await getData()
  }
  // Call getData
  getData()


  return { stocks, loading, errors, stocksCount, getData, postData, updateData, deleteData }
})

