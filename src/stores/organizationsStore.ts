import { Organization } from "~/types";

export const useOrganizationsStore = defineStore('organization', () => {
  const orgs = ref<Organization[]>([]);
  const errors = ref<any>([]);
  const authToken = ref("");
  authToken.value = localStorage.getItem('access_token') ?? ""

  const headers = {
    Accept: "*/*",
    "Content-type": "application/json",
    'Authorization': `Bearer ${authToken.value}`, // Include the Bearer token

  }

  const orgsCount = () => {
    return orgs.value.length
  }

  const getData = async () => {

    const { data, pending, error, refresh }: any = await useFetch(`${apiBaseURL}/organizations/list`, {
      headers: headers
    })
    if (error.value?.statusCode == 401) {
      await useAuthStore().logout();
    }
    orgs.value = data.value?.data;
  }

  const postData = async (payload: Organization) => {
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

  const editData = async (payload: Organization) => {
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


  return { orgs, errors, orgsCount, getData, postData,editData, deleteData }
})

