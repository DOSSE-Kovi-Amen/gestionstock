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

          <div
          v-if="store.errors && store.errors.length != 0"
          class="bg-red-200 border-l-4 border-red-500 p-4 mb-4"
        >
          <p
            v-for="(error, index) in store.errors"
            :key="index"
            class="font-semibold my-1"
          >
            {{ error }} :
          </p>
        </div>
          <form @submit.prevent="submitForm">
            <!-- Contenu du modal -->
            <div style="height: 80vh;" class="modal-body pb-16 p-5 overflow-y-auto">
              <!-- Ajoutez ici le contenu du modal -->
              <div v-if="store.errors && store.errors.length!=0" class="bg-red-200 border-l-4 border-red-500 p-4 mb-4">
                <p  v-for="(error, index) in  store.errors" :key="index" class="font-semibold my-1">
                  {{ getFieldFromPointer(error.source.pointer) }} : {{error.detail}}</p>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Pseudo :</label>
                  <input v-model="user.username" class="border rounded-md py-2 px-3 w-full" type="text" id="username"
                    name="username" placeholder="Nom d'utilisateur" required />
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="last_name">Nom :</label>
                  <input v-model="user.last_name" class="border rounded-md py-2 px-3 w-full" type="text" id="last_name"
                    name="last_name" placeholder="Nom de famille" required />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="first_name">Prénom :</label>
                  <input v-model="user.first_name" class="border rounded-md py-2 px-3 w-full" type="text" id="first_name"
                    name="first_name" placeholder="Prénom" required />
                </div>

                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="middle_name">Deuxième prénom :</label>
                  <input v-model="user.middle_name" class="border rounded-md py-2 px-3 w-full" type="text"
                    id="middle_name" name="middle_name" placeholder="Deuxième prénom" />
                </div>
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email :</label>
                <input v-model="user.email" class="border rounded-md py-2 px-3 w-full" type="email" id="email"
                  name="email" placeholder="Email" required />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="phone_number">Numéro de téléphone :</label>
                <input v-model="user.phone_number" class="border rounded-md py-2 px-3 w-full" type="tel" id="phone_number"
                  name="phone_number" placeholder="Numéro de téléphone" />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Mot de passe :</label>
                  <input v-model="user.password" class="border rounded-md py-2 px-3 w-full" type="password" id="password"
                    name="password" placeholder="Mot de passe" required />
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Mot de passe :</label>
                  <input v-model="user.password2" class="border rounded-md py-2 px-3 w-full" type="password"
                    id="password2" name="password2" placeholder="Confirmer Mot de passe" required />
                </div>
              </div>

            </div>


            <!-- Pied du modal -->
            <div class="absolute bg-gray-100 w-full flex justify-end bottom-0  p-4">
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
const store = useUsersStore();
const emit = defineEmits(['onClose', 'onSuccess'])
const loading = ref(false)
const user = {
  username: '',
  first_name: '',
  last_name: '',
  middle_name: null,
  email: '',
  phone_number: null,
  password: '',
  password2: '',
};

const submitForm = async () => {
  loading.value = true
  await store.postData(user).then((status) => {

    if (status) {
      console.log('=============data=======================');
      console.log(status);
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