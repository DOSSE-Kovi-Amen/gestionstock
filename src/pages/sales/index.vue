<template>
  <div>
    <SweetAlert :show="showAlert" title="alertTitle" :message="alertMessage" @on-close="showAlert = false" />

    <!-- Read -->
    <DeleteSaleModal @on-success="(e: string) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenDelete = false" :is-open="isOpenDelete" :selected-data="selectedData" />

    <div class="my-4">
      <NuxtLink to="/sales/create" class="py-2 p-4 rounded-lg shadow-xl btn-primary text-white"><i
          class="fa-solid fa-circle-plus"></i>
        Ajouter nouveau</NuxtLink>
    </div>
    <!-- Liste des users -->
    <div class="p-5 bg-white w-full h-full shadow-2xl rounded-lg bg-opacity-25">

      <Datatable v-if="!store.loading">
        <thead>
          <tr>
            <th class="px-6 py-3 text-left text-sm font-bold">Date</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Montant total</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Remise</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Montant payé</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Reliquat</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Dette</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Statut paiement</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white text-gray-600 divide-y divide-gray-200">
          <tr v-for="(sale, index) in store.sales" :key="index"
            :title="`Créé le ${frenchDate(sale.created_at)}\nModifié le ${frenchDate(sale.updated_at)}}`">
            <td class="px-6 py-4 whitespace-no-wrap">{{ frenchDate(sale.created_at) }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ sale.total_amount }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ sale.discount }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ sale.amount_paid }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ sale.change }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ sale.debt }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">
              <span :class="{
      'bg-green-100 text-green-800': sale.payment_status === 'paid',
      'bg-red-100 text-red-800': sale.payment_status === 'unpaid'
    }" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ sale.payment_status === 'paid' ? 'Payé' : 'Impayé' }}
              </span>
            </td>
            <td class="flex gap-2">
              <NuxtLink :to="`/sales/${sale.id}`"
                class="p-0.5 px-2  text-white  bg-yellow-500 hover:bg-yellow-600 shadow-xl rounded-lg">
                <i class="fa-regular fa-eye"></i>
              </NuxtLink>

              <a class="p-0.5 px-2 text-white  bg-red-500 hover:bg-red-600 shadow-xl rounded-lg"
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
import DeleteSaleModal from '~/components/actions/sales/DeleteSaleModal.vue';
import { Sale } from '~/types';
import { frenchDate } from '~/utils/constants';
import { useSalesStore } from '~/stores/salesStore';

const store = useSalesStore();
const selectedData = ref<Sale>();
const isOpenRead = ref(false);
const isOpenDelete = ref(false);
const showAlert = ref(false);
const alertMessage = <any>ref("");

const route = useRoute();

// Vérifiez si le paramètre de requête 'showalert' est présent

onMounted(() => {
  store.getData();

  // Utilisez 'showAlert' pour afficher le message approprié dans votre interface utilisateur
  if (route.query.showAlert === 'true') {
    showAlert.value = true;
    alertMessage.value = route.query.alertMessage;
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
