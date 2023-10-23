import FirestoreService from "~/services/FirestoreService";
import { Stock, StockForm } from "~/types";

export const useStocksStore = defineStore('stock', () => {
  const stocks = ref<Stock[]>([]);
  const errors = ref<any>([]);
  const loading = ref(false);
  const firestoreService = new FirestoreService();
  const collectionName = 'stocks'
  const stocksCount = () => {
    return stocks.value.length
  }
  // get Data
  const getData = async () => {
    loading.value = true;
    await firestoreService.getListFromCollection(collectionName).then((data) => {
      stocks.value = data;
      loading.value = false;
    })
  }
  // GET one data
  const getStock = async (docId: string): Promise<Stock> => {
    const res: Stock = await firestoreService.get(collectionName, docId)
    return res;
  }
  // post Data
  const postData = async (payload: StockForm) => {
    const status = await firestoreService.create(collectionName, payload)
    await getData();
    return status;
  }

  const updateData = async (payload: StockForm, docId: string) => {

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


  return { stocks, loading, errors, stocksCount, getData,getStock, postData, updateData, deleteData }
})

