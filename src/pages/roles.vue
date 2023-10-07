<template>
  <div>
    <!-- Liste des users -->
    <div class="p-5 bg-white w-full h-screen shadow-2xl rounded-lg bg-opacity-25">
      <Datatable>
        <thead>
          <tr>
            <th class="px-6 py-3 text-left text-sm font-bold">Nom</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Email</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Rôle</th>
          </tr>
        </thead>
        <tbody class="bg-white text-gray-600 divide-y divide-gray-200">
          <tr>
            <td class="px-6 py-4 whitespace-no-wrap">John Doe</td>
            <td class="px-6 py-4 whitespace-no-wrap">john@example.com</td>
            <td class="px-6 py-4 whitespace-no-wrap">Utilisateur</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-no-wrap">Jane Smith</td>
            <td class="px-6 py-4 whitespace-no-wrap">jane@example.com</td>
            <td class="px-6 py-4 whitespace-no-wrap">Admin</td>
          </tr>
        </tbody>
      </Datatable>
      
    </div>

  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: "main",
});
const routes= useRoute()
</script>

<style scoped></style>