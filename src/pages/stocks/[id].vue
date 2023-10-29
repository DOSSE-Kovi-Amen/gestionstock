<template>
  <div>
    <div v-if="!stock" class="flex bg-white h-64 w-full justify-center items-center">
      <Spinner class="h-12" />
    </div>

    <div v-else class="bg-white p-6 rounded shadow-md">
      <div class="text-center">
        <h1 class="text-2xl font-semibold">Entrée de stock du {{ frenchDate(stock.createdAt) }}</h1>
      </div>
      <div class="mt-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Fournisseur: {{ stock.supplier.name }}</strong></p>
            <!-- <p><strong>Auteur: {{ stock }}</strong></p> -->

          </div>
        </div>
      </div>
      <div class="mt-6">
        <table class="table w-full bg-blue-100 text-center border-collapse">
          <thead>
            <tr>
              <th class="border border-gray-300 p-2">Produit</th>
              <th class="border border-gray-300 p-2">Quantité</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in stock.stockDetails" :key="index">
              <td class="border border-gray-300 p-2">{{ product.name }}</td>
              <td class="border border-gray-300 p-2">{{ product.quantity }}</td>
            </tr>
            <!-- Ajoutez d'autres lignes de facturation ici -->
          </tbody>
        </table>
      </div>

      <div class="mt-6 text-right">
        <p><strong>Total nouvelle entrée:</strong> {{ stock.totalNewStock }}</p>
      </div>
      <NuxtLink :to="`/stocks/print-${stock.id}`" target="_blank" title="Imprimer"
        class="py-2 p-4 absolute box-shadow-pulse bottom-0 right-20 z-10 shadow-xl btn-primary mb-2 text-white">
        <i class="fa-solid fa-print fa-2x"></i>
      </NuxtLink>
    </div>

  </div>
</template>
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
<script setup lang="ts">
import Spinner from '~/components/Spinner.vue';
import { Stock } from '~/types';


const route = useRoute();
const router = useRouter();
const storeStocks = useStocksStore();
const stock = ref<Stock>();
// Vérifiez si le paramètre de requête 'showalert' est présent

onMounted(async () => {
  if (typeof route.params.id === 'string') {
    stock.value = await storeStocks.getStock(route.params.id);
    if (!stock.value) {
      router.push('/404')
    }
  }
})

definePageMeta({
  layout: "main",
});
</script>

