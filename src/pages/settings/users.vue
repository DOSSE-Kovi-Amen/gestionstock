<template>
  <div>
    <Settings>
    <SweetAlert :show="showAlert" title="alertTitle" :message="alertMessage" @on-close="showAlert = false" />
    <ViewUserModal @on-close="isOpenRead = false" :is-open="isOpenRead" :selected-data="selectedData" />

    <!-- Create -->
    <AddUserModal @on-success="(e) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenCreate = false" :is-open="isOpenCreate" />
    <EditUserModal @on-success="(e: string) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenEdit = false" :is-open="isOpenEdit" :selected-data="selectedData" />

    <UserRoleModal @on-success="(e: string) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenRole = false" :is-open="isOpenRole" :selected-data="selectedData" />

    <!-- Read -->
    <DeleteUserModal @on-success="(e) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenDelete = false" :is-open="isOpenDelete" :selected-data="selectedData" />

    <button @click="isOpenCreate = true" class="py-2 p-4 shadow-xl rounded-lg btn-primary my-4 text-white"><i
        class="fa-solid fa-circle-plus"></i>
      Ajouter nouveau
    </button>
    <!-- Liste des users -->
    <div class="w-full h-full shadow-2xl rounded-lg bg-opacity-25">

      <Datatable v-if="!store.loading">
        <thead>
          <tr>
            <th class="px-6 py-3 text-left text-sm font-bold">Avatar</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Nom</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Email</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Rôles</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white text-gray-600 divide-y divide-gray-200">
          <tr v-for="(user, index) in store.users" :key="index">
            <td>
              <img v-if="user?.photo" class="rounded-full w-10 h-10 object-cover" :src="apiBaseURL + '/' + user?.photo"
                alt="" srcset="">
              <div v-else class="bg-gray-200 w-8 h-8 flex justify-center items-center rounded-full p-5">
                <i class="fa fa-user"></i>

              </div>

            </td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ user.name }}
            </td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ user.email }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ JSON.parse(user.roles).length!==0?user.roles:'Aucun rôle' }}</td>

            <!-- <td class="px-6 py-4 whitespace-no-wrap">
              <i v-if="user.isOwner == true" class="fa fa-check-circle fa-2x text-green-500" aria-hidden="true"></i>
              <i v-else class="fa fa-xmark-circle fa-2x text-red-500" aria-hidden="true"></i>

            </td> -->
            <td class="flex gap-2">
              <a class="p-0.5 px-2 text-white  bg-yellow-500 hover:bg-yellow-600 shadow-xl rounded-lg"
                @click="openModal(user, 'read')">
                <i class="fa-regular fa-eye"></i>
              </a>
              <a class="p-0.5 px-2 text-white  bg-blue-500 hover:bg-blue-600 shadow-xl rounded-lg"
                @click="openModal(user, 'edit')">
                <i class="fa-regular fa-pen-to-square"></i>
              </a>
              <a class="p-0.5 px-2 text-white  bg-gray-900 hover:bg-black shadow-xl rounded-lg"
                @click="openModal(user, 'role')">
                <i class="fa fa-lock"></i>
              </a>
              <a class="p-0.5 px-2 text-white  bg-red-500 hover:bg-red-600 shadow-xl rounded-lg"
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

      
    </Settings>
  </div>
</template>
<style scoped></style>

<script setup lang="ts">
import AddUserModal from '@/components/actions/users/AddUserModal.vue';
import UserRoleModal from '@/components/actions/users/UserRoleModal.vue';
import ViewUserModal from '@/components/actions/users/ViewUserModal.vue';
import EditUserModal from '@/components/actions/users/EditUserModal.vue';
import DeleteUserModal from '@/components/actions/users/DeleteUserModal.vue';
import { useUsersStore } from "~/stores/usersStore";

const store = useUsersStore();

const selectedData = ref<User>();
const isOpenCreate = ref(false);
const isOpenRead = ref(false);
const isOpenRole = ref(false);
const isOpenDelete = ref(false);
const isOpenEdit = ref(false);
const showAlert = ref(false);
const alertMessage = ref("");


onMounted(() => {
  store.getData()
})
const openModal = (user: User, action: String) => {
  selectedData.value = user


  switch (action) {
    case 'read': isOpenRead.value = true;
      break;
    case 'edit': isOpenEdit.value = true;
      break;
    case 'role': isOpenRole.value = true;
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
import { User } from '~/types';
definePageMeta({
  layout: "main",
});
</script>
