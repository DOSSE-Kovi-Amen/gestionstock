import FirestoreService from "~/services/FirestoreService";
import {LossForm, Loss } from "~/types";

export const useLossesStore = defineStore('loss', () => {
  const losses = ref<Loss[]>([]);
  const errors = ref<any>([]);
  const loading = ref(false);
  const firestoreService = new FirestoreService();
  const collectionName = 'losses'
  const lossesCount = () => {
    return losses.value.length
  }
  // get Data
  const getData = async () => {
    loading.value = true;
    await firestoreService.getListFromCollection(collectionName).then((data) => {
      losses.value = data;
      loading.value = false;
    })
  }
  // post Data
  const postData = async (payload:LossForm) => {
    const status = await firestoreService.create(collectionName, payload)
    await getData();
    return status;
  }

  const updateData = async (payload:LossForm, docId:string) => {

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


  return { losses, loading, errors, lossesCount, getData, postData, updateData, deleteData }
})

