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
  const getData = async () => {
    loading.value=true;
    await firestoreService.getListFromCollection(collectionName).then((data) => {
      products.value = data;
      loading.value=false;

    })
  }
  // const getRealTimeData = async () => {
  //   loading.value = true;
  //   firestoreService.getRealTime(collectionName, (data) => {
  //     console.log('====================================');
  //     console.log(data);
  //     console.log('====================================');
  //     products.value = data;
  //     loading.value = false;

  //   })
  // }
  // post Data
  const postData = async (payload: ProductForm) => {
    const status = await firestoreService.create(collectionName, payload)
    await getData();
    return status;
  }
  const updateData = async (payload: ProductForm, docId: string) => {

    const status = await firestoreService.update(collectionName, docId, payload)
    await getData();
    return status;
  }
  const deleteData = async (id: string,imageUrl:string) => {
    console.log('===============id=====================');
    console.log(id);
    console.log('====================================');
    await firestoreService.delete(collectionName, id)
    await getData()
  }
  // Call getData
  getData()


  return { products, loading, errors, productsCount, getData, updateData, postData, deleteData }
})

