<template>
  <div>

    <SweetAlert :show="showAlert" title="alertTitle" :message="alertMessage" @on-close="showAlert = false" />

    <ViewProductModal @on-close="isOpenRead = false" :is-open="isOpenRead" :selected-data="selectedData" />

    <!-- Create -->
    <AddProductModal @on-success="(e) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenCreate = false" :is-open="isOpenCreate" />

    <!-- Create -->
    <EditProductModal @on-success="(e) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenEdit = false" :is-open="isOpenEdit" :selected-data="selectedData" />

    <!-- barcode -->
    <ProductBarcodeModal @on-success="(e) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenBarcode = false" :is-open="isOpenBarcode" :selected-data="selectedData" />

    <!-- Read -->
    <DeleteProductModal @on-success="(e) => {
      alertMessage = e;
      showAlert = true
    }" @on-close="isOpenDelete = false" :is-open="isOpenDelete" :selected-data="selectedData" />

    <button @click="isOpenCreate = true" class="py-2 p-4 rounded-lg shadow-xl btn-primary my-4 text-white"><i
        class="fa-solid fa-circle-plus"></i>
      Ajouter nouveau</button>
    <!-- Liste des users -->
    <div class="p-5 bg-white w-full h-full shadow-2xl rounded-lg bg-opacity-25">

      <Datatable v-if="!store.loading">
        <thead>
          <tr>
            <th class="px-6 py-3 text-left text-sm font-bold">Image</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Nom</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Catégorie</th>
            <!-- <th class="px-6 py-3 text-left text-sm font-bold">description</th> -->
            <th class="px-6 py-3 text-left text-sm font-bold">P.U vente</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Stock</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white text-gray-600 divide-y divide-gray-200">
          <tr v-for="(product, index) in store.products" :key="index"
            :title="`Créé le ${frenchDate(product.created_at)}\nModifié le ${frenchDate(product.updated_at)}}`">
            <td> <img v-if="product.image != 'null'" style="object-fit: contain;height:70px; width:70px"
                :src="getImageUrl(product.image)" alt="Prévisualisation de l'image"
                class="px-3 text-gray-700 focus:outline-none focus:border-blue-500" />
              <img v-if="product.image == 'null'" style="object-fit: contain;height:70px; width:70px"
                src="@/assets/images/noimage.jpeg" alt="Prévisualisation de l'image"
                class="px-3 text-gray-700 focus:outline-none focus:border-blue-500" />
            </td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ product.name }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ product?.category?.name }}</td>
            <td class="px-6 py-4 whitespace-no-wrap font-semibold text-green-500">{{ formatMonetaire(product.selling_price) }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ product.stock }}</td>

            <td class="flex gap-2 mt-5">
              <a class="p-0.5 px-2 text-white  bg-blue-900 hover:bg-black shadow-xl rounded-lg"
                @click="openModal(product, 'barcode')">
                <Barcode :barcode="product.id" />
              </a>
              <a class="p-0.5 px-2 text-white  bg-yellow-500 hover:bg-yellow-600 shadow-xl rounded-lg"
                @click="openModal(product, 'read')">
                <i class="fa-regular fa-eye"></i>
              </a>
              <a class="p-0.5 px-2 text-white  bg-blue-500 hover:bg-blue-600 shadow-xl rounded-lg"
                @click="openModal(product, 'edit')">
                <i class="fa-regular fa-pen-to-square"></i>
              </a>

              <a class="p-0.5 px-2 text-white  bg-red-500 hover:bg-red-600 shadow-xl rounded-lg"
                @click="openModal(product, 'delete')">
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
import AddProductModal from '~/components/actions/products/AddProductModal.vue';
import ViewProductModal from '~/components/actions/products/ViewProductModal.vue';
import EditProductModal from '~/components/actions/products/EditProductModal.vue';
import ProductBarcodeModal from '~/components/actions/products/ProductBarcodeModal.vue';
import DeleteProductModal from '~/components/actions/products/DeleteProductModal.vue';
import type{ Product } from '~/types';

const store = useProductsStore();

const selectedData = ref<Product>();
const isOpenCreate = ref(false);
const isOpenRead = ref(false);
const isOpenBarcode = ref(false);
const isOpenDelete = ref(false);
const isOpenEdit = ref(false);
const showAlert = ref(false);

const alertMessage = ref("");

onMounted(() => {
  store.getLowProducts()
})


const openModal = (data: Product, action: String) => {
  selectedData.value = data

  switch (action) {
    case 'barcode': isOpenBarcode.value = true;
      break;
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
