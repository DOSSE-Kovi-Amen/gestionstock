<template>
    <div>
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto';




const chartCanvas = ref<any>(null);
const salesStore = useSalesStore();

onMounted(() => {
    const ctx = chartCanvas.value.getContext("2d");

    new Chart(ctx, {
        type: "line", // Type de graphique (par exemple, ligne)
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May"], // Libellés de l'axe des x
            datasets: [
                {
                    label: "Ventes", // Légende du graphique
                    data: [ 20, 15, 30, 25], // Valeurs du graphique
                },
            ],
        },
    });
});

</script>

<style scoped></style>