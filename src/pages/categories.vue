<template>
  <div>
    <SweetAlert :show="showAlert" title="alertTitle" :message="alertMessage" @on-close="showAlert = false" />
    <ViewCategoryModal @on-close="isOpenRead = false" :is-open="isOpenRead" :selected-data="selectedData" />

    <!-- Create -->
    <AddCategoryModal @on-success="(e) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenCreate = false" :is-open="isOpenCreate" />

    <!-- Create -->
    <!-- <EditCategoryModal @on-success="(e) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenEdit = false" :is-open="isOpenEdit" :selected-data="selectedData" /> -->

    <!-- Read -->
    <DeleteCategoryModal @on-success="(e) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenDelete = false" :is-open="isOpenDelete" :selected-data="selectedData" />

    <button @click="isOpenCreate = true" class="py-2 p-4 shadow-xl btn-primary my-4 text-white"><i
        class="fa-solid fa-circle-plus"></i>
      Ajouter nouveau</button>
    <!-- Liste des users -->
    <div class="p-5 bg-white w-full h-full shadow-2xl rounded-lg bg-opacity-25">

      <Datatable v-if="store.categories && store.categories.length != 0">
        <thead>
          <tr>
            <th class="px-6 py-3 text-left text-sm font-bold">Nom</th>
            <!-- <th class="px-6 py-3 text-left text-sm font-bold">description</th> -->
            <th class="px-6 py-3 text-left text-sm font-bold">Slug</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Créé le</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Modifié le</th>

            <th class="px-6 py-3 text-left text-sm font-bold">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white text-gray-600 divide-y divide-gray-200">
          <tr v-for="(category, index) in store.categories" key="index">
            <td class="px-6 py-4 whitespace-no-wrap">{{ category.name }}
            </td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ category.slug }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ frenchDate(category.createdAt) }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ frenchDate(category.updatedAt) }}</td>
   


            <td class="flex gap-2">
              <a class="p-0.5 px-2 text-white  bg-yellow-500 hover:bg-yellow-600 shadow-xl rounded-sm"
                @click="openModal(category, 'read')">
                <i class="fa-regular fa-eye"></i>
              </a>
              <a class="p-0.5 px-2 text-white  bg-blue-500 hover:bg-blue-600 shadow-xl rounded-sm"
                @click="openModal(category, 'edit')">
                <i class="fa-regular fa-pen-to-square"></i>
              </a>
              <a class="p-0.5 px-2 text-white  bg-red-500 hover:bg-red-600 shadow-xl rounded-sm"
                @click="openModal(category, 'delete')">
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
import AddCategoryModal from '~/components/actions/categories/AddCategoryModal.vue';
import DeleteCategoryModal from '~/components/actions/categories/DeleteCategoryModal.vue';
import ViewCategoryModal from '~/components/actions/categories/ViewCategoryModal.vue';
import { Category } from '~/types';



const store = useCategoriesStore();

const selectedData = ref<Category>();
const isOpenCreate = ref(false);
const isOpenRead = ref(false);
const isOpenDelete = ref(false);
const isOpenEdit = ref(false);
const showAlert = ref(false);
const alertMessage = ref("");

const openModal = (data: Category, action: String) => {
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
