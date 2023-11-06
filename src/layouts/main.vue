<template>
  <div>
    <div class="w-full bg-pink-50">
      <!-- <Header @toggle-side-bar="onToggleSidebar" /> -->
      <div class="flex">
        <Sidebar :isSidebarOpen="isSidebarOpen" />

        <div class="flex flex-col w-full " style="height: 100vh;">
          <Header @toggle-side-bar="onToggleSidebar" />
          <main class="w-full p-4 pb-10 overflow-y-auto">

            <div class="mt-1">
              <!-- <transition name="modal" mode="out-in"> -->
                <slot />
              <!-- </transition> -->
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
const isSidebarOpen = ref(true)
const onToggleSidebar = () => {
  // Fermez le sidebar
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>