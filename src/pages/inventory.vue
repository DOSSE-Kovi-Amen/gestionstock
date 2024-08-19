<template>
    <div class="container mx-auto py-8">
        <h1 class="text-2xl font-bold mb-6">Inventaire</h1>

        <div class="flex mb-6 space-x-4">
            <div class="flex flex-row gap-3">
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="quantity">Date de début: </label>
                    <input v-model="startDate" type="date" class="p-2 border rounded" placeholder="Start Date" />
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="">Date de fin:</label>
                    <input v-model="endDate" type="date" class="p-2 border rounded" placeholder="End Date" />
                </div>
            </div>
            <button @click="fetchInventory" class="mt-7 px-4 py-2 h-10 bg-blue-500 text-white rounded">
                Filtrer
            </button>
        </div>
        <div class="p-5 bg-white w-full h-full shadow-2xl rounded-lg bg-opacity-25">

            <Datatable v-if="!store.loading" class="min-w-full bg-white">
                <thead>
                    <tr>
                        <th class="py-2">Produit</th>
                        <th class="py-2">Catégorie</th>
                        <th class="py-2">Stock entrant</th>
                        <th class="py-2">Qte vendue</th>
                        <th class="py-2">Qte perdue</th>
                        <th class="py-2">Stock restant actuel</th>
                        <th class="py-2">Alerte stock</th>
                    </tr>
                </thead>
                <tbody class="bg-white text-gray-600 divide-y divide-gray-200">
                    <tr v-for="item in store.inventory" :key="item.id" class="border-t">
                        <td class="py-2">{{ item.name }}</td>
                        <td class="py-2">{{ item.category }}</td>
                        <td class="py-2">{{ item.initial_stock }}</td>
                        <td class="py-2">{{ item.sold_quantity }}</td>
                        <td class="py-2">{{ item.lost_quantity }}</td>
                        <td class="py-2">{{ item.current_stock }}</td>
                        <td class="py-2">{{ item.reorder_level }}</td>
                    </tr>
                </tbody>
            </Datatable>
            <div v-else class="flex flex-col justify-center items-center">
                <p class="m-2">Chargement en cours...</p>
                <Spinner class="h-12" />
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFetch } from '#app';
import { useInventoryStore } from '~/stores/inventoryStore';

const store = useInventoryStore();

const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);
onMounted(() => {
    store.getData()
})
const fetchInventory = async () => {
    const params = new URLSearchParams();

    store.getDataByDateFilter(startDate.value, endDate.value)
};

definePageMeta({
    layout: "main",
});
</script>

<style scoped>
/* Custom Tailwind CSS styles if needed */
</style>