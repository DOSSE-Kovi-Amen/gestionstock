<template>
  <div v-if="sale == null" class="flex bg-white h-64 w-full justify-center items-center">
    <Spinner class="h-12" />
  </div>
  <div v-else id="print" class="bg-white p-6 rounded shadow-md">
    <div v-if="sale.payment_status == 'paid'" >
      <span style="font-size: 30px;" class=" border-green-500 border-2 text-green-500 text-xs font-semibold px-2 py-2 uppercase rounded-full">
        Payé
      </span>
   
    </div>
 
    <div v-if="sale.payment_status == 'unpaid'">
      <span style="font-size: 30px;" class="border-red-500 border-2 text-red-500 text-xs font-semibold px-2 py-2 uppercase rounded-full">
        Impayé
      </span>
   
    </div>
    <p class="text-center">{{storeSettings.settings?.society_description}}</p>


    <div class="text-center">
      <h1 class="text-2xl font-semibold">Facture numéro {{ sale.invoice_number }}</h1>
    </div>
    <div class="mt-4">
      <div class="flex flex-row justify-between gap-4">
        <div class="flex flex-row gap-4">
          <div>
            <img v-if="storeSettings.settings?.society_logo" class="w-28 object-cover"
              :src="getImageUrl(storeSettings.settings?.society_logo)" alt="">
          </div>
          <div>
            <p><strong>De:</strong></p>
            <p>{{ storeSettings.settings?.society_name }}</p>
            <!-- <p>{{ storeSettings.settings?. }}</p> -->
            <p>{{ storeSettings.settings?.society_contact }}</p>
            <p>Email: {{ storeSettings.settings?.society_email }}</p>

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
            <td class="border border-gray-300 p-2">{{ sale_product?.unit_price }} </td>
            <td class="border border-gray-300 p-2">{{ sale_product?.unit_price * sale_product.quantity }}</td>
          </tr>
          <!-- Ajoutez d'autres lignes de facturation ici -->
        </tbody>
      </table>
    </div>
    <div class="mt-6 text-left">
      <p><strong>Montant payé:</strong> {{ formatMonetaire(sale.amount_paid) }}</p>
      <p><strong>Reste à payer:</strong> {{ formatMonetaire(sale.debt) }}</p>
      <p><strong>Reliquat:</strong> {{ formatMonetaire(sale.change) }}</p>
    </div>
    <br>
    <h2><strong>Remboursements: </strong></h2>
    <div v-for="(debt_payment, index) in sale.debt_payments" :key="index" class="text-left">
      <p>{{ frenchDate(debt_payment.created_at) }}: {{ formatMonetaire(debt_payment.amount_paid) }}</p>
    </div>

    <div class="mt-6 text-right">
      <p><strong>Sous total:</strong> {{ formatMonetaire(sale.sub_total) }}</p>
      <p><strong>Remise:</strong> {{ formatMonetaire(sale.discount) }}</p>
      <p><strong>Total de la facture:</strong> {{ formatMonetaire(sale.total_amount)   }}</p>
    </div>

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
        if (!sale.value) {
            router.push('/404')
        } else {
            setTimeout(() => {
                print()

            }, 1000);
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
  
<style scoped>
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