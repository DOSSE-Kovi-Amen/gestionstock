<template>
  <div class="overflow-x-auto">

    <table id="myTable" class="w-full table-hover table-head text-white">
      <slot />

    </table>
  </div>
</template>


<script setup lang="ts">
const props = defineProps(['search','data']);

const search = ref(props.search || '');  // Utilisez la valeur de la prop ou une chaîne vide par défaut

</script>

<style></style>