import FirestoreService from "~/services/FIrestoreService";
import {SpendForm, Spend } from "~/types";

export const useSpendsStore = defineStore('spend', () => {
  const spends = ref<Spend[]>([]);
  const errors = ref<any>([]);
  const loading = ref(false);
  const firestoreService = new FirestoreService();
  const collectionName = 'spends'
  const spendsCount = () => {
    return spends.value.length
  }
  // get Data
  const getData = async () => {
    loading.value = true;
    await firestoreService.getListFromCollection(collectionName).then((data) => {
      spends.value = data;
      loading.value = false;
    })
  }
  // post Data
  const postData = async (payload:SpendForm) => {
    const status = await firestoreService.create(collectionName, payload)
    await getData();
    return status;
  }

  const updateData = async (payload:SpendForm, docId:string) => {

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


  return { spends, loading, errors, spendsCount, getData, postData, updateData, deleteData }
})

