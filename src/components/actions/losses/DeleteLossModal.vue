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
        <div
          v-if="loading"
          class="flex bg-white h-full w-full justify-center items-center"
        >
          <Spinner class="h-12" />
        </div>

        <div v-else>
          <div class="modal-body p-5">
            <!-- Ajoutez ici le contenu du modal -->
            <p>{{ `Supprimer la perte de ${selectedData?.product.name} ?` }}</p>
          </div>

          <!-- Pied du modal -->
          <!-- Pied du modal -->
          <div
            class="absolute bg-gray-100 w-full flex justify-end bottom-0 p-4"
          >
            <button
              class="bg-gray-200 text-black py-1 px-4 rounded-sm mr-2"
              @click="$emit('onClose')"
            >
              <i class="fa-solid fa-close"></i> Fermer
            </button>
            <button
              @click="deleteData(selectedData?.id ?? '', selectedData)"
              class="btn-primary text-white py-1 px-4 rounded-sm"
            >
              <i class="fa-solid fa-trash"></i> Supprimer
            </button>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { Loss, Product, Spend } from '~/types';

const emit =defineEmits(['onClose','onSuccess'])

const loading=ref(false);
const store = useLossesStore();
const productStore = useProductsStore();
defineProps<{
  isOpen: boolean
  selectedData?:Loss
}>()

const deleteData = async (id: string, loss:Loss|any) => {
  loading.value=true;
  store.deleteData(id).then(async() => {
    loading.value=false;
    productStore.getProduct(loss.product.id).then(async(product) => {
    await productStore.updateData(
        { stock: product.stock + loss.quantity },
        loss.product.id
      );

    })

    emit('onClose')
    emit('onSuccess',"Perte supprimée avec succès")
  })
}
</script>

<style scoped></style>
