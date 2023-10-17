<template>
  <div>
    <SweetAlert :show="showAlert" title="alertTitle" :message="alertMessage" @on-close="showAlert = false" />

    <!-- Create -->
    <AddSpendModal @on-success="(e:string) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenCreate = false" :is-open="isOpenCreate" />

    <ViewSpendModal @on-close="isOpenRead = false" :is-open="isOpenRead" :selected-data="selectedData" />
    <!-- Create -->
    <EditSpendModal @on-success="(e: string) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenEdit = false" :is-open="isOpenEdit" :selected-data="selectedData" />

    <!-- Read -->
    <DeleteSpendModal @on-success="(e:string) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenDelete = false" :is-open="isOpenDelete" :selected-data="selectedData" />

    <button @click="isOpenCreate = true" class="py-2 p-4 shadow-xl btn-primary my-4 text-white"><i
        class="fa-solid fa-circle-plus"></i>
      Ajouter nouveau</button>
    <!-- Liste des users -->
    <div class="p-5 bg-white w-full h-full shadow-2xl rounded-lg bg-opacity-25">

      <Datatable v-if="!store.loading">
        <thead>
          <tr>
            <th class="px-6 py-3 text-left text-sm font-bold">Nom</th>
            <!-- <th class="px-6 py-3 text-left text-sm font-bold">description</th> -->
            <th class="px-6 py-3 text-left text-sm font-bold">Montant</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Description</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white text-gray-600 divide-y divide-gray-200">
          <tr v-for="(spend, index) in store.spends" key="index" :title="`Créé le ${formatDateFrench(spend.createdAt)}\nModifié le ${formatDateFrench(spend.updatedAt)}}`">
            <td class="px-6 py-4 whitespace-no-wrap">{{ spend.title }}
            </td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ spend.amount }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ spend.description }}</td>
            <td class="flex gap-2">
              <a class="p-0.5 px-2 text-white  bg-yellow-500 hover:bg-yellow-600 shadow-xl rounded-sm"
                @click="openModal(spend, 'read')">
                <i class="fa-regular fa-eye"></i>
              </a>
              <a class="p-0.5 px-2 text-white  bg-blue-500 hover:bg-blue-600 shadow-xl rounded-sm"
                @click="openModal(spend, 'edit')">
                <i class="fa-regular fa-pen-to-square"></i>
              </a>
              <a class="p-0.5 px-2 text-white  bg-red-500 hover:bg-red-600 shadow-xl rounded-sm"
                @click="openModal(spend, 'delete')">
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
import AddSpendModal from '~/components/actions/spends/AddSpendModal.vue';
import ViewSpendModal from '~/components/actions/spends/ViewSpendModal.vue';
import EditSpendModal from '~/components/actions/spends/EditSpendModal.vue';
import DeleteSpendModal from '~/components/actions/spends/DeleteSpendModal.vue';
import { Spend } from '~/types';
import { formatDateFrench } from '~/utils/constants';



const store = useSpendsStore();

const selectedData = ref<Spend>();
const isOpenCreate = ref(false);
const isOpenRead = ref(false);
const isOpenDelete = ref(false);
const isOpenEdit = ref(false);
const showAlert = ref(false);
const alertMessage = ref("");

const openModal = (data: Spend, action: String) => {
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
