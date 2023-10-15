import FirestoreService from "~/services/FIrestoreService";
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
    await firestoreService.getListFromCollection(collectionName).then((data) => {
      categories.value = data;
      loading.value = false;
    })
  }
  // post Data
  const postData = async (payload: CategoryForm) => {
    const status = await firestoreService.create(collectionName, payload)
    await getData();
    return status;
  }

  const updateData = async (payload: CategoryForm, docId:string) => {

    const status = await firestoreService.update(collectionName, docId, payload)
    await getData();
    return status;
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
