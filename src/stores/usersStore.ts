import type { User, UserCreate } from "~/types/user";

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
    console.log('=============dta users=======================');
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
    const { data, error } = await useFetch(`${apiBaseURL}/users`, {
      headers: headers,
      method: 'POST',
      body: { ...payload }
    })

    if (error.value?.statusCode == 401) {
      useAuthStore().logout();
    }
    console.log('====================================');
    console.log(error.value?.data);
    console.log('====================================');
    if (error.value?.statusCode == 422) {
      errors.value = error.value?.data.errors;

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
    if (error.value?.statusCode == 422) {
      errors.value = error.value?.data.errors;
    }
    if (data.value) {
      await getData()

      return data.value
    } else {

    }
  }

  const updatedData = async (id: string, payload: any) => {
    const { data, error } = await useFetch(`${apiBaseURL}/users/${id}`, {
      method: 'PUT',
      headers: headers,
      body: { ...{ name: payload.name } }
    })

    if (error.value?.statusCode == 401) {
      useAuthStore().logout();
    }
    if (error.value?.statusCode == 422) {
      console.log('====================================');
      console.log(error.value?.data.message);
      console.log('====================================');
      errors.value = error.value?.data.message;
    }
    if (data.value) {
      await getData()

      return true
    }
  }

  const updateRole = async (id: string, payload: any) => {
    const { data, error } = await useFetch(`${apiBaseURL}/users/edit-roles/${id}`, {
      method: 'PUT',
      headers: headers,
      body: { ...{ roles: payload.roles } }
    })
    console.log('=================good===================');
    console.log(payload);
    console.log('====================================');

    if (error.value?.statusCode == 401) {
      useAuthStore().logout();
    }
    if (error.value?.statusCode == 422) {
      console.log('====================================');
      console.log(error.value?.data.message);
      console.log('====================================');
      errors.value = error.value?.data.message;
    }
    if (data.value) {
      await getData()

      return true
    }
  }

  const updatedProfileData = async ( payload: any) => {
    errors.value = [];

    const { data, error } = await useFetch(`${apiBaseURL}/user/profile-info`, {
      method: 'PUT',
      headers: headers,
      body:{...payload}
    })
    console.log('====================================');
    console.log(payload);
    console.log('====================================');

    if (error.value?.statusCode == 401) {
      useAuthStore().logout();
    }
    if (error.value?.statusCode == 422) {
      console.log('====================================');
      console.log(error.value?.data.errors);
      console.log('====================================');
      errors.value = error.value?.data.errors;
    }
    if (data.value) {
      await getData()

      return true
    }
  }
  const updateProfilePhoto = async (payload: any) => {
    errors.value = [];
    const { data, error } = await useFetch(`${apiBaseURL}/user/profile-photo`, {
      method: 'POST',
      headers: headers,
      body: payload
    })
    console.log('=================error===================');
    console.log(error.value?.data.errors);
    console.log('====================================');

    if (error.value?.statusCode == 401) {
      useAuthStore().logout();
    }
    if (error.value?.statusCode == 422) {
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

    const changePwd = async ( payload: any) => {
    const { data, error } = await useFetch(`${apiBaseURL}/user/change-password`, {
      method: 'PATCH',
      headers: headers,
      body: {...payload}
    })

    if (error.value?.statusCode == 401) {
      useAuthStore().logout();
    }
    if (error.value?.statusCode == 422) {
      console.log('=================error===================');
      console.log(error.value.data.errors);
      console.log('====================================');

      errors.value = error.value?.data.errors;
    }
    console.log('====================================');
    console.log(data.value);
    console.log('====================================');
    if (data.value) {
      return true
      
    }

  }

  
  // Call getData
  getData()


  return { users, loading, errors, usersCount, updateProfilePhoto,changePwd, updatedProfileData, updateRole, getData, retrieveData, createUser, updatedData, deleteData }
})

