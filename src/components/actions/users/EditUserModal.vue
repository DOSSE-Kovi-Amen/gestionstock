<template>
  <div>
    <Modal :is-open="isOpen">
      <div class="modal-content text-left">
        <!-- En-tête du modal -->
        <div class="flex p-4 bg-blue-400 text-white justify-between pb-3">
          <h3 class="text-xl"><i class="fa-solid fa-edit"></i> Modifier un utilisateur</h3>
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
            <div style="height: 85vh;" class="modal-body pb-16 p-5 overflow-y-auto">
              <!-- Ajoutez ici le contenu du modal -->
              <div v-if="store.errors && store.errors.length != 0" class="bg-red-200 border-l-4 border-red-500 p-4 mb-4">
                <p v-for="(error, index) in store.errors" :key="index" class="font-semibold my-1">
                  {{ error }}
                </p>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Nom :</label>
                <input v-model="user.name" class="border rounded-md py-2 px-3 w-full" type="text" id="name" name="name"
                  placeholder="Nom et prénoms" required />
              </div>


              <!-- <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="oldPwd">Ancien Mot de passe :</label>
                <input v-model="user.oldPassword" class="border rounded-md py-2 px-3 w-full" type="password" id="oldPwd"
                  name="password" placeholder="Mot de passe" />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="newPwd">Nouveau Mot de passe :</label>
                <input v-model="user.password" class="border rounded-md py-2 px-3 w-full" type="password" id="newPwd"
                  name="password" placeholder="Mot de passe" />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="confirmPwd">Confirmer mot de passe
                  :</label>
                <input v-model="user.confirmPassword" class="border rounded-md py-2 px-3 w-full" type="password"
                  id="confirmPwd" name="password" placeholder="Confirmer Mot de passe" />
              </div> -->

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
import type{ User } from "~/types";
const store = useUsersStore();
const rolesStore = useRolesStore();
const props = defineProps<{
  isOpen: boolean;
  selectedData?: User;
}>();

const emit = defineEmits(['onClose', 'onSuccess'])
const loading = ref(false)
const user = ref<any>({
  name: "",
  // oldPassword: null,
  // password: null,
  // confirmPassword: '',
});
watch(
  () => props.isOpen,
  (newValue, oldValue) => {
    if (newValue && props.selectedData) {
      // Le modal est maintenant affiché, vous pouvez effectuer des actions nécessaires ici
      user.value = { name:props.selectedData.name };
    }
  }
);
const submitForm = async () => {
  loading.value = true
  if (props.selectedData) {
    await store.updatedData(props.selectedData.id, user.value).then((status) => {

      if (status) {

        emit('onClose')
        emit('onSuccess', "Compte utilisateur modifié avec succès")

      }
      loading.value = false
    })
  }

};


</script>