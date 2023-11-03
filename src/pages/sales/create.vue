<template>
  <div>
    <SweetAlert :show="showAlert" title="alertTitle" :message="alertMessage" @on-close="showAlert = false" />

    <!-- Create -->
    <AddClientModal @on-success="(e: string) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenCreate = false" :is-open="isOpenCreate" />
    <div v-if="loading" class="flex bg-white h-64 w-full justify-center items-center">
      <Spinner class="h-12" />
    </div>
    <div v-else>
      <div
      v-if="salesStore.errors && salesStore.errors.length != 0"
      class="bg-red-200 border-l-4 border-red-500 p-4 mb-4"
    >
      <p
        v-for="(error, index) in salesStore.errors"
        :key="index"
        class="font-semibold my-1"
      >
        {{ error }} :
      </p>
    </div>
 
      <div class="flex flex-row gap-2 mb-2">
        <button @click="addAllProducts()" class="py-2 p-4 rounded-lg shadow-xl bg-blue-400 hover:bg-blue-500 text-white">
          <i class="fa-solid fa-check"></i> Tout sélectionner
        </button>
        <button @click="removeAllProducts()" class="py-2 p-4 rounded-lg shadow-xl bg-red-500 hover:bg-red-600 text-white">
          <i class="fa-solid fa-trash"></i> Tout supprimer
        </button>
        <button @click="isOpenCreate = true" class="py-2 p-4 rounded-lg shadow-xl btn-primary text-white">
          <i class="fa-solid fa-user"></i> Ajouter client
        </button>
      </div>
      {{ formData }}
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3">
          <div class="mb-1">
            <!-- <label for="selectedProduct" class="block text-black mb-2">Choisir un produit:
          </label> -->
            <v-select v-model="selectedProduct"
              class="bg-white border rounded w-full text-gray-700 py-0 focus:outline-none focus:border-blue-500"
              :options="productsStore.products"
              label="name" placeholder="Choisir un produit">
            </v-select>
          </div>
          <div class="mb-1">
            <!-- <label for="selectedProduct" class="block text-black mb-2">Choisir un client:
          </label> -->
            <v-select v-model="formData.client" placeholder="Choisir un client"
              class="bg-white border rounded w-full text-gray-700 py-0 focus:outline-none focus:border-blue-500" required
              :options="clientsStore.clients"
              :reduce="(option:any) => option.id"

              label="name">
              <template #search="{ attributes, events }:any">
                <input class="vs__search" :required="!formData.client" v-bind="attributes" v-on="events" />
              </template></v-select>
          </div>
        </div>

        <div class="bg-purple-200 border-l-4 border-purple-500 p-4 my-2">
          <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-3">
            <div class="font-bold">Ht: {{ formData.subTotal }}</div>
            <div class="font-bold">TTC: {{ formData.totalAmount }}</div>
            <div class="font-bold">Reliquat: {{ formData.change }}</div>
            <div class="font-bold">Dette: {{ formData.debt }}</div>
          </div>
        </div>

        <div v-if="errors.length != 0" class="bg-red-200 border-l-4 border-red-500 p-4 my-2">
          <div class="flex flex-row justify-between">
            <div>
              <p v-for="(error, index) in errors">{{ error }}</p>
            </div>
            <i class="fa-regular fa-circle-xmark fa-2x cursor-pointer" @click="errors = []"></i>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-3">
          <!-- Première carte (1/4 de l'écran sur les écrans larges) -->

          <div class="lg:col-span-1">
            <div class="bg-blue-400 p-4">
              <div class="mb-4">
                <label class="block text-white mb-2" for="discount">Remise:</label>
                <input v-model="formData.discount" :class="{
                  'bg-gray-200 cursor-not-allowed':
                    formData.saleDetails.length === 0,
                  'bg-white': formData.saleDetails.length !== 0,
                }" class="border rounded-md py-1 px-3 w-full" type="number" id="discount" name="discount"
                  placeholder="Remise" required :disabled="formData.saleDetails.length === 0" />
              </div>
              <div class="mb-4">
                <label class="block text-white mb-2" for="amountPaid">Montant reçu:</label>
                <input v-model="formData.amountPaid" :class="{
                  'bg-gray-200 cursor-not-allowed':
                    formData.saleDetails.length === 0,
                  'bg-white': formData.saleDetails.length !== 0,
                }" class="border rounded-md py-1 px-3 w-full" type="number" id="amountPaid" name="amountPaid"
                  placeholder="Montant reçu" :disabled="formData.saleDetails.length === 0" required />
              </div>
            </div>

          </div>
          <!-- Deuxième carte (3/4 de l'écran sur les écrans larges) -->
          <div class="lg:col-span-3">
            <!-- Liste des users -->
            <table class="shadow-lg w-full table-hover bg-black bg-opacity-70 text-white">
              <thead>
                <tr>
                  <th class="px-6 py-3 text-left text-sm">Produit</th>
                  <th class="px-6 py-3 text-left text-sm">Prix unitaire</th>
                  <th class="px-6 py-3 text-left text-sm">Qté</th>
                  <th class="px-6 py-3 text-left text-sm">Montant</th>
                  <th class="px-6 py-3 text-left text-sm">-</th>
                </tr>
              </thead>
              <tbody class="bg-white text-gray-600 divide-y divide-gray-200">
                <tr v-for="(product, index) in formData.saleDetails" :key="index">
                  <td class="px-6 py-4 whitespace-no-wrap">
                    {{ product.name + "(" + product.stock + ")" }}
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    {{ product.selling_price }}
                  </td>

                  <td class="px-6 py-4 whitespace-no-wrap">
                    <input type="number" v-model="formData.saleDetails[index].quantity"
                      class="border border-gray-300 rounded-lg py-1 px-1 block appearance-none leading-normal focus:outline-none focus:ring focus:border-blue-500"
                      required @input="editQuantity(formData.saleDetails[index])" />
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    {{
                      product.selling_price * formData.saleDetails[index].quantity
                    }}
                  </td>

                  <td class="flex gap-2 py-4">
                    <a class="p-0.5 px-2 text-white bg-red-500 hover:bg-red-600 shadow-xl rounded-sm"
                      @click="removeProduct(index)">
                      <i class="fa-regular fa-trash-can"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="formData.saleDetails.length == 0" class="bg-white w-full p-4 text-center">
              Aucun produit sélectionné
            </div>
          </div>
        </div>

        
        
        
        <button type="submit" :class="{ 'cursor-not-allowed': formData.saleDetails.length === 0 }"
          class="py-2 p-4 absolute box-shadow-pulse bottom-0 right-20 z-10 shadow-xl btn-primary mb-2 text-white" :disabled="formData.saleDetails.length === 0">
          <i class="fa-solid fa-save fa-2x"></i>
        </button>
        <!-- <div class="fixed flex flex-row  bg-white bottom-0 w-full h-16 justify-center">

        </div> -->


      </form>
    </div>
  </div>
</template>
<style scoped>
/*************box-shadow*****************/
.box-shadow-pulse{
	
  display: grid;
  place-items:center;
  border-radius:50%;
  aspect-ratio:1;
  animation:pulsation_bouton 2s ease-out infinite

    }
    

    
  @keyframes pulsation_bouton {
    
  from{
    
    box-shadow:0 0 0 -3px #9b292900,0 0 0 0 #45e66d
    
    }
  to{
    
    box-shadow:0 0 0 1px #0000,0 0 0 20px #fa0d0d00
    
    }
    
    }
    
</style>
<script lang="ts" setup>
import { useProductsStore } from "~/stores/productsStore";
import { Product, SaleForm } from "~/types";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import AddClientModal from "~/components/actions/clients/AddClientModal.vue";
import Spinner from "~/components/Spinner.vue";

const loading = ref(false);
const productsStore = useProductsStore();
const clientsStore = useClientsStore();
const salesStore = useSalesStore();
const showAlert = ref(false);
const alertMessage = ref("");
const selectedProduct = ref();
const isOpenCreate = ref(false);
const router = useRouter();
const formData = ref<SaleForm>({
  client: null,
  amountPaid: null,
  discount: null,
  subTotal: 0,
  totalAmount: 0,
  debt: 0,
  change: 0,
  saleDetails: [],
});
const errors = ref<any>([]);

function editQuantity(product: any) {
  errors.value = [];

  if (product.quantity > product.stock) {
    product.quantity = 0;
    errors.value.push(
      `La quantité du produit ${product.name} à vendre est supérieur à la quantité en stock`
    );
  }
}
// Listenin
watch(selectedProduct, (newValue, oldValue) => {
  addProduct();
  // selectedProduct.value = null;
  // Vous pouvez effectuer des actions en réponse au changement ici
});
// Listening formData and make calculations for totalAmount
watch(formData.value, () => {
  // Sous total sans remise
  formData.value.subTotal = formData.value.saleDetails.reduce(
    (
      accumulator: number,
      product: { quantity: number; selling_price: number }
    ) => {
      const productAmount = product.quantity * product.selling_price;
      return accumulator + productAmount;
    },
    0
  );

  // Calcul de Total hors taxe avec remise
  formData.value.totalAmount =
    formData.value.subTotal - formData.value.discount;
  // Reliquat ou Dette
  if (formData.value.amountPaid > formData.value.totalAmount) {
    formData.value.change =
      formData.value.amountPaid - formData.value.totalAmount;
    formData.value.debt = 0;
  } else {
    formData.value.debt =
      formData.value.totalAmount - formData.value.amountPaid;
    formData.value.change = 0;
  }

  //
});

function addAllProducts() {
  errors.value = [];

  for (const product of productsStore.products) {
    if (existProduct(product.id)) {
      errors.value.push(
        `Le produit (${product?.name}) a déjà été sélectionné.`
      );
    } else {
      product.quantity = null;
      formData.value.saleDetails.push(product);
    }
  }
}
function addProduct() {
  // Rénitialiser s'il ya déjà une erreur
  if (errors.value.length > 1) {
    errors.value = [];
  }
  if (selectedProduct.value) {
    if (existProduct(selectedProduct.value?.id)) {
      errors.value.push(
        `Le produit (${selectedProduct.value?.name}) a déjà été sélectionné.`
      );
    } else {
      selectedProduct.value.quantity = null;
      // Vérifiez que selectedProduct n'est pas null
      formData.value.saleDetails.push(selectedProduct.value);
    }
    selectedProduct.value = null; // Réinitialise selectedProduct à null
  }
}
function removeProduct(index: number) {
  formData.value.saleDetails.splice(index, 1);
}
function removeAllProducts() {
  formData.value.saleDetails = [];
  errors.value = [];
}
function existProduct(productId: string) {
  for (const product of formData.value.saleDetails) {
    if (productId == product.id) {
      return true;
    }
  }
}

const submitForm = async () => {
  loading.value = true;
  await salesStore.postData(formData.value).then(async (status) => {
    for (const product of formData.value.saleDetails) {
      await productsStore.updateData(
        { stock: product.stock - product.quantity },
        product.id
      );
    }
    if (status) {
      const state = {
        showAlert: "true",
        alertMessage: "Vente enregistrée avec succès",
      };
      router.push({ path: "/sales", query: state });
    }

    loading.value = false;
  });
  setTimeout(() => {
    loading.value = false;
  }, 15000);
};
definePageMeta({
  layout: "main",
});
</script>
