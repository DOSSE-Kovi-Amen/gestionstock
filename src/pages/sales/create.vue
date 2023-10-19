<template>
  <div>
    <!-- Liste des users -->
      <table class="shadow-lg w-full table-hover table-head text-white">
        <thead>
          <tr>
            <th class="px-6 py-3 text-left text-sm font-bold">Produit</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Prix unitaire</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Stock restant</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Qté</th>
            <th class="px-6 py-3 text-left text-sm font-bold">Montant</th>

          </tr>
        </thead>
        <tbody class="bg-white text-gray-600 divide-y divide-gray-200">
          <tr
            v-for="(sale, index) in store.sales"
            :key="index"
            :title="`Créé le ${formatDateFrench(
              sale.createdAt
            )}\nModifié le ${formatDateFrench(sale.updatedAt)}}`"
          >
            <td class="px-6 py-4 whitespace-no-wrap">{{ sale.id }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ sale.reference }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ sale.createdAt }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ sale.totalAmount }}</td>
            <td class="px-6 py-4 whitespace-no-wrap">{{ sale.discount }}</td>

            <!-- <td class="flex gap-2">
                  <a class="p-0.5 px-2 text-white  bg-yellow-500 hover:bg-yellow-600 shadow-xl rounded-sm"
                    @click="openModal(sale, 'read')">
                    <i class="fa-regular fa-eye"></i>
                  </a>
                  <a class="p-0.5 px-2 text-white  bg-blue-500 hover:bg-blue-600 shadow-xl rounded-sm"
                    @click="openModal(sale, 'edit')">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </a>
                  <a class="p-0.5 px-2 text-white  bg-red-500 hover:bg-red-600 shadow-xl rounded-sm"
                    @click="openModal(sale, 'delete')">
                    <i class="fa-regular fa-trash-can"></i>
                  </a>
    
                </td> -->
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script lang="ts" setup>
const store = useProductsStore();

definePageMeta({
  layout: "main",
});
</script>
