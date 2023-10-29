<template>
  <div>
    <SweetAlert :show="showAlert" title="alertTitle" :message="alertMessage" @on-close="showAlert = false" />

    <!-- Read -->
    <DeleteSaleModal @on-success="(e:string) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenDelete = false" :is-open="isOpenDelete" :selected-data="selectedData" />

    <div class="my-4">
      <NuxtLink to="/stocks/create" class="py-2 p-4 rounded-lg shadow-xl btn-primary text-white"><i
        class="fa-solid fa-circle-plus"></i>
      Ajouter nouveau</NuxtLink>
    </div>
    <!-- Liste des users -->
    <div class="p-5 bg-white w-full h-full shadow-2xl rounded-lg bg-opacity-25">

      <Datatable v-if="!store.loading">
        <thead>
          <tr>
            <th class="px-6 py-3 text-left text-sm font-bold">Date</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Total nouveau stock</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white text-gray-600 divide-y divide-gray-200">
          <tr v-for="(stock, index) in store.stocks" :key="index" :title="`Créé le ${frenchDate(stock.createdAt)}\nModifié le ${frenchDate(stock.updatedAt)}}`">
            <td class="px-6 py-4 whitespace-no-wrap">{{ frenchDate(stock.createdAt) }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ stock.totalNewStock }}</td>
            <td class="flex gap-2">
              <NuxtLink :to="`/stocks/${stock.id}`" class="p-0.5 px-2  text-white  bg-yellow-500 hover:bg-yellow-600 shadow-xl rounded-lg"
                >
                <i class="fa-regular fa-eye"></i>
              </NuxtLink>

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
import { Stock } from '~/types';
import { frenchDate } from '~/utils/constants';
import { useStocksStore } from '~/stores/stocksStore';

const store = useStocksStore();
const selectedData = ref<Stock>();
const isOpenRead = ref(false);
const isOpenDelete = ref(false);
const showAlert = ref(false);
const alertMessage =<any>ref("");

const route = useRoute();

// Vérifiez si le paramètre de requête 'showalert' est présent

onMounted(() => {
 
  // Utilisez 'showAlert' pour afficher le message approprié dans votre interface utilisateur
  if (route.query.showAlert === 'true') {
    showAlert.value=true;
    alertMessage.value= route.query.alertMessage;    
  }
})
const openModal = (data: Stock, action: String) => {
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
