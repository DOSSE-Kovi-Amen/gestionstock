<template>
  <div>
    <SweetAlert :show="showAlert" title="alertTitle" :message="alertMessage" @on-close="showAlert = false" />


    <ViewCategoryModal @on-close="isOpenRead = false" :is-open="isOpenRead" :selected-data="selectedData" />

    <!-- Read -->
    <DeleteCategoryModal @on-success="(e:string) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenDelete = false" :is-open="isOpenDelete" :selected-data="selectedData" />

    <div class="my-4">
      <NuxtLink to="/sales/create" class="py-2 p-4 shadow-xl btn-primary text-white"><i
        class="fa-solid fa-circle-plus"></i>
      Ajouter nouveau</NuxtLink>
    </div>
    <!-- Liste des users -->
    <div class="p-5 bg-white w-full h-full shadow-2xl rounded-lg bg-opacity-25">

      <Datatable v-if="!store.loading">
        <thead>
          <tr>
            <th class="px-6 py-3 text-left text-sm font-bold">Référence</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Date</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Montant total</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Remise</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Montant payé</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Reliquat</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white text-gray-600 divide-y divide-gray-200">
          <tr v-for="(sale, index) in store.sales" :key="index" :title="`Créé le ${formatDateFrench(sale.createdAt)}\nModifié le ${formatDateFrench(sale.updatedAt)}}`">
            <td class="px-6 py-4 whitespace-no-wrap">{{ sale.reference }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ formatDateFrench(sale.createdAt) }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ sale.totalAmount }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ sale.discount }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ sale.amountPaid }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ sale.change }}</td>
            <td class="flex gap-2">
              <a class="p-0.5 px-2 text-white  bg-yellow-500 hover:bg-yellow-600 shadow-xl rounded-sm"
                @click="openModal(sale, 'read')">
                <i class="fa-regular fa-eye"></i>
              </a>
              <a class="p-0.5 px-2 text-white  bg-blue-500 hover:bg-blue-600 shadow-xl rounded-sm"
                @click="openModal(sale, 'edit')">
                <i class="fa-regular fa-pen-to-square"></i>
              </a>
              <a class="p-0.5 px-2 text-white  bg-red-500 hover:bg-red-600 shadow-xl rounded-sm"
                @click="openModal(sale, 'delete')">
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
import ViewCategoryModal from '~/components/actions/categories/ViewCategoryModal.vue';
import DeleteCategoryModal from '~/components/actions/categories/DeleteCategoryModal.vue';
import { Sale } from '~/types';
import { formatDateFrench } from '~/utils/constants';
import { useSalesStore } from '~/stores/salesStore';

const store = useSalesStore();
const selectedData = ref<Sale>();
const isOpenRead = ref(false);
const isOpenDelete = ref(false);
const showAlert = ref(false);
const alertMessage =<any>ref("");

const route = useRoute();

// Vérifiez si le paramètre de requête 'sessionExpired' est présent

onMounted(() => {
  const showAlert = route.query.showAlert === 'true';

  // Utilisez 'showAlert' pour afficher le message approprié dans votre interface utilisateur
  if (showAlert &&  route.query.alertMessage) {
    alertMessage.value= route.query.alertMessage;    
  }
})
const openModal = (data: Sale, action: String) => {
  selectedData.value = data


  switch (action) {
    case 'read': isOpenRead.value = true;
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
