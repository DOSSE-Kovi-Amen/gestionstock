<template>
  <div>
    <Modal :is-open="isOpen">
      <div class="modal-content text-left">
        <!-- En-tête du modal -->
        <div class="flex p-4 bg-gray-900 text-white justify-between pb-3">
          <h3 class="text-xl"><i class="fa-solid fa-lock"></i> Attribuer un rôle à un utilisateur</h3>
          <button @click="$emit('onClose')" class="modal-close">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Contenu du modal -->
        <div v-if="loading" class="flex bg-white h-64 w-full justify-center items-center ">
          <Spinner class="h-12" />
        </div>

        <div v-else>
          <form @submit.prevent="submitForm">
            <!-- Contenu du modal -->
            <div style="height: 35vh;" class="modal-body pb-16 p-5 overflow-y-auto">
              <!-- Ajoutez ici le contenu du modal -->
              <div v-if="store.errors && store.errors.length != 0" class="bg-red-200 border-l-4 border-red-500 p-4 mb-4">
                <p v-for="(error, index) in store.errors" :key="index" class="font-semibold my-1">
                  {{ error }}
                </p>
              </div>
              <div class="mb-1">
                <label for="selectedProduct" class="block text-black mb-2">Rôles:
                </label>
                <v-select v-model="user.roles" taggable multiple
                  class="bg-white border rounded w-full text-gray-700 py-0 focus:outline-none focus:border-blue-500"
                  :options="rolesStore.roles" :reduce="(option: any) => option.name" label="name"
                  placeholder="Attribuer un rôle">
                </v-select>
              </div>


            </div>


            <!-- Pied du modal -->
            <div class="absolute bg-gray-100 w-full flex justify-end bottom-0  p-4">
              <button type="button" class="bg-gray-200 text-black py-2 px-4 rounded-sm mr-2" @click="$emit('onClose')">
                Fermer
              </button>
              <button type="submit" class="btn-primary text-white py-2 px-4 rounded-sm">
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
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { User } from "~/types";
const store = useUsersStore();
const rolesStore = useRolesStore();
const props = defineProps<{
  isOpen: boolean;
  selectedData?: User;
}>();

const emit = defineEmits(['onClose', 'onSuccess'])
const loading = ref(false)
const user = ref<any>({
  roles: "",
});
watch(
  () => props.isOpen,
  (newValue, oldValue) => {
    if (newValue && props.selectedData) {
      // Le modal est maintenant affiché, vous pouvez effectuer des actions nécessaires ici
      user.value = { roles:JSON.parse(props.selectedData.roles) };
    }
  }
);
const submitForm = async () => {
  loading.value = true
  if (props.selectedData) {
    await store.updateRole(props.selectedData.id, user.value).then((status) => {

      if (status) {

        emit('onClose')
        emit('onSuccess', "Rôle(s) utilisateur attribué avec succès")

      }
      loading.value = false
    })
  }

};


</script>