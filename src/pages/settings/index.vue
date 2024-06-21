<template>
  <div>
    <Settings>
      <form v-if="!storeSettings.loading" @submit.prevent="submitForm"
        class="max-w-md mx-auto p-4 bg-white rounded shadow-md">
        <div class="mb-4">
          <!-- <label for="image" class="block text-gray-700 font-bold mb-2"
          >Image du produit</label
        > -->
          <!-- Prévisualisation de l'image -->
          <img v-if="imagePreview" :src="imagePreview" alt="Prévisualisation de l'image" style="width: 200px; margin-bottom:15px"
            class="mt-2 bg-black object-contain border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500" />
          <div v-else class="mt-5">
            Aucun logo
          </div>
          <label for="image"
            class="cursor-pointer bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
            Importer logo <i class="fa fa-camera">
            </i>
          </label>
          <input @change="handleImageChange" type="file" class="hidden" accept="image/*" id="image" name="image" />

        </div>

        <input v-model="formData.societyName" class="w-full mb-4 p-2 border rounded" placeholder="Nom de la société" required/>
        * <input v-model="formData.societyEmail" class="w-full mb-4 p-2 border rounded" placeholder="Email" required/>
        <input v-model="formData.societyContact" class="w-full mb-4 p-2 border rounded" placeholder="Contact" required/>
        <input v-model="formData.societyDescription" class="w-full mb-4 p-2 border rounded" placeholder="Description" required/>
        <input v-model="formData.currency" class="w-full mb-4 p-2 border rounded" placeholder="Devise monétaire" required/>

        <button type="submit" class="w-full p-2 bg-blue-500 text-white rounded">Submit</button>
      </form>

      <div v-else class="flex flex-col justify-center items-center">
        <p class="m-2">Chargement en cours...</p>
        <Spinner class="h-12" />
      </div>
    </Settings>
  </div>
</template>


<script setup lang="ts">
import { SettingForm } from '~/types';

const emit = defineEmits(["onClose", "onSuccess"]);
const imageFile = ref(null);
const imagePreview = ref("");
const storeSettings = useSettingsStore()
const formData = ref<SettingForm>({
  societyName: "",
  societyLogo: null,
  societyEmail: "",
  societyContact: "",
  societyDescription: "",
  currency: "",
});
onMounted(() => {
  setTimeout(() => {
    if (storeSettings.settings) {


      formData.value = { ...storeSettings.settings }
      imagePreview.value = apiBaseURL + '/' + storeSettings.settings.societyLogo
    }
  }, 500);
})


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
    formData.value.societyLogo = file

    reader.readAsDataURL(file);
  }
};
const submitForm = async () => {
  const formDataToSend = new FormData();
  formDataToSend.append('societyName', formData.value.societyName);
  formDataToSend.append('societyLogo', formData.value.societyLogo);
  formDataToSend.append('societyEmail', formData.value.societyEmail);
  formDataToSend.append('societyContact', formData.value.societyContact);
  formDataToSend.append('societyDescription', formData.value.societyDescription);
  formDataToSend.append('currency', formData.value.currency);
  if (storeSettings.settings) {
    await storeSettings.updatedData(storeSettings.settings?.id, formDataToSend).then((status) => {
      if (status) {
        emit("onClose");
        emit("onSuccess", "Catégorie ajoutée avec succès");
        // formData.value.name = "";
        // formData.value.slug = "";
      }
    });
  }
  setTimeout(() => {
    storeSettings.loading = false;
  }, 10000);
};
definePageMeta({
  layout: "main",
});
</script>