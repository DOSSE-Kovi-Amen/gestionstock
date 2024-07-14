<template>
  <div class="min-h-screen">
    <SweetAlert :show="showAlert" title="alertTitle" :message="alertMessage" @on-close="showAlert = false" />
    <!-- Contenu du profil -->
    <div class="p-2 md:p-2 lg:p-2">

      <div v-if="usersStore.errors && usersStore.errors.length != 0"
        class="bg-red-200 border-l-4 border-red-500 p-4 mb-4">
        <p v-for="(error, index) in usersStore.errors" :key="index" class="font-semibold my-1">
          {{ error }} :
        </p>
      </div>

      <!-- Contenu du profil (informations utilisateur, etc.) -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3">

          <div class="mb-4 lg:col-span-1">
            <h2 class="text-lg font-semibold mb-2">Logo</h2>
            <!-- Logo -->
            <span v-if="!auth.user?.photo">Aucune photo de profile disponible</span>
            <img v-if="auth.user?.photo && !photo" :src="getImageUrl(auth.user?.photo)"
              alt="Prévisualisation de l'image" style="width: 200px; height: 200px"
              class="mt-2 mb-3  object-cover border rounded-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500" />
            <div class="mb-4"></div>
            <form @submit.prevent="editPhoto">
              <div class="mb-4">
                <!-- <label for="image" class="block text-gray-700 font-bold mb-2"
                >Image du produit</label
              > -->
                <!-- Prévisualisation de l'image -->
                <img v-if="imagePreview && photo" :src="imagePreview" alt="Prévisualisation de l'image"
                  style="width: 200px; height: 200px"
                  class="mt-2 bg-black object-contain border rounded-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500" />
              </div>
              <label for="image"
                class="cursor-pointer bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                <i class="fa fa-camera">
                </i>
              </label>
              <input @change="handleImageChange" type="file" class="hidden" accept="image/*" id="image" name="image" />

              <button v-if="photo" class="bg-blue-500 mx-5 py-2 hover:bg-blue-600 py-1 px-2 rounded-lg text-white"
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
            <p>Téléphone : {{ auth.user?.phone_number }}</p>
            <!-- ... -->
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 class="font-bold">Modifier profil utilisateur</h2>
            <form @submit.prevent="updatedProfileData">
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Noms :</label>
                <input v-model="profileForm.name" class="border rounded-md py-2 px-3 w-full" type="text" id="name"
                  name="name" placeholder="Nom d'utilisateur" />
              </div>

              <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Mettre à jour
              </button>
            </form>
          </div>

          <div>
            <h2 class="font-bold">Modifier mot de passe utilisateur</h2>
            <br>

            <!-- Contenu de la section 2 -->
            <form @submit.prevent="changePwd">
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="current_password">Mot de passe
                  actuel:</label>
                <input v-model="pwdForm.current_password" class="border rounded-md py-2 px-3 w-full" type="password"
                  id="current_password" placeholder="Mot de passe" required />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for=",ew_password">Nouveau Mot de passe
                  :</label>
                <input v-model="pwdForm.new_password" class="border rounded-md py-2 px-3 w-full" type="password"
                  id="new_password" placeholder="Mot de passe" required />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="new_password_confirmation">Confirmer mot
                  de passe
                  :</label>
                <input v-model="pwdForm.new_password_confirmation" class="border rounded-md py-2 px-3 w-full"
                  type="password" id="new_password_confirmation" placeholder="Confirmer Mot de passe" required />
              </div>
              <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Changer
              </button>
            </form>
          </div>
        </div>
        <!-- Autres sections du profil -->

      </div>
    </div>

    <!-- <div v-if="auth.errors && auth.errors.length != 0" class="bg-red-200 border-l-4 border-red-500 p-4 mb-4">
      <p v-for="(error, index) in auth.errors" :key="index" class="font-semibold my-1">
        {{ error }} :
      </p>
    </div> -->
  </div>
</template>
<script setup lang="ts">

const showAlert = ref(false);
const alertMessage = ref("");
const profileForm = ref({
  name: "",
  // email: "",
  // phone_number: ""
})

const pwdForm = ref({
  current_password: null,
  new_password: null,
  new_password_confirmation: null
})


const photo = ref<any>()
const usersStore = useUsersStore()
const auth = useAuthStore();

onMounted(async () => {
  await auth.getProfile()
  if (auth.user) {
    profileForm.value.name = auth.user.name
  }
})

const imageFile = ref(null);
const imagePreview = ref("");


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
  console.log('====================================');
  console.log(photo.value);
  console.log('====================================');
  const formDataToSend = new FormData();
  formDataToSend.append('photo', photo.value);
  formDataToSend.append('_method', 'PATCH');

  await usersStore.updateProfilePhoto(formDataToSend).then(async () => {
    photo.value = null;
    imagePreview.value = "";
    imageFile.value = null
    await auth.getProfile()
  });

}

const updatedProfileData = async () => {

  await usersStore.updatedProfileData(profileForm.value).then(async (status) => {
    if (status) {
      showAlert.value = true;
      alertMessage.value = "Mise à jour réussie"
      await auth.getProfile()
    }

  })

}



const changePwd = async () => {
  if (auth.user) {
    await usersStore.changePwd(pwdForm.value).then(async (status) => {
      if (status) {
        showAlert.value = true;
        pwdForm.value.current_password = null;
        pwdForm.value.new_password = null;
        pwdForm.value.new_password_confirmation = null;
        alertMessage.value = "Changement du mot de passe réussi"
        await auth.getProfile()
      }

    })
  }
}


definePageMeta({
  layout: "main",
});
</script>