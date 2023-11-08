<template>
  <div class="min-h-screen">
    <!-- Contenu du profil -->
    <div class="p-2 md:p-2 lg:p-2">
      <!-- En-tête du profil -->
      <div class="mb-6 flex items-center justify-between">
        <h1 class="text-xl font-semibold">Nom de l'utilisateur</h1>
        <button class="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
          Éditer le profil
        </button>
      </div>

      <!-- Contenu du profil (informations utilisateur, etc.) -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3">

          <div class="mb-4 lg:col-span-1">
            <h2 class="text-lg font-semibold mb-2">Logo</h2>
            <!-- Logo -->
            <span v-if="!auth.user?.photo">Aucune photo de profile disponible</span>
            <img v-if="auth.user?.photo && !imagePreview" :src="apiBaseURL + '/' + auth.user?.photo"
              alt="Prévisualisation de l'image" style="width: 200px;"
              class="mt-2 mb-3  object-contain w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500" />
            <div class="mb-4"></div>
            <form @submit.prevent="editPhoto">
              <label for="image"
                class="cursor-pointer bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                <i class="fa fa-camera">
                </i>
              </label>
              <input @change="handleImageChange" type="file" class="hidden" accept="image/*" id="image" name="image" />
              <div class="mb-4">
                <!-- <label for="image" class="block text-gray-700 font-bold mb-2"
                >Image du produit</label
              > -->
                <!-- Prévisualisation de l'image -->
                <img v-if="imagePreview" :src="imagePreview" alt="Prévisualisation de l'image" style="width: 200px;"
                  class="mt-2 bg-black object-contain border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500" />
              </div>
              <button v-if="photo" class="bg-blue-500 hover:bg-blue-600 py-1 px-2 rounded-lg text-white"
                type="submit">Changer</button>
            </form>

          </div>
          <!-- Informations utilisateur -->
          <div class="mb-4 lg:col-span-1">
            <!-- Ajoutez ici d'autres sections du profil, par exemple : -->
            <h2 class="text-lg font-semibold mb-2">Informations personnelles</h2>
            <!-- Ajoutez ici les informations utilisateur, par exemple : -->
            <p>Nom : {{ auth.user?.name }}</p>
            <p>Pseudo : {{ auth.user?.username }}</p>
            <p>Email : {{ auth.user?.email }}</p>
            <p>Téléphone : {{ auth.user?.phoneNumber }}</p>
            <p>Téléphone : {{ auth.user?.phoneNumber }}</p>
            <!-- ... -->
          </div>
        </div>

        <!-- Autres sections du profil -->

        <div>
          <!-- Contenu de la section 2 -->
          <form @submit.prevent="updateData">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Noms :</label>
              <input v-model="formData.name" class="border rounded-md py-2 px-3 w-full" type="text" id="name" name="name"
                placeholder="Nom d'utilisateur" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Mot de passe :</label>
              <input v-model="formData.password" class="border rounded-md py-2 px-3 w-full" type="password" id="password"
                name="password" placeholder="Mot de passe" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Confirmer mot de passe
                :</label>
              <input v-model="formData.confirmPassword" class="border rounded-md py-2 px-3 w-full" type="password"
                id="password" name="password" placeholder="Confirmer Mot de passe" required />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUsersStore } from '#imports';
const formData = ref<any>({
  name: "",
  password: null,
  confirmPassword: null
})

const photo = ref<any>()
const usersStore = useUsersStore()
const auth = useAuthStore();

const imageFile = ref(null);
const imagePreview = ref("");

onMounted(() => {
  if (auth.user) {
    formData.value.name = auth.user.name
  }
})
// Gérer le changement de fichier image
const handleImageChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;

    const reader = new FileReader();

    reader.onload = (e) => {
      // Lorsque le fichier est chargé, mettez à jour l'aperçu de l'image
      if (typeof e.target?.result === "string") {
        imagePreview.value = e.target.result;
      }
    };
    photo.value = file

    reader.readAsDataURL(file);
  }
};
const editPhoto = async () => {
  const formDataToSend = new FormData();
  formDataToSend.append('photo', photo.value);
  if (auth.user) {
    await usersStore.updatePhoto(formDataToSend, auth.user.id).then(async() => {
      photo.value = null;
     await auth.getProfile()
    });
  }
}

const updateData = async () => {
  if (auth.user) {
    usersStore.updateData(formData, auth.user.id).then(() => {

    })
  }
}


definePageMeta({
  layout: "main",
});
</script>