import FirestoreService from "~/services/FirestoreService";
import { User, UserCreate } from "~/types/users";

export const useUsersStore = defineStore('user', () => {
  const users = ref<User[]>([]);
  const errors = ref<any>([]);
  const loading = ref(false);
  const firestoreService = new FirestoreService();
  const collectionName = 'users'
  const usersCount = () => {
    return users.value.length
  }
  // get Data
  const getData = async () => {
    loading.value = true;
    await firestoreService.getListFromCollection(collectionName).then((data) => {
      users.value = data;
      loading.value = false;
    })
  }
  // post Data
  const postData = async (payload: UserCreate) => {
    const status = await firestoreService.create(collectionName, payload)
    await getData();
    return status;
  }

  const updateData = async (payload: UserCreate, docId:string) => {

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


  return { users, loading, errors, usersCount, getData, postData, updateData, deleteData }
})

