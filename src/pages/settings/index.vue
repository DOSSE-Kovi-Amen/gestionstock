<template>
  <div>
    <Settings>
      <form @submit.prevent="submitForm" class="max-w-md mx-auto p-4 bg-white rounded shadow-md">
        <input v-model="societyName" class="w-full mb-4 p-2 border rounded" placeholder="Nom de la société" />
        <input v-model="societyLogo" class="w-full mb-4 p-2 border rounded" placeholder="Logo" />
        <input v-model="societyEmail" class="w-full mb-4 p-2 border rounded" placeholder="Email" />
        <input v-model="societyContact" class="w-full mb-4 p-2 border rounded" placeholder="Contact" />
        <input v-model="societyDescription" class="w-full mb-4 p-2 border rounded" placeholder="Description" />
        <input v-model="currency" class="w-full mb-4 p-2 border rounded" placeholder="Devise monétaire" />
  
        <button type="submit" class="w-full p-2 bg-blue-500 text-white rounded">Submit</button>
      </form>
    </Settings>
  </div>
</template>


<script setup>
    const formData = ref({
      societyName: null,
      societyLogo: null,
      societyEmail: null,
      societyContact: null,
      societyDescription: null,
      currency: null,
    });

  definePageMeta({
    layout: "main",
  });
</script>