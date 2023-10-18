<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

      <NuxtLink class="shadow-2xl rounded-md transition-transform transform hover:scale-105 duration-300" to="users">
        <Card title="Utilisateurs" icon="fa-users" :count="usersStore.usersCount()" class="bg-card-0 text-white rounded-md" />
      </NuxtLink>
      <NuxtLink class="shadow-2xl rounded-md transition-transform transform hover:scale-105 duration-300" to="organizations">
        <!-- <Card title="Organisations" icon="fa-building" :count="orgsStore.orgsCount()" class="bg-card-1 text-white rounded-md" /> -->
      </NuxtLink>
      
      <NuxtLink class="shadow-2xl rounded-md transition-transform transform hover:scale-105 duration-300" to="/properties">
        <!-- <Card title="Propriétés" icon="fa-users" :count="propertiesStore.propertiesCount()" class="bg-card-2 text-white rounded-md" /> -->
      </NuxtLink>
      <NuxtLink class="shadow-2xl rounded-md transition-transform transform hover:scale-105 duration-300" >
        <Card title="Utilisateurs" count="0" class="bg-card-3 text-white rounded-md" />
      </NuxtLink>


    </div>
    <div class="rounded-xl p-6 bg-white  shadow-xl mt-5">
        <h1>Statistiques</h1>
      <!-- <Card title="Utilisateurs" count="0" class="h-40 md:h-96 bg-card-4 text-white" /> -->

    </div>



  </div>
</template>

<script setup lang="ts">

const usersStore = useUsersStore();
// const orgsStore = useUsersStore();
// const propertiesStore = usePropertiesStore();

definePageMeta({
  layout: "main",
});
</script>