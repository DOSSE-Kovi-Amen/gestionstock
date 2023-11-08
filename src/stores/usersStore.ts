import { User, UserCreate } from "~/types/user";

export const useUsersStore = defineStore('user', () => {
  const users = ref<User[]>([]);
  const errors = ref<any>([]);
  const loading = ref(false);
  const authToken = ref("");
 
  authToken.value = localStorage.getItem('access_token') ?? ""

  const headers = {
    // Accept: "*/*",
    // "Content-type": "application/json",
    'Authorization': `Bearer ${authToken.value}`, // Include the Bearer token

  }

  const usersCount = () => {
    return users.value.length
  }
  // get Data
  const getData = async () => {
    loading.value = true;
    const { data, pending, error, refresh }: any = await useFetch(`${apiBaseURL}/users`, {
      headers: headers
    })
    if (error.value?.statusCode == 401) {
      await useAuthStore().logout();
    }

    users.value = data.value;
    console.log('=============dta=======================');
    console.log(users.value);
    console.log('====================================');
    if (data.value) {
      loading.value = false
    }
  }
  // post Data
  const createUser = async (payload: UserCreate) => {
    errors.value = [];
    console.log('================post====================');
    console.log(payload);
    console.log('====================================');
    const { data, error } = await useFetch(`${apiBaseURL}/auth/register`, {
      headers: headers,
      method: 'POST',
      body: {...payload}
    })

    if (error.value?.statusCode == 401) {
      useAuthStore().logout();
    }
    console.log('====================================');
    console.log(error.value?.message);
    console.log('====================================');
    if (error.value?.statusCode == 400) {
      errors.value = error.value?.data.message;
    
    }
    if (data.value) {
      await getData()

      return true
    }
  }
  const retrieveData = async (id: string) => {
    errors.value = [];
    const { data, error } = await useFetch(`${apiBaseURL}/users/${id}`, {
      method: 'GET',
      headers: headers,
    })

    if (error.value?.statusCode == 401) {
      useAuthStore().logout();
    }
    if (error.value?.statusCode == 400) {
      errors.value = error.value?.data.errors;
    }
    if (data.value) {
      await getData()

      return data.value
    } else{
      
    }
  }

  const updateData = async (payload: any, id: string) => {
    errors.value = [];
    const { data, error } = await useFetch(`${apiBaseURL}/users/${id}`, {
      method: 'PATCH',
      headers: headers,
      body: payload
    })

    if (error.value?.statusCode == 401) {
      useAuthStore().logout();
    }
    if (error.value?.statusCode == 400) {
      errors.value = error.value?.data.errors;
    }
    if (data.value) {
      await getData()

      return true
    }
  }
  const updatePhoto = async (payload: any, id: string) => {
    errors.value = [];
    const { data, error } = await useFetch(`${apiBaseURL}/users/edit-photo/${id}`, {
      method: 'PATCH',
      headers: headers,
      body: payload
    })
    console.log('=================error===================');
    console.log(data.value);
    console.log('====================================');

    if (error.value?.statusCode == 401) {
      useAuthStore().logout();
    }
    if (error.value?.statusCode == 400) {
      errors.value = error.value?.data.errors;
    }
    if (data.value) {
      await getData()

      return true
    }
  }
  const deleteData = async (id: string) => {
    const { data, error } = await useFetch(`${apiBaseURL}/users/${id}`, {
      method: 'DELETE',
      headers: headers,
    })
    await getData()
  }
  // Call getData
  getData()


  return { users, loading, errors, usersCount,updatePhoto, getData,retrieveData, createUser, updateData, deleteData }
})

