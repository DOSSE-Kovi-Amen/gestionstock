import { Category, CategoryForm } from "~/types";

export const useCategoriesStore = defineStore('category', () => {
  const categories = ref<Category[]>([]);
  const errors = ref<any>([]);
  const loading = ref(false);
  const collectionName = 'categories'
  const authToken = ref("");
 
  authToken.value = localStorage.getItem('access_token') ?? ""

  const headers = {
    Accept: "*/*",
    "Content-type": "application/json",
    'Authorization': `Bearer ${authToken.value}`, // Include the Bearer token

  }

  const categoriesCount = () => {
    return categories.value.length
  }
  // get Data
  const getData = async () => {
    loading.value = true;
    const { data, pending, error, refresh }: any = await useFetch(`${apiBaseURL}/categories`, {
      headers: headers
    })
    if (error.value?.statusCode == 401) {
      await useAuthStore().logout();
    }

    categories.value = data.value;
    console.log('=============dta=======================');
    console.log(categories.value);
    console.log('====================================');
    if (data.value) {
      loading.value = false
    }
  }
  // post Data
  const postData = async (payload: CategoryForm) => {
    errors.value = [];
    console.log('================post====================');
    console.log(payload);
    console.log('====================================');
    const { data, error } = await useFetch(`${apiBaseURL}/categories`, {
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

  const updateData = async (payload: CategoryForm, id: string) => {
    errors.value = [];
    const { data, error } = await useFetch(`${apiBaseURL}/categories/${id}`, {
      method: 'PATCH',
      headers: headers,
      body: payload
    })

    if (error.value?.statusCode == 401) {
      useAuthStore().logout();
    }
    if (error.value?.statusCode == 400) {
      errors.value = error.value?.data.message;
    }
    if (data.value) {
      await getData()

      return true
    }
  }

  const deleteData = async (id: string) => {
    const { data, error } = await useFetch(`${apiBaseURL}/categories/${id}`, {
      method: 'DELETE',
      headers: headers,
    })
    await getData()
  }
  // Call getData
  getData()


  return { categories, loading, errors, categoriesCount, getData, postData, updateData, deleteData }
})

