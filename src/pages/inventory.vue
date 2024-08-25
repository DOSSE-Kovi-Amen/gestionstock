<template>
    <div class="container mx-auto py-8">
        <h1 class="text-2xl font-bold mb-6">Inventaire</h1>

        <div class="flex mb-6 space-x-4">
            <div class="flex flex-row gap-3">
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="startDate">Date de début:</label>
                    <input v-model="startDate" type="date" class="p-2 border rounded" :max="today" required placeholder="Start Date" />
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="endDate">Date de fin:</label>
                    <input v-model="endDate" type="date" class="p-2 border rounded" :max="today" required placeholder="End Date" />
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
import { ref, onMounted } from 'vue';
import { useInventoryStore } from '~/stores/inventoryStore';

const store = useInventoryStore();

const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);

onMounted(() => {
    store.getData();
});

const fetchInventory = async () => {
    if (!startDate.value || !endDate.value) {
        alert("Les deux dates sont obligatoires.");
        return;
    }

    if (startDate.value > today || endDate.value > today) {
        alert("Les dates ne peuvent pas être supérieures à la date d'aujourd'hui.");
        return;
    }

    store.getDataByDateFilter(startDate.value, endDate.value);
};

definePageMeta({
    layout: "main",
});
</script>
