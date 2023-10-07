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
            <span class="px-3 py-2 bg-white right-0 rounded-full font-normal">Tableau
              de bord
              <span class="text-gray-500 font-normal">{{ route.name == 'index' ? '' : '> ' + route.name }}</span>
            </span>

          </div>


          <div class="space-x-4 h-10">
            <!-- Ajoutez ici les éléments du menu de votre navbar -->
            <div class="relative inline-block text-left">
              <!-- Bouton d'icône arrondi -->
              <a @click="toggleDropdown" @blur="onBlur"
                class="rounded-full text-white hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2">
                <img class="rounded-full w-10 h-10 object-cover"
                  src="https://images.unsplash.com/photo-1687360440984-3a0d7cfde903?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                  alt="" srcset="">
              </a>


              <!-- Menu déroulant -->
              <div v-if="isDropdownOpen"
                class="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                aria-labelledby="dropdown-button" role="menu">
                <div class="py-1" role="none">
                  <NuxtLink to="/"
                    class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-700"
                    role="menuitem">
                    <i class="fa-solid fa-landmark"></i>
                    Tableau de bord
                  </NuxtLink>
                  <NuxtLink to="profile"
                    class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-700"
                    role="menuitem">
                    <i class="fa-solid fa-user"></i>          
                    Profil
                  </NuxtLink>
                  <NuxtLink @click="logout"
                    class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-700"
                    role="menuitem">
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
    <!-- Contenu principal -->

    <!-- <slot /> -->

  </header>
</template>

<script setup lang="ts">
const auth = useAuthStore();
const router = useRouter();
const route:any = useRoute();

const isDropdownOpen = ref(false);
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
}

const onBlur = () => {
  isDropdownOpen.value = false
}
const logout = () => {
  auth.logout().then(() => {
    router.replace('/login')
  });
}


</script>