<template>
  <div class="p-3">
    <div class="flex gap-5 mb-4 w-full">
      <div class="bg-white bg-opacity-50 text-white rounded-full h-10 w-10 flex items-center justify-center">
        <!-- Icône d'utilisateur ou autre symbole -->
        <i :class="icon" class="fa" aria-hidden="true"></i>

      </div>
      <div class="flex flex-col overflow-hidden ">
        <p class="font-semibold mb-1">{{ count }}</p>
        <div class="text-xs ">{{ title }}</div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(['title', 'count', 'icon'])

</script>

<style scoped></style>