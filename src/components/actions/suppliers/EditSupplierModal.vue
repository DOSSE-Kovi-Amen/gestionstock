<template>
  <div>
    <Modal :is-open="isOpen">
      <div class="modal-content text-left">
        <!-- En-tête du modal -->
        <div class="flex p-4 bg-blue-400 text-white justify-between pb-3">
          <h3 class="text-xl">
            <i class="fa-solid fa-circle-plus"></i> Editer un fournisseur
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
              style="height: 85vh"
              class="modal-body pb-16 p-5 overflow-y-auto"
            >
              <!-- Ajoutez ici le contenu du modal -->

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="name"
                    >Nom (*) :
                  </label>
                  <input
                    v-model="formData.name"
                    class="border rounded-md py-2 px-3 w-full"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nom"
                    required
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="codeCli"
                    >Code Client :</label
                  >
                  <input
                    v-model="formData.codeSupplier"
                    class="border rounded-md py-2 px-3 w-full"
                    type="text"
                    id="codeCli"
                    name="codeCli"
                    placeholder="Code Client"
                    required
                  />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="email"
                    >Email :</label
                  >
                  <input
                    v-model="formData.email"
                    class="border rounded-md py-2 px-3 w-full"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="telephone"
                    >Telephone (*) :
                  </label>
                  <input
                    v-model="formData.telephone"
                    class="border rounded-md py-2 px-3 w-full"
                    type="text"
                    id="telephone"
                    name="telephone"
                    placeholder="Téléphone"
                    required
                  />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="zipCode"
                    >Code postal :</label
                  >
                  <input
                    v-model="formData.zipCode"
                    class="border rounded-md py-2 px-3 w-full"
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    placeholder="Code postal"
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="address"
                    >Adresse :</label
                  >
                  <input
                    v-model="formData.address"
                    class="border rounded-md py-2 px-3 w-full"
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Adresse"
                  />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="country"
                    >Pays :</label
                  >
                  <input
                    v-model="formData.country"
                    class="border rounded-md py-2 px-3 w-full"
                    type="country"
                    id="country"
                    name="country"
                    placeholder="Pays"
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="city"
                    >Ville :</label
                  >
                  <input
                    v-model="formData.city"
                    class="border rounded-md py-2 px-3 w-full"
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Ville"
                  />
                </div>
              </div>
              <div class="mb-4">
                <label
                  for="description"
                  class="block text-gray-700 font-bold mb-2"
                  >Description</label
                >
                <textarea
                  v-model="formData.description"
                  id="description"
                  name="description"
                  class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
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
              <i class="fa-solid fa-close"></i> Fermer
              </a>
              <button
                type="submit"
                class="btn-primary text-white py-2 px-4 rounded-sm"
              >
              <i class="fa-solid fa-save"></i> Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { Supplier } from "~/types";

const store = useSuppliersStore();
const emit = defineEmits(["onClose", "onSuccess"]);
const loading = ref(false);
const props = defineProps<{
  isOpen: boolean;
  selectedData?: Supplier;
}>();
const formData = ref({
  codeSupplier: "", //
  name: "",
  email: "",
  telephone: "",
  zipCode: "",
  address: "",
  description: "",
  country: "",
  city: ""
}); // Champ de nom de catégorie

watch(
  () => props.isOpen,
  (newValue, oldValue) => {
    if (newValue && props.selectedData) {
      // Le modal est maintenant affiché, vous pouvez effectuer des actions nécessaires ici
      formData.value = { ...props.selectedData };
    }
  }
);

// watch(categoryName, updateSlug);

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
          emit("onSuccess", "Catégorie mise à jour avec succès");
        }

        loading.value = false;
      });
  }

  setTimeout(() => {
    loading.value = false;
  }, 15000);
};
</script>
