<template>
  <div>
    <SweetAlert :show="showAlert" title="alertTitle" :message="alertMessage" @on-close="showAlert = false" />
    <ViewUserModal @on-close="isOpenRead = false" :is-open="isOpenRead" :selected-data="selectedData" />

    <!-- Create -->
    <AddUserModal @on-success="(e) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenCreate = false" :is-open="isOpenCreate" />

    <!-- Read -->
    <DeleteUserModal @on-success="(e) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenDelete = false" :is-open="isOpenDelete" :selected-data="selectedData" />

    <button @click="isOpenCreate = true" class="py-2 p-4 shadow-xl btn-primary my-4 text-white"><i
        class="fa-solid fa-circle-plus"></i>
      Ajouter nouveau</button>
    <!-- Liste des users -->
    <div class="p-5 bg-white w-full h-full shadow-2xl rounded-lg bg-opacity-25">

      <Datatable v-if="store.users && store.users.length != 0">
        <thead>
          <tr>
            <th class="px-6 py-3 text-left text-sm font-bold">Nom</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Email</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Agent</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white text-gray-600 divide-y divide-gray-200">
          <tr v-for="(user, index) in store.users" :key="index">
            <td class="px-6 py-4 whitespace-no-wrap">{{ user.attributes.last_name + ' ' + user.attributes.first_name }}
            </td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ user.attributes.email }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">
              <i  v-if="user.attributes.is_agent==true" class="fa fa-check-circle fa-2x text-green-500" aria-hidden="true"></i>
              <i v-else class="fa fa-xmark-circle fa-2x text-red-500" aria-hidden="true"></i>

            </td>
            <td class="flex gap-2">
              <a class="p-0.5 px-2 text-white  bg-yellow-500 hover:bg-yellow-600 shadow-xl rounded-sm"
                @click="openModal(user, 'read')">
                <i class="fa-regular fa-eye"></i>
              </a>
              <a class="p-0.5 px-2 text-white  bg-blue-500 hover:bg-blue-600 shadow-xl rounded-sm" @click="">
                <i class="fa-regular fa-pen-to-square"></i>
              </a>
              <a class="p-0.5 px-2 text-white  bg-red-500 hover:bg-red-600 shadow-xl rounded-sm"
                @click="openModal(user, 'delete')">
                <i class="fa-regular fa-trash-can"></i>
              </a>

            </td>


          </tr>

        </tbody>
      </Datatable>
      <div v-else class="flex flex-col justify-center items-center ">
        <p class="m-2">Chargement en cours...</p>
        <Spinner class="h-12" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>

<script setup lang="ts">
import { UserList } from '~/types/types';
import AddUserModal from '@/components/actions/users/AddUserModal.vue';
import ViewUserModal from '@/components/actions/users/ViewUserModal.vue';
import DeleteUserModal from '@/components/actions/users/DeleteUserModal.vue';

const store = useUsersStore();

const selectedData = ref<UserList>();
const isOpenCreate = ref(false);
const isOpenRead = ref(false);
const isOpenDelete = ref(false);
const isOpenEdit = ref(false);
const showAlert = ref(false);
const alertMessage = ref("");

const openModal = (user: UserList, action: String) => {
  selectedData.value = user


  switch (action) {
    case 'read': isOpenRead.value = true;
      break;
    case 'edit': isOpenEdit.value = true;
      break;
    case 'delete': isOpenDelete.value = true;
      break;
    default:
      break;
  }
  console.log('====================================');
  console.log(isOpenRead.value);
  console.log('====================================');
}
import { collection, addDoc } from "firebase/firestore"; 
const { $db } = useNuxtApp()

try {
  const docRef = await addDoc(collection($db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
// Add a second document with a generated ID.
definePageMeta({
  layout: "main",
});
</script>
~/types/users