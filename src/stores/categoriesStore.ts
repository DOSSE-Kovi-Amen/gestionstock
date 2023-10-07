import FirestoreService from "~/services/FIrestoreService";
import { Category, CategoryForm } from "~/types";
import { User, UserCreate, UserList } from "~/types/types";

export const useCategoriesStore = defineStore('category', () => {
  const categories = ref<Category[]>([]);
  const errors = ref<any>([]);
  const authToken = ref("");
  const firestoreService = new FirestoreService();
  authToken.value = localStorage.getItem('access_token') ?? ""

  const headers = {
    Accept: "*/*",
    "Content-type": "application/json",
    'Authorization': `Bearer ${authToken.value}`, // Include the Bearer token

  }

  const categoriesCount = () => {
    return categories.value.length
  }

  const getData = async () => {
    await firestoreService.getListFromCollection('categories').then((data) => {
      categories.value = data;

    })
  }

  const postData = async (payload: CategoryForm) => {
    await firestoreService.create('categories', payload);
  }

  const deleteData = async (id: string) => {
    const { data, pending, error, refresh }: any = await useFetch(`${apiBaseURL}/categories/${id}/delete`, {
      method: 'DELETE',
      headers: headers,
    })
    if (error.value?.statusCode == 401) {
      useAuthStore().logout();
    }
    await getData()

  }
  // Call getData
  getData()


  return { categories, errors, categoriesCount, getData, postData, deleteData }
})

