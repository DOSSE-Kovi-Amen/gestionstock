<template>
  <div>
    <Modal :is-open="isOpen">
      <div class="modal-content text-left">
        <!-- En-tête du modal -->
        <div class="flex p-4 bg-blue-400 text-white justify-between pb-3">
          <h3 class="text-xl"><i class="fa-solid fa-circle-plus"></i> Ajouter un utilisateur</h3>
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
            <div style="height: 85vh;" class="modal-body pb-32 p-5 overflow-y-auto">
              <!-- Ajoutez ici le contenu du modal -->
              <div v-if="store.errors && store.errors.length != 0" class="bg-red-200 border-l-4 border-red-500 p-4 mb-4">
                <p v-for="(error, index) in store.errors" :key="index" class="font-semibold my-1">
                  {{ error }}
                </p>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Nom :</label>
                  <input v-model="user.name" class="border rounded-md py-2 px-3 w-full" type="text" id="username"
                    name="username" placeholder="Nom et prénoms" required />
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="last_name">Pseudo :</label>
                  <input v-model="user.username" class="border rounded-md py-2 px-3 w-full" type="text" id="last_name"
                    name="last_name" placeholder="Pseudo" required />
                </div>
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email :</label>
                <input v-model="user.email" class="border rounded-md py-2 px-3 w-full" type="email" id="email"
                  name="email" placeholder="Email" required />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="phone_number">Téléphone :</label>
                <input v-model="user.phone_number" class="border rounded-md py-2 px-3 w-full" type="text" id="phone_number"
                  name="phone_number" placeholder="Numéro de téléphone" required />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Mot de passe :</label>
                  <input v-model="user.password" class="border rounded-md py-2 px-3 w-full" type="password" id="password"
                    name="password" placeholder="Mot de passe" required />
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Confirmer mot de passe
                    :</label>
                  <input v-model="user.confirmPassword" class="border rounded-md py-2 px-3 w-full" type="password"
                    id="password" name="password" placeholder="Confirmer Mot de passe" required />
                </div>
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
            <div style="z-index: 100;" class="absolute bg-gray-100 w-full flex justify-end bottom-0  p-4">
              <button class="bg-gray-200 text-black py-2 px-4 rounded-sm mr-2" @click="$emit('onClose')">
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
const store = useUsersStore();
const rolesStore = useRolesStore();

const emit = defineEmits(['onClose', 'onSuccess'])
const loading = ref(false)
const user = ref({
  name: '',
  username: '',
  email: '',
  phone_number: '',
  password: '',
  confirmPassword: '',
  roles: null
});

const submitForm = async () => {
  loading.value = true
  await store.createUser(user.value).then((status) => {

    if (status) {
      console.log('=============data=======================');
      console.log(user);
      console.log('====================================');
      emit('onClose')
      emit('onSuccess', "Utilisateur ajouté avec succès")

    }
    loading.value = false
  })
};

defineProps({
  isOpen: { type: Boolean, required: true, default: false },
})
</script>