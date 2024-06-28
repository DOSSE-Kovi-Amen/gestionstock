import type { Statistic } from "~/types/statistic";

export const useStatisticsStore = defineStore('statistic', () => {
  const stats = ref<Statistic>({
    total: {
      sales: 0,
      products: 0,
      spends: 0,
      losses: 0,
      categories: 0,
      stocks: 1,
      clients: 1,
      suppliers: 1,
      outOfStock: 1,
      chartLine: undefined
    },

    day: {
      sales: 0,
      products: 0,
      spends: 0,
      losses: 0,
      categories: 0,
      stocks: 0,
      clients: 0,
      suppliers: 0
    },
    week: {
      sales: 0,
      products: 0,
      spends: 0,
      losses: 0,
      categories: 0,
      stocks: 0,
      clients: 0,
      suppliers: 0
    },
    month: {
      sales: 0,
      products: 0,
      spends: 0,
      losses: 0,
      categories: 0,
      stocks: 1,
      clients: 1,
      suppliers: 1
    },
    year: {
      sales: 0,
      products: 0,
      spends: 0,
      losses: 0,
      categories: 0,
      stocks: 0,
      clients: 0,
      suppliers: 0
    }
  });
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
    const { data, pending, error, refresh }: any = await useFetch(`${apiBaseURL}/statistics/2024`, {
      headers: headers
    })
    if (error.value?.statusCode == 401) {
      await useAuthStore().logout();
    }

    stats.value = data.value;
    console.log('=============dta=======================');
    console.log(stats.value);
    console.log('====================================');
    if (data.value) {
      loading.value = false
    }
  }
  // post Data
  
  // Call getData
  getData()


  return { loading, getData, stats }
})

