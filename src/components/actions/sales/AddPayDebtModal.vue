<template>
  <div>
    <Modal :is-open="isOpen">
      <div class="modal-content text-left">
        <!-- En-tête du modal -->
        <div class="flex p-4 bg-blue-400 text-white justify-between pb-3">
          <h3 class="text-xl">
            <i class="fa-solid fa-circle-plus"></i> Payer la dette de la vente du {{ frenchDate(selectedData.created_at)+ " du client "+selectedData?.client?.name }}
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
              style="height: 35vh"
              class="modal-body pb-16 p-5 overflow-y-auto"
            >
              <!-- Ajoutez ici le contenu du modal -->
              <div
                v-if="store.errors && store.errors.length != 0"
                class="bg-red-200 border-l-4 border-red-500 p-4 mb-4"
              >
                <p
                  v-for="(error, index) in store.errors"
                  :key="index"
                  class="font-semibold my-1"
                >
                  {{ error[0] }}
                </p>
              </div>
                <div class="mb-4">
                  <h2 class="font-bold">Reste à payer: {{formatMonetaire(selectedData.debt)+' ('+convertirNombreEnLettres(selectedData.debt) +')' }}</h2>
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="amount_paid"
                    >Montant
                  </label>
                  <input
                    v-model="formData.amount_paid"
                    class="border rounded-md py-2 px-3 w-full"
                    type="text"
                    id="amount_paid"
                    name="amount_paid"
                    placeholder="Montant"
                    required
                  />
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
              <i class="fa-solid fa-close"></i>  Fermer
              </a>
              <button
                type="submit"
                class="btn-primary text-white py-2 px-4 rounded-sm"
              >
              <i class="fa-solid fa-save"></i>  Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
const store = useSalesStore();
const emit = defineEmits(["onClose", "onSuccess"]);
const loading = ref(false);
const props = defineProps<{
  isOpen: boolean;
  selectedData?: any;
}>();
const formData = ref({
  amount_paid: null
}); // Champ de nom de catégorie



const submitForm = async () => {
  loading.value = true;
  await store.postPayDebt(formData.value, props.selectedData.id).then((status) => {
    if (status) {
      emit("onClose");
      emit("onSuccess", "Paiement de dette enregistré avec succès");
      formData.value.amount_paid =null;
    }
    // emit('onClose')
    // emit('onSuccess', "Catégorie ajoutée avec succès")

    loading.value = false;
  });
  setTimeout(() => {
    loading.value = false;
  }, 10000);
};
</script>
