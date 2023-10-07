import { Property } from "~/types";

export const usePropertiesStore = defineStore('property', () => {
  const properties = ref<Property[]>([]);
  const errors = ref<any>([]);
  const authToken = ref("");
  authToken.value = localStorage.getItem('access_token') ?? ""

  const headers = {
    Accept: "*/*",
    "Content-type": "application/json",
    'Authorization': `Bearer ${authToken.value}`, // Include the Bearer token

  }

  const propertiesCount = () => {
    return properties.value.length
  }

  const getData = async () => {

    const { data, pending, error, refresh }: any = await useFetch(`${apiBaseURL}/properties/`, {
      headers: headers
    })
    if (error.value?.statusCode == 401) {
      await useAuthStore().logout();
    }
    properties.value = data.value?.data;
  }

  const postData = async (payload: Property) => {
    errors.value=[];
    const { data, error } = await useFetch(`${apiBaseURL}/organizations/create`, {
      method: 'POST',
      headers: headers,
      body: payload
    })

    if (error.value?.statusCode == 401) {
       useAuthStore().logout();
    }
    if (error.value?.statusCode == 400) {
      errors.value= error.value?.data.errors;
    }
    if (data.value) {
      await getData()

      return true
    }

  }

  const editData = async (payload: Property) => {
    errors.value=[];
    const { data, error } = await useFetch(`${apiBaseURL}/organizations/${payload.id}update`, {
      method: 'POST',
      headers: headers,
      body: payload
    })

    if (error.value?.statusCode == 401) {
       useAuthStore().logout();
    }
    if (error.value?.statusCode == 400) {
      errors.value= error.value?.data.errors;
    }
    if (data.value) {
      await getData()

      return true
    }

  }

  const deleteData = async (id: string) => {
    const { data, pending, error, refresh }: any = await useFetch(`${apiBaseURL}/organizations/${id}/delete`, {
      method: 'DELETE',
      headers: headers,
    })
    if (error.value?.statusCode == 401) {
      useAuthStore().logout();
    }
    await getData()

  }
  // Call getData
  getData()


  return { properties, errors, propertiesCount, getData, postData,editData, deleteData }
})

