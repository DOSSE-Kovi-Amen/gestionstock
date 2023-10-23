
<template>
  <div>
    <Modal :is-open="isOpen">
      <div class="modal-content text-left h-56">

        <!-- En-tête du modal -->

        <div class="flex p-4 bg-red-500 text-white justify-between pb-3">
          <h3 class="text-xl">Confirmer la suppression</h3>
          <button @click="$emit('onClose')" class="modal-close">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <!-- Contenu du modal -->
        <div v-if="loading" class="flex bg-white h-full w-full justify-center items-center ">
          <Spinner class="h-12" />
        </div>

        <div v-else>
          <div class="modal-body p-5">
            <!-- Ajoutez ici le contenu du modal -->
            <p>{{ `Supprimer la vente du ${formatDateFrench(selectedData?.createdAt)} du client
                          ${selectedData?.client.name} ? Cela est irréversible` }}</p>
          </div>

          <!-- Pied du modal -->
          <!-- Pied du modal -->
          <div class="absolute bg-gray-100 w-full flex justify-end bottom-0  p-4">
            <button class="bg-gray-200 text-black py-1 px-4 rounded-sm mr-2" @click="$emit('onClose')">
              <i class="fa-solid fa-close"></i> Fermer
            </button>
            <button v-if="selectedData" @click="deleteData(selectedData?.id ?? '', selectedData)"
              class="btn-primary text-white py-1 px-4 rounded-sm">
              <i class="fa-solid fa-trash"></i> Supprimer
            </button>
          </div>
        </div>

      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { Sale } from '~/types';

const emit = defineEmits(['onClose', 'onSuccess'])

const loading = ref(false);
const store = useSalesStore();
const productStore = useProductsStore();

defineProps<{
  isOpen: boolean
  selectedData?: Sale
}>()

const deleteData = async (id: string, sale: Sale) => {
  loading.value = true;
  store.deleteData(id).then(async () => {

    // Ajuter les stocks des produits après suppression
    for (const productDetail of sale.saleDetails) {
      productStore.getProduct(productDetail.id).then(async (product) => {
        await productStore.updateData(
          { stock: product.stock + productDetail.quantity },
          productDetail.id
        );

      })
    }

    emit('onClose')
    emit('onSuccess', "Vente annulée avec succès")
  })
  setTimeout(() => {
    loading.value = false;
  }, 3000);
}
</script>

<style scoped></style>