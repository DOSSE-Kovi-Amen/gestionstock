<template>
  <div>
    <SweetAlert :show="showAlert" title="alertTitle" :message="alertMessage" @on-close="showAlert = false" />

    <!-- Create -->
    <AddCategoryModal @on-success="(e: string) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenCreate = false" :is-open="isOpenCreate" />

    <ViewCategoryModal @on-close="isOpenRead = false" :is-open="isOpenRead" :selected-data="selectedData" />
    <!-- Create -->
    <EditCategoryModal @on-success="(e: string) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenEdit = false" :is-open="isOpenEdit" :selected-data="selectedData" />

    <!-- Read -->
    <DeleteCategoryModal @on-success="(e: string) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenDelete = false" :is-open="isOpenDelete" :selected-data="selectedData" />
    <div class="bg-yellow-100 border-l-4 border-black p-4 mb-4">
      <p class="font-semibold my-1">
        NB: Vous ne pouvez pas supprimer des catégories qui contiennent des produits. Pour supprimer une catégorie qui contient des produits il faut supprimer les produits qu'elle contient ou attribuer ces produits à d'autres catégories en allant dans édition produit ensuite revenir supprimer la categorie.
      </p>
    </div>
    <button @click="isOpenCreate = true" class="py-2 p-4 rounded-lg shadow-xl btn-primary my-4 text-white"><i
        class="fa-solid fa-circle-plus"></i>
      Ajouter nouveau</button>
    <!-- Liste des users -->
    <div class="p-5 bg-white w-full h-full shadow-2xl rounded-lg bg-opacity-25">

      <Datatable v-if="!store.loading">
        <thead>
          <tr>
            <th class="px-6 py-3 text-left text-sm font-bold">Nom</th>
            <!-- <th class="px-6 py-3 text-left text-sm font-bold">description</th> -->
            <th class="px-6 py-3 text-left text-sm font-bold">Slug</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Nombres de produits</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white text-gray-600 divide-y divide-gray-200">
          <tr v-for="(category, index) in store.categories" :key="index"
            :title="`Créé le ${frenchDate(category.createdAt)}\nModifié le ${frenchDate(category.updatedAt)}}`">
            <td class="px-6 py-4 whitespace-no-wrap">{{ category.name }}
            </td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ category.slug }}</td>
            <td class="px-6 py-4 whitespace-no-wrap text-green-500">{{ category?.products?.length }}</td>

            <td class="flex gap-2">
              <a class="p-0.5 px-2 text-white bg-yellow-500 hover:bg-yellow-600 shadow-xl rounded-lg"
                @click="openModal(category, 'read')">
                <i class="fa-regular fa-eye"></i>
              </a>
              <a class="p-0.5 px-2 text-white bg-blue-500 hover:bg-blue-600 shadow-xl rounded-lg"
                @click="openModal(category, 'edit')">
                <i class="fa-regular fa-pen-to-square"></i>
              </a>
              <a v-if="category?.products?.length==0" class="p-0.5 px-2 text-white bg-red-500 hover:bg-red-600 shadow-xl rounded-lg"
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
import ViewCategoryModal from '~/components/actions/categories/ViewCategoryModal.vue';
import EditCategoryModal from '~/components/actions/categories/EditCategoryModal.vue';
import DeleteCategoryModal from '~/components/actions/categories/DeleteCategoryModal.vue';
import { Category } from '~/types';
import { frenchDate } from '~/utils/constants';


const store = useCategoriesStore();

const selectedData = ref<Category>();
const isOpenCreate = ref(false);
const isOpenRead = ref(false);
const isOpenDelete = ref(false);
const isOpenEdit = ref(false);
const showAlert = ref(false);
const alertMessage = ref("");

onMounted(() => {
  store.getData()
})
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
