<template>
  <aside
    :class="{ 'sidebar w-72': isSidebarOpen, 'sidebar-sm w-16': !isSidebarOpen, 'transition-width duration-500 ease-in-out': true }"
    class="sidebar overflow-y-auto h-screen  min-h-screen">
    <!-- Logo ou nom du dashboard -->
    <!-- <div class="w-full shadow-2xl bg-white sidebar-logo p-2">
      <a class="flex items-center" href="/">
        <div class="w-10 h-10 flex justify-center items-center ">
          <img class="rounded-full w-7" src="@/assets/images/favicon.ico" />
        </div>
        <div :class="{ 'hidden': !isSidebarOpen }" class="w-40 h-10 flex justify-center items-center ">
          <img src="@/assets/images/logotext.png" />
        </div>
      </a>
    </div> -->
    <!-- <hr /> -->
    <!-- Liens du menu de la sidebar -->
    <nav class="mt-3">
      <ul class="mt-4 space-y-2">
        <li>
          <NuxtLink to="/" :class="{ 'justify-center': !isSidebarOpen }"
            class="block flex items-center gap-4 p-3 router-link">
            <!-- <Icon name="uil:bars" color="red" class="icon text-yellow-400 bg-white" size="25" /> -->
            <i class="fa-solid fa-house"></i>
            <span :class="{ 'hidden': !isSidebarOpen }">Tableau de bord</span>
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/categories" :class="{ 'justify-center': !isSidebarOpen }"
            class="block flex items-center gap-4 p-3 router-link">
            <!-- <Icon name="uil:bars" color="red" class="icon text-yellow-400 bg-white" size="25" /> -->
            <i class="fa-solid fa-list"></i>
            <span :class="{ 'hidden': !isSidebarOpen }">Catégories</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/products" :class="{ 'justify-center': !isSidebarOpen }"
            class="block flex items-center gap-4 p-3 router-link">
            <!-- <Icon name="uil:bars" color="red" class="icon text-yellow-400 bg-white" size="25" /> -->
            <i class="fa-solid fa-shop"></i>
            <span :class="{ 'hidden': !isSidebarOpen }">Produits</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/sales" :class="{ 'justify-center': !isSidebarOpen }"
            class="block flex items-center gap-4 p-3 router-link">
            <!-- <Icon name="uil:bars" color="red" class="icon text-yellow-400 bg-white" size="25" /> -->
            <i class="fa-solid fa-cash-register fa-lg"></i>
            <span :class="{ 'hidden': !isSidebarOpen }">Ventes</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/stocks" :class="{ 'justify-center': !isSidebarOpen }"
            class="block flex items-center gap-4 p-3 router-link">
            <!-- <Icon name="uil:bars" color="red" class="icon text-yellow-400 bg-white" size="25" /> -->
            <i class="fa-solid fa-cube fa-lg"></i>
            <span :class="{ 'hidden': !isSidebarOpen }">Stocks</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/spends" :class="{ 'justify-center': !isSidebarOpen }"
            class="block flex items-center gap-4 p-3 router-link">
            <!-- <Icon name="uil:bars" color="red" class="icon text-yellow-400 bg-white" size="25" /> -->
            <i class="fa-solid fa-money-bill"></i>
            <span :class="{ 'hidden': !isSidebarOpen }">Dépenses</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/losses" :class="{ 'justify-center': !isSidebarOpen }"
            class="block flex items-center gap-4 p-3 router-link">
            <!-- <Icon name="uil:bars" color="red" class="icon text-yellow-400 bg-white" size="25" /> -->
            <i class="fa-solid fa-exclamation-triangle"></i>
            <span :class="{ 'hidden': !isSidebarOpen }">Pertes</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/users" :class="{ 'justify-center': !isSidebarOpen }"
            class="block flex items-center gap-4 p-3 router-link">
            <!-- <Icon name="uil:bars" color="red" class="icon text-yellow-400 bg-white" size="25" /> -->
            <i class="fa-solid fa-users"></i>
            <span :class="{ 'hidden': !isSidebarOpen }">Utilisateurs</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/roles" :class="{ 'justify-center': !isSidebarOpen }"
            class="block flex items-center gap-4 p-3 router-link">
            <!-- <Icon name="uil:bars" color="red" class="icon text-yellow-400 bg-white" size="25" /> -->
            <Icon name="lock" size="20" />

            <span :class="{ 'hidden': !isSidebarOpen }">Roles</span>
          </NuxtLink>
        </li>
        <!-- Ajoutez d'autres liens de la sidebar ici -->
      </ul>
    </nav>


    <div class="absolute bottom-0  w-52 left-0 p-2">
      <div v-if="isDropdownOpen" class="mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        aria-labelledby="dropdown-button" role="menu">
        <div class="py-1" role="none">
          <NuxtLink to="/"
            class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-700"
            role="menuitem">
            <i class="fa-solid fa-landmark"></i>
            Tableau de bord
          </NuxtLink>
          <NuxtLink to="/profile"
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

      <button @click="toggleDropdown" @blur="onBlur" class="flex " id="dropdown-button" aria-haspopup="true"
        aria-expanded="true">
        <img class="rounded-full w-10 h-10 object-cover"
          src="https://images.unsplash.com/photo-1687360440984-3a0d7cfde903?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
          alt="" srcset="">
        <span :class="{ 'hidden': !isSidebarOpen }" class="mt-2 mx-2 text-white font-semibold">{{
          `${auth.user?.last_name}` }}</span>

      </button>


    </div>
  </aside>
</template>

<style>
@media (max-width: 768px) {

  /* Styles à appliquer lorsque la largeur de l'écran est de 768 pixels ou moins */
  .sidebar {
    width: 300px;
    background-color: #10a3c2 !important;
    position: absolute;
    z-index: 10;
  }

  .sidebar-sm {
    display: none;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {

  /* Styles à appliquer lorsque la largeur de l'écran est entre 769 et 1024 pixels */
  .sidebar {
    font-size: 16px;
  }
}
</style>
<script setup lang="ts">

const auth = useAuthStore();
const router = useRouter();
const isDropdownOpen = ref(false);

defineProps(['isSidebarOpen'])

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
}

const onBlur = () => {
  setTimeout(() => {
    // isDropdownOpen.value = false
  }, 100);
}

const logout = () => {
  auth.logout().then(() => {
  });
  router.replace('/login')

}

</script>