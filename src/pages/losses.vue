<template>
  <div>
    <SweetAlert
      :show="showAlert"
      title="alertTitle"
      :message="alertMessage"
      @on-close="showAlert = false"
    />

    <!-- Create -->
    <AddLossModal
      @on-success="(e:string) => {
      alertMessage = e;
      showAlert = true
    }"
      @on-close="isOpenCreate = false"
      :is-open="isOpenCreate"
    />

    <ViewLossModal
      @on-close="isOpenRead = false"
      :is-open="isOpenRead"
      :selected-data="selectedData"
    />

    <!-- Read -->
    <DeleteLossModal
      @on-success="(e:string) => {
      alertMessage = e;
      showAlert = true
    }"
      @on-close="isOpenDelete = false"
      :is-open="isOpenDelete"
      :selected-data="selectedData"
    />

    <button
      @click="isOpenCreate = true"
      class="py-2 p-4 shadow-xl rounded-lg btn-primary my-4 text-white"
    >
      <i class="fa-solid fa-circle-plus"></i> Ajouter nouveau
    </button>
    <!-- Liste des users -->
    <div class="p-5 bg-white w-full h-full shadow-2xl rounded-lg bg-opacity-25">
      <Datatable v-if="!store.loading">
        <thead>
          <tr>
            <th class="px-6 py-3 text-left text-sm font-bold">Produit perdu</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Prix unitaire</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Quantité</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Montant total</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Description</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white text-gray-600 divide-y divide-gray-200">
          <tr
            v-for="(loss, index) in store.losses"
            :key="index"
            :title="`Créé le ${frenchDate(
              loss.createdAt
            )}\nModifié le ${frenchDate(loss.updatedAt)}}`"
          >
            <td class="px-6 py-4 whitespace-no-wrap">{{ loss.product.name }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ loss?.product.purchase_price }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ loss.quantity }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ loss?.product.purchase_price*loss?.quantity }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ loss.description }}</td>
            <td class="flex gap-2">
              <a
                class="p-0.5 px-2 text-white bg-yellow-500 hover:bg-yellow-600 shadow-xl rounded-lg"
                @click="openModal(loss, 'read')"
              >
                <i class="fa-regular fa-eye"></i>
              </a>
              <a
                class="p-0.5 px-2 text-white bg-red-500 hover:bg-red-600 shadow-xl rounded-lg"
                @click="openModal(loss, 'delete')"
              >
                <i class="fa-regular fa-trash-can"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </Datatable>
      <div v-else class="flex flex-col justify-center items-center">
        <p class="m-2">Chargement en cours...</p>
        <Spinner class="h-12" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>

<script setup lang="ts">
import AddLossModal from "~/components/actions/losses/AddLossModal.vue";
import ViewLossModal from "~/components/actions/losses/ViewLossModal.vue";
import DeleteLossModal from "~/components/actions/losses/DeleteLossModal.vue";
import { Loss } from "~/types";
import { frenchDate } from "~/utils/constants";

const store = useLossesStore();

const selectedData = ref<Loss>();
const isOpenCreate = ref(false);
const isOpenRead = ref(false);
const isOpenDelete = ref(false);
const isOpenEdit = ref(false);
const showAlert = ref(false);
const alertMessage = ref("");

const openModal = (data: Loss, action: String) => {
  selectedData.value = data;

  switch (action) {
    case "read":
      isOpenRead.value = true;
      break;
    case "edit":
      isOpenEdit.value = true;
      break;
    case "delete":
      isOpenDelete.value = true;
      break;
    default:
      break;
  }
  console.log("====================================");
  console.log(isOpenRead.value);
  console.log("====================================");
};

definePageMeta({
  layout: "main",
});
</script>
