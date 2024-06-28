<template>
  <div>
    <SweetAlert :show="showAlert" title="alertTitle" :message="alertMessage" @on-close="showAlert = false" />

    <!-- Create -->
    <AddSupplierModal @on-success="(e: string) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenCreate = false" :is-open="isOpenCreate" />
    <div v-if="loading" class="flex bg-white h-64 w-full justify-center items-center">
      <Spinner class="h-12" />
    </div>
    <div v-else>

      <div v-if="stocksStore.errors && stocksStore.errors.length != 0"
        class="bg-red-200 border-l-4 border-red-500 p-4 mb-4">
        <p v-for="(error, index) in stocksStore.errors" :key="index" class="font-semibold my-1">
          {{ error }} :
        </p>
      </div>
      <div class="flex flex-row gap-2 mb-2">
        <button @click="addAllProducts()"
          class="py-2 p-4 rounded-lg shadow-xl bg-blue-400 hover:bg-blue-500 text-white">
          <i class="fa-solid fa-check"></i> Tout sélectionner
        </button>
        <button @click="removeAllProducts()"
          class="py-2 p-4 rounded-lg shadow-xl bg-red-500 hover:bg-red-600 text-white">
          <i class="fa-solid fa-trash"></i> Tout supprimer
        </button>
        <button @click="isOpenCreate = true" class="py-2 p-4 rounded-lg shadow-xl btn-primary text-white">
          <i class="fa-solid fa-user"></i> Ajouter fournisseur
        </button>
      </div>

      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3">
          <div class="mb-1">
            <!-- <label for="selectedProduct" class="block text-black mb-2">Choisir un produit:
          </label> -->
            <v-select v-model="selectedProduct"
              class="bg-white border rounded w-full text-gray-700 py-0 focus:outline-none focus:border-blue-500"
              :options="productsStore.products" label="name" placeholder="Choisir un produit">
              <template #option="option: any">
                <div class="flex gap-2">
                  <span>{{ option.name }}</span>
                  <span class="text-green-500">({{ option.stock }})</span>
                </div>
              </template>
            </v-select>
          </div>
          <div class="mb-1">
            <!-- <label for="selectedProduct" class="block text-black mb-2">Choisir un client:
          </label> -->
            <v-select v-model="formData.supplier_id" placeholder="Choisir un fournisseur"
              class="bg-white border rounded w-full text-gray-700 py-0 focus:outline-none focus:border-blue-500"
              required :options="supplierStore.suppliers" :reduce="(option: any) => option.id" label="name">
              <template #search="{ attributes, events }: any">
                <input class="vs__search" :required="!formData.supplier_id" v-bind="attributes" v-on="events" />
              </template></v-select>
          </div>
          <div class="mb-4">
            <input v-model="formData.date" class="border rounded-md py-2 px-3 w-full" type="date" id="date"
              placeholder="Date" />
          </div>
        </div>

        <!-- <div class="bg-purple-200 border-l-4 border-purple-500 p-4 my-2">
          <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-3">
            <div class="font-bold">Totaux nouvelles entrées: {{ formData.totalNewStock }}</div>

          </div>
        </div> -->

        <div v-if="errors.length != 0" class="bg-red-200 border-l-4 border-red-500 p-4 my-2">
          <div class="flex flex-row justify-between">
            <div>
              <p v-for="(error, index) in errors">{{ error }}</p>
            </div>
            <i class="fa-regular fa-circle-xmark fa-2x cursor-pointer" @click="errors = []"></i>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-3">
          <div class="lg:col-span-4">
            <!-- Liste des users -->
            <table class="shadow-lg w-full table-hover bg-black bg-opacity-70 text-white">
              <thead>
                <tr>
                  <th class="px-6 py-3 text-left text-sm">Produit</th>
                  <th class="px-6 py-3 text-left text-sm">Qté</th>
                  <th class="px-6 py-3 text-left text-sm">-</th>
                </tr>
              </thead>
              <tbody class="bg-white text-gray-600 divide-y divide-gray-200">
                <tr v-for="(product, index) in formData.products" :key="index">
                  <td class="px-6 py-4 whitespace-no-wrap">
                    {{ product.name }}
                    <span class="text-green-500">({{ product.stock }})</span>

                  </td>


                  <td class="px-6 py-4 whitespace-no-wrap">
                    <input type="number" step="any" v-model="formData.products[index].quantity"
                      class="border border-gray-300 rounded-lg py-1 px-1 block appearance-none leading-normal focus:outline-none focus:ring focus:border-blue-500"
                      required />
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
            <div v-if="formData.products.length == 0" class="bg-white w-full p-4 text-center">
              Aucun produit sélectionné
            </div>
          </div>
        </div>
        <button type="submit" :class="{ 'cursor-not-allowed': formData.products.length === 0 }"
          class="py-2 p-4 absolute box-shadow-pulse bottom-0 right-20 z-10 shadow-xl btn-primary mb-2 text-white"
          :disabled="formData.products.length === 0">
          <i class="fa-solid fa-save fa-2x"></i>
        </button>
        <!-- <div class="fixed flex flex-row  bg-white bottom-0 w-full h-16 justify-center">

    </div> -->

      </form>
    </div>
  </div>
