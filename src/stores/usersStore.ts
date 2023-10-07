import { User, UserCreate, UserList } from "~/types/types";

export const useUsersStore = defineStore('user', () => {
  const users = ref<UserList[]>([]);
  const errors = ref<any>([]);
  const authToken = ref("");
  authToken.value = localStorage.getItem('access_token') ?? ""

  const headers = {
    Accept: "*/*",
    "Content-type": "application/json",
    'Authorization': `Bearer ${authToken.value}`, // Include the Bearer token

  }

  const usersCount = () => {
    return users.value.length
  }

  const getData = async () => {

    const { data, pending, error, refresh }: any = await useFetch(`${apiBaseURL}/users/list`, {
      headers: headers
    })
    if (error.value?.statusCode == 401) {
      await useAuthStore().logout();
    }
    users.value = data.value?.data;
  }

  const postData = async (payload: UserCreate) => {
    errors.value=[];
    const { data, error } = await useFetch(`${apiBaseURL}/users/create`, {
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
    const { data, pending, error, refresh }: any = await useFetch(`${apiBaseURL}/users/${id}/delete`, {
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


  return { users, errors, usersCount, getData, postData, deleteData }
})

