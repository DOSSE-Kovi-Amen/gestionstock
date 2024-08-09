<template>
  <header class="z-10">
    <nav class="bg-white bg-opacity-60 py-2">
      <div class="px-3">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2 font-semibold">
            <a @click="$emit('toggleSideBar')">
              <span>
                <i class="fa-solid fa-bars fa-xl"></i>
              </span>
            </a>
            <span class="px-3 py-2 bg-white right-0 rounded-full font-normal">Tableau de bord
              <span class="text-gray-500 font-normal">{{ route.name == 'index' ? '' : '> ' + route.name }}</span>
            </span>
          </div>

          <div class="space-x-4 h-10 flex items-center">
            <!-- Icone de notification avec badge -->
            <div class="relative">
              <NuxtLink to="/low-stock-products" class="relative focus:outline-none">
                <i class="fa-solid fa-bell fa-xl text-gray-700"></i>
                <span
                  class="absolute bottom-5 left-5 inline-block w-4 h-4 bg-green-500 text-white text-xs font-semibold text-center rounded-full">
                  {{ statsStore.stats.total.outOfStock }}
                </span>
              </NuxtLink>
            </div>

            <!-- Bouton d'icône arrondi pour l'utilisateur -->
            <div class="relative inline-block text-left">
              <button @click="toggleDropdown" @focus="onBlur" @blur="onBlur"
                class="rounded-full text-white hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2">
                <img v-if="auth.user?.photo" class="rounded-full shadow-xl w-10 h-10 object-cover"
                  :src="getImageUrl(auth.user?.photo)" alt="" srcset="">
                <div v-else class="bg-gray-200 text-black w-8 h-8 flex justify-center items-center rounded-full p-5">
                  <i class="fa fa-user"></i>
                </div>
              </button>

              <!-- Menu déroulant -->
              <div v-if="isDropdownOpen"
                class="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                aria-labelledby="dropdown-button" role="menu">
                <div class="py-1" role="none">
                  <NuxtLink to="/" class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-700" role="menuitem">
                    <i class="fa-solid fa-landmark"></i>
                    Tableau de bord
                  </NuxtLink>
                  <NuxtLink to="profile" class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-700" role="menuitem">
                    <i class="fa-solid fa-user"></i>
                    Profil
                  </NuxtLink>
                  <NuxtLink @click="logout" class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-700" role="menuitem">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    Déconnexion
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const auth = useAuthStore();
const router = useRouter();
const route: any = useRoute();
const isDropdownOpen = ref(false);

const statsStore = useStatisticsStore();

onMounted(() => {
  statsStore.getData();
})
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
}

const onBlur = () => {
  setTimeout(() => {
    isDropdownOpen.value = false
    
  }, 300);
}

const logout = () => {
  auth.logout().then(() => {
    router.replace('/login')
  });
}


</script>