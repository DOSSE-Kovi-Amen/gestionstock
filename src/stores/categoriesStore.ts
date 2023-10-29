import FirestoreService from "~/services/FirestoreService";
import { Category, CategoryForm } from "~/types";

export const useCategoriesStore = defineStore('category', () => {
  const categories = ref<Category[]>([]);
  const errors = ref<any>([]);
  const loading = ref(false);
  const firestoreService = new FirestoreService();
  const collectionName = 'categories'
  const categoriesCount = () => {
    return categories.value.length
  }
  // get Data
  const getData = async () => {
    loading.value = true;
    const { data, pending, error, refresh }: any = await useFetch(`${apiBaseURL}/categories`, {
      // headers: headers
    })
    if (error.value?.statusCode == 401) {
      // await useAuthStore().logout();
    }
    console.log('====================================');
    console.log(data.value);
    console.log('====================================');
    categories.value = data.value;
    console.log('====================================');
    console.log(categories.value);
    console.log('====================================');
    if(data.value){
      loading.value=false
    }
  }
  // post Data
  const postData = async (payload: CategoryForm) => {
    errors.value=[];
    const { data, error } = await useFetch(`${apiBaseURL}/users/create`, {
      method: 'POST',
      headers: headers,
      body: payload
    })

    if (error.value?.statusCode == 401) {
       useAuthStore().logout();
    }
    if (error.value?.statusCode == 400) {
      errors.value= error.value?.data.errors;
    }
    if (data.value) {
      await getData()

      return true
    }
  }

  const updateData = async (payload: CategoryForm, id:string) => {
    errors.value=[];
    const { data, error } = await useFetch(`${apiBaseURL}/categories/${id}`, {
      method: 'PATCH',
      // headers: headers,
      body: payload
    })

    if (error.value?.statusCode == 401) {
       useAuthStore().logout();
    }
    if (error.value?.statusCode == 400) {
      errors.value= error.value?.data.errors;
    }
    if (data.value) {
      await getData()

      return true
    }
  }

  const deleteData = async (id: string) => {
    console.log('===============id=====================');
    console.log(id);
    console.log('====================================');
    await firestoreService.delete(collectionName, id)
    await getData()
  }
  // Call getData
  getData()


  return { categories, loading, errors, categoriesCount, getData, postData, updateData, deleteData }
})

