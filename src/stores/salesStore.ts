import type { Sale, SaleForm } from "~/types";

export const useSalesStore = defineStore('sale', () => {
  const sales = ref<Sale[]>([]);
  const errors = ref<any>([]);
  const loading = ref(false);
  const authToken = ref("");
 
  authToken.value = localStorage.getItem('access_token') ?? ""

  const headers = {
    Accept: "*/*",
    "Content-type": "application/json",
    'Authorization': `Bearer ${authToken.value}`, // Include the Bearer token

  }

  const salesCount = () => {
    return sales.value.length
  }
  // get Data
  const getData = async () => {
    loading.value = true;
    const { data, pending, error, refresh }: any = await useFetch(`${apiBaseURL}/sales`, {
      headers: headers
    })
    if (error.value?.statusCode == 401) {
      await useAuthStore().logout();
    }

    sales.value = data.value;
    console.log('=============dta=======================');
    console.log(sales.value);
    console.log('====================================');
    if (data.value) {
      loading.value = false
    }
  }
  const getSale=async(saleId:string):Promise<Sale>=>{
    loading.value = true
    const { data, pending, error, refresh }: any = await useFetch(`${apiBaseURL}/sales/${saleId}`, {
      headers: headers
    })
    if (error.value?.statusCode == 401) {
      await useAuthStore().logout();
    }

    console.log('=============dtaonly=======================');
    console.log(data.value);
    console.log('====================================');
    if (data.value) {
      loading.value = false
    }
      return data.value

  }
  // post Data
  const postData = async (payload: SaleForm) => {
    errors.value = [];
    console.log('================post====================');
    console.log(payload);
    console.log('====================================');
    const { data, error } = await useFetch(`${apiBaseURL}/sales`, {
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

  const postPayDebt = async (payload: any, sale_id:string) => {
    errors.value = [];
    console.log('================post====================');
    console.log(payload);
    console.log('====================================');
    const { data, error } = await useFetch(`${apiBaseURL}/sales/debt-payments/${sale_id}`, {
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


  const deleteData = async (id: string) => {
    const { data, error } = await useFetch(`${apiBaseURL}/sales/${id}`, {
      method: 'DELETE',
      headers: headers,
    })
    await getData()
  }
  // Call getData
  getData()


  return { sales, loading, errors, salesCount, getData,getSale, postData,postPayDebt, deleteData }
})

