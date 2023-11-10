<template>
  <div>
    <Settings>
      <form v-if="!storeSettings.loading" @submit.prevent="submitForm"
        class="max-w-md mx-auto p-4 bg-white rounded shadow-md">
        <input v-model="formData.societyName" class="w-full mb-4 p-2 border rounded" placeholder="Nom de la société" />
        <input v-model="formData.societyLogo" class="w-full mb-4 p-2 border rounded" placeholder="Logo" />
        <input v-model="formData.societyEmail" class="w-full mb-4 p-2 border rounded" placeholder="Email" />
        <input v-model="formData.societyContact" class="w-full mb-4 p-2 border rounded" placeholder="Contact" />
        <input v-model="formData.societyDescription" class="w-full mb-4 p-2 border rounded" placeholder="Description" />
        <input v-model="formData.currency" class="w-full mb-4 p-2 border rounded" placeholder="Devise monétaire" />

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
const emit = defineEmits(["onClose", "onSuccess"]);

const storeSettings = useSettingsStore()
const loading = ref(false)
const formData = ref({
  societyName: null,
  societyLogo: null,
  societyEmail: null,
  societyContact: null,
  societyDescription: null,
  currency: null,
});
onMounted(() => {
  setTimeout(() => {
    formData.value = { ...storeSettings.settings }

  }, 500);
})

const submitForm = async () => {
  loading.value = true;
  console.log("==================post==================");
  console.log(formData);
  console.log("====================================");
  await storeSettings.postData(formData.value).then((status) => {
    if (status) {
      emit("onClose");
      emit("onSuccess", "Catégorie ajoutée avec succès");
      // formData.value.name = "";
      // formData.value.slug = "";
    }
    loading.value = false;
  });
  setTimeout(() => {
    loading.value = false;
  }, 15000);
};
definePageMeta({
  layout: "main",
});
</script>