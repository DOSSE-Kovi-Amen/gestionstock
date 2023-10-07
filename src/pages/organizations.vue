<template>
  <div>
    <SweetAlert :show="showAlert" title="alertTitle" :message="alertMessage" @on-close="showAlert = false" />
    <ViewOrgModal @on-close="isOpenRead = false" :is-open="isOpenRead" :selected-data="selectedData" />

    <!-- Create -->
    <AddOrgModal @on-success="(e) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenCreate = false" :is-open="isOpenCreate" />

    <!-- Create -->
    <EditOrgModal @on-success="(e) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenEdit = false" :is-open="isOpenEdit" :selected-data="selectedData"/>

    <!-- Read -->
    <DeleteOrgModal @on-success="(e) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenDelete = false" :is-open="isOpenDelete" :selected-data="selectedData" />

    <button @click="isOpenCreate = true" class="py-2 p-4 shadow-xl btn-primary my-4 text-white"><i
        class="fa-solid fa-circle-plus"></i>
      Ajouter nouveau</button>
    <!-- Liste des users -->
    <div class="p-5 bg-white w-full h-full shadow-2xl rounded-lg bg-opacity-25">

      <Datatable v-if="store.orgs && store.orgs.length != 0">
        <thead>
          <tr>
            <th class="px-6 py-3 text-left text-sm font-bold">Nom</th>
            <!-- <th class="px-6 py-3 text-left text-sm font-bold">description</th> -->
            <th class="px-6 py-3 text-left text-sm font-bold">CEO</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white text-gray-600 divide-y divide-gray-200">
          <tr v-for="(org, index) in store.orgs" key="index">
            <td class="px-6 py-4 whitespace-no-wrap">{{ org.attributes.name }}
            </td>
            <!-- <td class="px-6 py-4 whitespace-no-wrap">{{ org.attributes.description }}</td> -->
            <td class="px-6 py-4 whitespace-no-wrap">{{ org.attributes.ceo.full_name }}</td>
            <td class="flex gap-2">
              <a class="p-0.5 px-2 text-white  bg-yellow-500 hover:bg-yellow-600 shadow-xl rounded-sm"
                @click="openModal(org, 'read')">
                <i class="fa-regular fa-eye"></i>
              </a>
              <a class="p-0.5 px-2 text-white  bg-blue-500 hover:bg-blue-600 shadow-xl rounded-sm" 
              @click="openModal(org, 'edit')">
                <i class="fa-regular fa-pen-to-square"></i>
              </a>
              <a class="p-0.5 px-2 text-white  bg-red-500 hover:bg-red-600 shadow-xl rounded-sm"
                @click="openModal(org, 'delete')">
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
import AddOrgModal from '@/components/actions/organizations/AddOrgModal.vue';
import ViewOrgModal from '@/components/actions/organizations/ViewOrgModal.vue';
import DeleteOrgModal from '@/components/actions/organizations/DeleteOrgModal.vue';
import EditOrgModal from '~/components/actions/organizations/EditOrgModal.vue';
import { Organization } from '~/types';

const store = useOrganizationsStore();

const selectedData = ref<Organization>();
const isOpenCreate = ref(false);
const isOpenRead = ref(false);
const isOpenDelete = ref(false);
const isOpenEdit = ref(false);
const showAlert = ref(false);
const alertMessage = ref("");

const openModal = (data: Organization, action: String) => {
  selectedData.value = data


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


definePageMeta({
  layout: "main",
});
</script>
