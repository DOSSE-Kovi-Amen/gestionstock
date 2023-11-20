<template>
  <div>
    <img :id="'barcode' + barcode" />
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import JsBarcode from 'jsbarcode';

const props = defineProps(['barcode'])

onBeforeMount(() => {
  setTimeout(() => {
    JsBarcode(`#barcode${props.barcode}`, props.barcode, {
      format: 'CODE128', // ou tout autre format pris en charge par JsBarcode
      width: 1,
      height: 20,
    });
  }, 500);
})

</script>
  