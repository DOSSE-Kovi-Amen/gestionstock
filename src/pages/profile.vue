<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Contenu du profil -->
    <div class="p-4 md:p-4 lg:p-6">
      <!-- En-tête du profil -->
      <div class="mb-6 flex items-center justify-between">
        <h1 class="text-xl font-semibold">Nom de l'utilisateur</h1>
        <button class="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
          Éditer le profil
        </button>
      </div>
  
      <!-- Contenu du profil (informations utilisateur, etc.) -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <!-- Informations utilisateur -->
        <div class="mb-4">
          <h2 class="text-lg font-semibold mb-2">Informations personnelles</h2>
          <!-- Ajoutez ici les informations utilisateur, par exemple : -->
          <p>Nom : {{ auth.user?.last_name }}</p>
          <p>Nom : {{ auth.user?.first_name }}</p>
          <p>Nom : {{ auth.user?.username }}</p>

          <p>Email : {{ auth.user?.email }}</p>
          <!-- ... -->
        </div>
  
        <!-- Autres sections du profil -->
        <!-- Ajoutez ici d'autres sections du profil, par exemple : -->
        <div class="mb-4">
          <h2 class="text-lg font-semibold mb-2">Section 1</h2>
          <!-- Contenu de la section 1 -->
        </div>
  
        <div>
          <h2 class="text-lg font-semibold mb-2">Section 2</h2>
          <!-- Contenu de la section 2 -->
        </div>
      </div>
    </div>
  </div>
  
</template>
<script setup lang="ts">


const auth= useAuthStore();
definePageMeta({
  layout: "main",
});
</script>