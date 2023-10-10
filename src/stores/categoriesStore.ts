import FirestoreService from "~/services/FIrestoreService";
import { Category, CategoryForm } from "~/types";

export const useCategoriesStore = defineStore('category', () => {
  const categories = ref<Category[]>([]);
  const errors = ref<any>([]);
  const firestoreService = new FirestoreService();
  const collectionName= 'categories'
  const categoriesCount = () => {
    return categories.value.length
  }
  // get Data
  const getData = async () => {
    await firestoreService.getListFromCollection(collectionName).then((data) => {
      categories.value = data;
    })
  }
  // post Data
  const postData = async (payload: CategoryForm) => {
    const status = await firestoreService.create(collectionName, payload)
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


  return { categories, errors, categoriesCount, getData, postData, deleteData }
})

