<template>
  <div>
    <Modal :is-open="isOpen">
      <div class="modal-content text-left">
        <!-- En-tête du modal -->
        <div class="flex p-4 bg-blue-400 text-white justify-between pb-3">
          <h3 class="text-xl">
            <i class="fa-solid fa-circle-plus"></i> Editer une catégorie
          </h3>
          <button @click="$emit('onClose')" class="modal-close">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Contenu du modal -->
        <div
          v-if="loading"
          class="flex bg-white h-64 w-full justify-center items-center"
        >
          <Spinner class="h-12" />
        </div>

        <div v-else>
          <form @submit.prevent="submitForm">
            <!-- Contenu du modal -->
            <div
              style="height: 60vh"
              class="modal-body pb-16 p-5 overflow-y-auto"
            >
              <!-- Ajoutez ici le contenu du modal -->

              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="name"
                  >Titre :</label
                >
                <input
                  v-model="formData.title"
                  class="border rounded-md py-2 px-3 w-full"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Titre"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="name"
                  >Montant :</label
                >
                <input
                  v-model="formData.amount"
                  class="border rounded-md py-2 px-3 w-full"
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="Montant"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="slug"
                  >Description :</label
                >
                <textarea
                  v-model="formData.description"
                  id="description"
                  name="description"
                  class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                  placeholder="Description"
                ></textarea>
              </div>
            </div>

            <!-- Pied du modal -->
            <div
              class="absolute bg-gray-100 w-full flex justify-end bottom-0 p-4"
            >
              <a
                class="bg-gray-200 text-black py-2 px-4 rounded-sm mr-2"
                @click="$emit('onClose')"
              >
                Fermer
              </a>
              <button
                type="submit"
                class="btn-primary text-white py-2 px-4 rounded-sm"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { Spend, SpendForm } from "~/types";

const store = useSpendsStore();
const emit = defineEmits(["onClose", "onSuccess"]);
const loading = ref(false);
const props = defineProps<{
  isOpen: boolean;
  selectedData?: Spend;
}>();
const formData = ref({
  title: "",
  amount: "",
  description: "",
}); // Champ de nom de catégorie

watch(
  () => props.isOpen,
  () => {
    if (props.selectedData) {
      // Le modal est maintenant affiché, vous pouvez effectuer des actions nécessaires ici
      formData.value = { ...props.selectedData };
    }
  }
);

const submitForm = async () => {
  loading.value = true;
  if (props.selectedData) {
    await store
      .updateData(formData.value, props.selectedData.id)
      .then((status) => {
        if (status) {
          console.log("=============status=======================");
          console.log(status);
          console.log("====================================");
          emit("onClose");
          emit("onSuccess", "Dépense mise à jour avec succès");
        }

        loading.value = false;
      });
  }

  setTimeout(() => {
    loading.value = false;
  }, 15000);
};
</script>
