import FirestoreService from "~/services/FirestoreService";
import { Sale } from "~/types";

export const useSalesStore = defineStore('sale', () => {
  const sales = ref<Sale[]>([]);
  const errors = ref<any>([]);
  const loading = ref(false);
  const firestoreService = new FirestoreService();
  const collectionName = 'sales'
  const salesCount = () => {
    return sales.value.length
  }
  // get Data
  const getData = async () => {
    loading.value = true;
    await firestoreService.getListFromCollection(collectionName).then((data) => {
      sales.value = data;
      loading.value = false;
    })
  }
  // post Data
  const postData = async (payload: any) => {
    const status = await firestoreService.create(collectionName, payload)
    await getData();
    return status;
  }

  const updateData = async (payload: any, docId:string) => {

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


  return { sales, loading, errors, salesCount, getData, postData, updateData, deleteData }
})

