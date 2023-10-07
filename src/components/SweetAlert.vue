<template>
  <transition name="slide-in-out" mode="out-in">
    <div v-if="show"
      class="absolute top-20 right-4 flex items-center p-4 bg-white border-green-500 border-l-4 text-black">
      {{ message }}
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps({
  show: { type: Boolean, required: true, default: false },
  message: String
});

const emit = defineEmits(['onClose'])

// Utilisez watch pour surveiller les changements de la prop show
watch(() => props.show, (newValue, oldValue) => {
  if (newValue) {
    // Le modal est maintenant affiché, vous pouvez effectuer des actions nécessaires ici
    setTimeout(() => {
      emit("onClose")
    }, 3000);
  }
});


</script>

<style>
.slide-in-out-enter-active,
.slide-in-out-leave-active {
  transition: transform 0.3s;
}

.slide-in-out-enter-from,
.slide-in-out-leave-to {
  transform: translateX(100%);
}

.slide-in-out-enter-to,
.slide-in-out-leave-from {
  transform: translateX(0);
}
</style>
