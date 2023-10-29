<template>
  <div v-if="!stock" class="flex bg-white h-64 w-full justify-center items-center">
    <Spinner class="h-12" />
  </div>

  <div v-else id="print" class="bg-white p-6 rounded shadow-md">
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
          <tr v-for="(product, index) in stock.stockDetails">
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

@media print {

  #print,
  #print * {
    visibility: visible;
  }

  #print {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }

  table {
    background-color: #dbeafe !important;
    color: black;
    /* Vous pouvez définir la couleur du texte ici */
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
const loading = ref(false);
// Vérifiez si le paramètre de requête 'showalert' est présent

onMounted(async () => {
  if (typeof route.params.id === 'string') {
    stock.value = await storeStocks.getStock(route.params.id);
    if (!stock.value) {
      router.push('/404')
    } else {
      setTimeout(() => {
        print()

      }, 500);

    }
  }


})

async function print() {
  // Cacher le bouton avant l'impression
  // document.getElementById('printButton').style.display = 'none';

  // Configurations par défaut pour le dialogue d'impression
  window.onbeforeprint = function () {
    // Sélectionner le format A4 (210mm x 297mm)
    document.head.insertAdjacentHTML('beforeend', '<style>@page { size: A4; }</style>');

    // Décocher le header et le footer
    // document.head.insertAdjacentHTML('beforeend', '<style>@page { margin: 0mm; }</style>');

    // Forcer l'affichage des arrière-plans graphiques et des couleurs lors de l'impression
    document.head.insertAdjacentHTML('beforeend', '<style>@media print { body * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; background-color: transparent !important; } }</style>');
  };

  // Ajouter un événement après l'impression
  window.addEventListener('afterprint', function () {
    // Réafficher le bouton après l'impression
    // document.getElementById('printButton').style.display = 'block';
    // Revenir sur la page précédente
    // window.history.back();
  });
  window.print()
}
</script>
  
  