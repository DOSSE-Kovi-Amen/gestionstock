import type { Category, CategoryForm } from "~/types";
import type { InventoryItem } from "~/types/inventory";

export const useInventoryStore = defineStore('inventory', () => {
  const inventory = ref<InventoryItem[]>([]);
  const errors = ref<any>([]);
  const loading = ref(false);
  const authToken = ref("");
 
  authToken.value = localStorage.getItem('access_token') ?? ""

  const headers = {
    Accept: "*/*",
    "Content-type": "application/json",
    'Authorization': `Bearer ${authToken.value}`, // Include the Bearer token

  }

  // get Data
  const getData = async () => {
    loading.value = true;
    const { data, pending, error, refresh }: any = await useFetch(`${apiBaseURL}/inventory`, {
      headers: headers
    })
    if (error.value?.statusCode == 401) {
      await useAuthStore().logout();
    }

    inventory.value = data.value;
    console.log('=============dta=======================');
    console.log(inventory.value);
    console.log('====================================');
    if (data.value) {
      loading.value = false
    }
  }
  const getDataByDateFilter = async (startDate:any,endDate:any) => {
    loading.value = true;
    const { data, pending, error, refresh }: any = await useFetch(`${apiBaseURL}/inventory?start_date=${startDate}&end_date=${endDate}`, {
      headers: headers
    })
    if (error.value?.statusCode == 401) {
      await useAuthStore().logout();
    }

    inventory.value = data.value;
    console.log('=============dta=======================');
    console.log(inventory.value);
    console.log('====================================');
    if (data.value) {
      loading.value = false
    }
  }
  // Call getData
  getData()


  return {inventory,getDataByDateFilter,loading, getData,  }
})

