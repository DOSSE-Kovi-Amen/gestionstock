<template>
  <div v-if="sale == null" class="flex bg-white h-64 w-full justify-center items-center">
    <Spinner class="h-12" />
  </div>
  <div v-else id="print" class="bg-white p-6 rounded shadow-md">
    <div class="text-center">
      <h1 class="text-2xl font-semibold">Facture</h1>
    </div>
    <div class="mt-4">
      <div class="flex flex-row justify-between gap-4">
        <div class="flex flex-row">
          <div>
            <img class="w-28 object-cover" :src="apiBaseURL + '/' + storeSettings.settings?.societyLogo" alt="">
          </div>
          <div>
            <p><strong>De:</strong></p>
            <p>{{ storeSettings.settings?.societyName }}</p>
            <!-- <p>{{ storeSettings.settings?. }}</p> -->
            <p>{{ storeSettings.settings?.societyContact }}</p>
            <p>Email: {{ storeSettings.settings?.societyEmail }}</p>

          </div>
        </div>
        <div>
          <p><strong>À:</strong></p>
          <p>{{ sale.client.name }}</p>
          <p>{{ sale.client.telephone }}</p>
          <p>{{ sale.client.email }}</p>
        </div>


      </div>
    </div>
    <div class="mt-6">
      <table class="w-full bg-blue-100 border-collapse border border-gray-300">
        <thead>
          <tr>
            <th class="border border-gray-300 p-2">Description</th>
            <th class="border border-gray-300 p-2">Quantité</th>
            <th class="border border-gray-300 p-2">Prix unitaire</th>
            <th class="border border-gray-300 p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sale_product, index) in validJSON(sale.sale_products)">
            <td class="border border-gray-300 p-2">{{ sale_product?.product?.name }}</td>
            <td class="border border-gray-300 p-2">{{ sale_product.quantity }}</td>
            <td class="border border-gray-300 p-2">{{ sale_product?.unit_price }}</td>
            <td class="border border-gray-300 p-2">{{ sale_product?.unit_price * sale_product.quantity }}</td>
          </tr>
          <!-- Ajoutez d'autres lignes de facturation ici -->
        </tbody>
      </table>
    </div>
    <div class="mt-6 text-left">
      <p><strong>Montant payé:</strong> {{ sale.amount_paid }}</p>
      <p><strong>Reste à payer:</strong> {{ sale.debt }}</p>
      <p><strong>Reliquat:</strong> {{ sale.change }}</p>
    </div>
    <div class="mt-6 text-right">
      <p><strong>Sous total:</strong> {{ sale.sub_total }}</p>
      <p><strong>Remise:</strong> {{ sale.discount }}</p>
      <p><strong>Total de la facture:</strong> {{ sale.total_amount }}</p>
    </div>
    <NuxtLink :to="`/sales/print-${sale.id}`" target="_blank" title="Imprimer"
      class="py-2 p-4 absolute box-shadow-pulse bottom-0 right-20 z-10 shadow-xl btn-primary mb-2 text-white">
      <i class="fa-solid fa-print fa-2x"></i>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import Spinner from '~/components/Spinner.vue';
import type{ Sale } from '~/types';

const route = useRoute();
const router = useRouter();
const storeSales = useSalesStore();
const storeSettings = useSettingsStore();
const sale = ref<Sale>();
// Vérifiez si le paramètre de requête 'showalert' est présent

onMounted(async () => {
  if (typeof route.params.id === 'string') {
    sale.value = await storeSales.getSale(route.params.id);
    console.log('=================only===================');
    console.log(sale.value);
    console.log('====================================');
    if (!sale.value) {
      router.push('/404')
    }
  }
})
definePageMeta({
  layout: "main",
});
</script>

<style scoped>
/*************box-shadow*****************/
.box-shadow-pulse {
  display: grid;
  place-items: center;
  border-radius: 50%;
  aspect-ratio: 1;
  animation: pulsation_bouton 2s ease-out infinite
}

@keyframes pulsation_bouton {
  from {
    box-shadow: 0 0 0 -3px #9b292900, 0 0 0 0 #45e66d
  }

  to {
    box-shadow: 0 0 0 1px #0000, 0 0 0 20px #fa0d0d00
  }
}
</style>