</template>
<style>
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
<script lang="ts" setup>
import { useProductsStore } from "~/stores/productsStore";
import type{ Product, SaleForm, StockForm } from "~/types";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import AddSupplierModal from "~/components/actions/suppliers/AddSupplierModal.vue";
import Spinner from "~/components/Spinner.vue";

const loading = ref(false);
const productsStore = useProductsStore();
const supplierStore = useSuppliersStore();
const stocksStore = useStocksStore();
const showAlert = ref(false);
const alertMessage = ref("");
const selectedProduct = ref();
const isOpenCreate = ref(false);
const router = useRouter();
const formData = ref<StockForm>({
  supplier_id: "",
  date: null,
  products: [],
});
const errors = ref<any>([]);
  onMounted(() => {
    supplierStore.getData()
})
// Listenin
watch(selectedProduct, (newValue, oldValue) => {
  addProduct();
  // selectedProduct.value = null;
  // Vous pouvez effectuer des actions en réponse au changement ici
});
// Listening formData and make calculations for totalAmount
// watch(formData.value, () => {
//   // Sous total sans remise
//   formData.value.totalNewStock = formData.value.products.reduce(
//     (
//       accumulator: number,
//       product: { quantity: number }
//     ) => {
//       return accumulator + product.quantity;
//     },
//     0
//   );

//   //
// });

function addAllProducts() {
  errors.value = [];

  for (const product of productsStore.products) {
    if (existProduct(product.id)) {
      errors.value.push(
        `Le produit (${product?.name}) a déjà été sélectionné.`
      );
    } else {
      formData.value.products.push({ name: product.name, stock: product.stock, quantity: null, product_id: product.id });
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
      // Vérifiez que selectedProduct n'est pas null
      formData.value.products.push({ name: selectedProduct.value.name, stock: selectedProduct.value.stock, quantity: null, product_id: selectedProduct.value.id });
    }
    selectedProduct.value = null; // Réinitialise selectedProduct à null
  }
}
function removeProduct(index: number) {
  formData.value.products.splice(index, 1);
}
function removeAllProducts() {
  formData.value.products = [];
  errors.value = [];
}
function existProduct(productId: string) {
  for (const product of formData.value.products) {
    if (productId == product.product_id) {
      return true;
    }
  }
}

const submitForm = async () => {
  loading.value = true;
  await stocksStore.postData(formData.value).then(async (status) => {
    if (status) {
      const state = {
        showAlert: "true",
        alertMessage: "Stock enregistré avec succès",
      };
      router.push({ path: "/stocks", query: state });
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
