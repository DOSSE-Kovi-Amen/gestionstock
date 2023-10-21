import FirestoreService from "~/services/FIrestoreService";
import { Client, ClientForm } from "~/types";

export const useClientsStore = defineStore('client', () => {
  const clients = ref<Client[]>([]);
  const errors = ref<any>([]);
  const loading = ref(false);
  const firestoreService = new FirestoreService();
  const collectionName = 'clients'
  const clientsCount = () => {
    return clients.value.length
  }
  // get Data
  const getData = async () => {
    loading.value = true;
    await firestoreService.getListFromCollection(collectionName).then((data) => {
      clients.value = data;
      loading.value = false;
    })
  }
  // post Data
  const postData = async (payload: ClientForm) => {
    const status = await firestoreService.create(collectionName, payload)
    await getData();
    return status;
  }

  const updateData = async (payload: ClientForm, docId:string) => {

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


  return { clients, loading, errors, clientsCount, getData, postData, updateData, deleteData }
})

