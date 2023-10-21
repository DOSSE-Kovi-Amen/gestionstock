import FirestoreService from "~/services/FirestoreService";
import { Supplier, SupplierForm } from "~/types";

export const useSuppliersStore = defineStore('supplier', () => {
  const suppliers = ref<Supplier[]>([]);
  const errors = ref<any>([]);
  const loading = ref(false);
  const firestoreService = new FirestoreService();
  const collectionName = 'suppliers'
  const suppliersCount = () => {
    return suppliers.value.length
  }
  // get Data
  const getData = async () => {
    loading.value = true;
    await firestoreService.getListFromCollection(collectionName).then((data) => {
      suppliers.value = data;
      loading.value = false;
    })
  }
  // post Data
  const postData = async (payload: SupplierForm) => {
    const status = await firestoreService.create(collectionName, payload)
    await getData();
    return status;
  }

  const updateData = async (payload: SupplierForm, docId:string) => {

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


  return { suppliers, loading, errors, suppliersCount, getData, postData, updateData, deleteData }
})

