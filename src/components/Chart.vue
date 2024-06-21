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
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // Libellés de l'axe des x
            datasets: [
                {
                    label: "Ventes", // Légende du graphique
                    data: [
                        props.data.Jan || 0,
                        props.data.Feb || 0,
                        props.data.Mar || 0,
                        props.data.Apr || 0,
                        props.data.May || 0,
                        props.data.Jun || 0,
                        props.data.Jul || 0,
                        props.data.Aug || 0,
                        props.data.Sep || 0,
                        props.data.Oct || 0,
                        props.data.Nov || 0,
                        props.data.Dec || 0
                    ], // Valeurs du graphique
                },
            ],
        },
    });
});
const props = defineProps(['data'])

</script>

<style scoped></style>