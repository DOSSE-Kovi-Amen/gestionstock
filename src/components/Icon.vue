<template>
  <div>
    <!--  Menu Icon-->
    <svg class="p-0 m-0" v-if="name == 'menu'" :stroke="color" fill="none" :width="size" :height="size"
      viewBox="0 0 24 24" xmlns="http://www.w3.org/1999/svg">
      <path d="M3 7H21" stroke-width="1.5" stroke-linecap="round" />
      <path d="M3 12H21" stroke-width="1.5" stroke-linecap="round" />
      <path d="M3 17H21" stroke-width="1.5" stroke-linecap="round" />
    </svg>
    <!--Dashboard icon  -->
    <svg v-if="name == 'bank'" :width="size" :height="size" stroke="currentColor" viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.37 2.15009L21.37 5.75006C21.72 5.89006 22 6.31006 22 6.68006V10.0001C22 10.5501 21.55 11.0001 21 11.0001H3C2.45 11.0001 2 10.5501 2 10.0001V6.68006C2 6.31006 2.28 5.89006 2.63 5.75006L11.63 2.15009C11.83 2.07009 12.17 2.07009 12.37 2.15009Z"
        stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M22 22H2V19C2 18.45 2.45 18 3 18H21C21.55 18 22 18.45 22 19V22Z" stroke-width="1.5" stroke-miterlimit="10"
        stroke-linecap="round" stroke-linejoin="round" />
      <path d="M4 18V11" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M8 18V11" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M12 18V11" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M16 18V11" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M20 18V11" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M1 22H23" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path
        d="M12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z"
        stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

    <!-- User Icon -->

    <svg v-if="name == 'user'" :width="size" :height="size" stroke="currentColor" viewBox="0 0 24 24" fill="currentColor"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke-width="1.5"
        stroke-linecap="round" stroke-linejoin="round" />
    </svg>

    <!-- Lock Icon -->
    <svg v-if="name == 'lock'" :width="size" :height="size" stroke="currentColor" viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10" stroke-width="1.5" stroke-linecap="round"
        stroke-linejoin="round" />
      <path d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z" stroke-width="1.5"
        stroke-linecap="round" stroke-linejoin="round" />
      <path d="M15.9965 16H16.0054" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M11.9955 16H12.0045" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M7.99451 16H8.00349" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </div>
</template>

<script setup>
defineProps(["name", "size", "color"])
</script>