import type { Product, ProductForm } from "~/types";

export const useProductsStore = defineStore('product', () => {
  const products = ref<Product[]>([]);
  const errors = ref<any>([]);
  const loading = ref(false);
  const authToken = ref("");
 
  authToken.value = localStorage.getItem('access_token') ?? ""

  const headers = {
    // Accept: "*/*",
    // "Content-type": "application/json",
    'Authorization': `Bearer ${authToken.value}`, // Include the Bearer token

  }

  const productsCount = () => {
    return products.value.length
  }
  // get Data
  const getData = async () => {
    loading.value = true;
    const { data, pending, error, refresh }: any = await useFetch(`${apiBaseURL}/products`, {
      headers: headers
    })
    if (error.value?.statusCode == 401) {
      await useAuthStore().logout();
    }

    products.value = data.value;
    console.log('=============dta=======================');
    console.log(products.value);
    console.log('====================================');
    if (data.value) {
      loading.value = false
    }
  }

  const getLowProducts = async () => {
    loading.value = true;
    const { data, pending, error, refresh }: any = await useFetch(`${apiBaseURL}/low-stock-products`, {
      headers: headers
    })
    if (error.value?.statusCode == 401) {
      await useAuthStore().logout();
    }

    products.value = data.value;
    console.log('=============dta=======================');
    console.log(products.value);
    console.log('====================================');
    if (data.value) {
      loading.value = false
    }
  }

  const getProduct=async(productId:string):Promise<Product>=>{
    loading.value = true
    const { data, pending, error, refresh }: any = await useFetch(`${apiBaseURL}/sales/${productId}`, {
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
  const postData = async (payload: any) => {
    errors.value = [];
    
    const { data, error } = await useFetch(`${apiBaseURL}/products`, {
      headers: headers,
      method: 'POST',
      body: payload
    })

    if (error.value?.statusCode == 401) {
      useAuthStore().logout();
    }
    console.log('=================error===================');
    console.log(error.value?.data);
    console.log('====================================');
    if (error.value?.statusCode == 422) {
      errors.value = error.value?.data.errors;
    
    }
    if (data.value) {
      await getData()

      return true
    }
  }

  const updatedData = async (payload: any, id: string) => {
    errors.value = [];
    console.log('=================v===================');
    console.log(id);
    console.log('====================================');
    const { data, error } = await useFetch(`${apiBaseURL}/products/${id}`, {
      method: 'POST',
      headers: headers,
      body: payload
    })

    if (error.value?.statusCode == 401) {
      useAuthStore().logout();
    }
    console.log('====================================');
    console.log(error.value?.message);
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
    const { data, error } = await useFetch(`${apiBaseURL}/products/${id}`, {
      method: 'DELETE',
      headers: headers,
    })
    await getData()
  }
  // Call getData
  // getData()


  return { products, loading, errors, productsCount,getProduct, getData,getLowProducts, postData, updatedData, deleteData }
})

