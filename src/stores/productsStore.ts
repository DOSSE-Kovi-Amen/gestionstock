import FirestoreService from "~/services/FirestoreService";
import { Product, ProductForm } from "~/types";

export const useProductsStore = defineStore('product', () => {
  const products = ref<Product[]>([]);
  const errors = ref<any>([]);
  const loading = ref(false);
  const firestoreService = new FirestoreService();
  const collectionName = 'products'
  const productsCount = () => {
    return products.value.length
  }
  // get Data
  // const getData = async () => {
  //   loading.value=true;
  //   await firestoreService.getListFromCollection(collectionName).then((data) => {
  //     products.value = data;
  //     loading.value=false;

  //   })
  // }

  // GET one data
  const getProduct = async (docId:string):Promise<Product>=>{
   const res:Product=await firestoreService.get(collectionName,docId)
   return res;
  }
  const getRealTimeData = async () => {
    loading.value = true;
    firestoreService.getRealTime(collectionName, (data) => {
      products.value = data;
      loading.value = false;
    })
  }
  // post Data
  const postData = async (payload: ProductForm) => {
    const status = await firestoreService.create(collectionName, payload)
    // await getData();
    return status;
  }
  const updateData = async (payload: ProductForm|any, docId: string) => {

    const status = await firestoreService.update(collectionName, docId, payload)
    // await getData();
    return status;
  }
  const deleteData = async (id: string,imageUrl:string) => {
    console.log('===============id=====================');
    console.log(id);
    console.log('====================================');
    await firestoreService.delete(collectionName, id)
    // await getData()
  }
  // Call getData
  getRealTimeData()


  return { products, loading, errors, productsCount,getProduct, updateData, postData, deleteData }
})

