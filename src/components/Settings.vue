<template>
  <div>
    <h1>Paramètres</h1>


    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-3">
      <!-- Première carte (1/4 de l'écran sur les écrans larges) -->

      <div class="lg:col-span-1">
        <div class="bg-white text-red shadow-lg p-4">
          <li class="my-2">
            <NuxtLink to="/settings" class="block flex items-center gap-4">
              <!-- <Icon name="uil:bars" color="red" class="icon text-yellow-400 bg-white" size="25" /> -->
              <i class="fa-solid fa-cog"></i>
              <span>Général</span>
            </NuxtLink>
          </li>
          <hr>
          <li class="my-2">
            <NuxtLink to="/settings/users" class="block flex items-center gap-4">
              <!-- <Icon name="uil:bars" color="red" class="icon text-yellow-400 bg-white" size="25" /> -->
              <i class="fa-solid fa-cog"></i>
              <span>Utilisateurs</span>
            </NuxtLink>
          </li>
        </div>

      </div>
      <!-- Deuxième carte (3/4 de l'écran sur les écrans larges) -->
      <div class="lg:col-span-3">
        <!-- Liste des users -->
        <div class="bg-white shadow-lg p-4">
          <slot />
        </div>
      </div>
    </div>




    <!-- <div class="fixed flex flex-row  bg-white bottom-0 w-full h-16 justify-center">
  
      </div> -->


  </div>
</template>
  
  
<script setup>


</script>