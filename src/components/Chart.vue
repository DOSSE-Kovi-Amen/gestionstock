<template>
    <div>
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto';

const props = defineProps(['data'])

const chartCanvas = ref<any>(null);
const salesStore = useSalesStore();
const salesData = [
    props.data.monthlySales.Jan || 0,
    props.data.monthlySales.Feb || 0,
    props.data.monthlySales.Mar || 0,
    props.data.monthlySales.Apr || 0,
    props.data.monthlySales.May || 0,
    props.data.monthlySales.Jun || 0,
    props.data.monthlySales.Jul || 0,
    props.data.monthlySales.Aug || 0,
    props.data.monthlySales.Sep || 0,
    props.data.monthlySales.Oct || 0,
    props.data.monthlySales.Nov || 0,
    props.data.monthlySales.Dec || 0,
];
const lossesData = [
    props.data.monthlyLosses.Jan || 0,
    props.data.monthlyLosses.Feb || 0,
    props.data.monthlyLosses.Mar || 0,
    props.data.monthlyLosses.Apr || 0,
    props.data.monthlyLosses.May || 0,
    props.data.monthlyLosses.Jun || 0,
    props.data.monthlyLosses.Jul || 0,
    props.data.monthlyLosses.Aug || 0,
    props.data.monthlyLosses.Sep || 0,
    props.data.monthlyLosses.Oct || 0,
    props.data.monthlyLosses.Nov || 0,
    props.data.monthlyLosses.Dec || 0,
];

const profitData = [
    props.data.monthlyProfit.Jan || 0,
    props.data.monthlyProfit.Feb || 0,
    props.data.monthlyProfit.Mar || 0,
    props.data.monthlyProfit.Apr || 0,
    props.data.monthlyProfit.May || 0,
    props.data.monthlyProfit.Jun || 0,
    props.data.monthlyProfit.Jul || 0,
    props.data.monthlyProfit.Aug || 0,
    props.data.monthlyProfit.Sep || 0,
    props.data.monthlyProfit.Oct || 0,
    props.data.monthlyProfit.Nov || 0,
    props.data.monthlyProfit.Dec || 0,
];


onMounted(() => {
    const ctx = chartCanvas.value.getContext("2d");

    new Chart(ctx, {
        type: "line", // Type de graphique (par exemple, ligne)
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // Libellés de l'axe des x
            datasets: [
                {
                    label: `Ventes (Total: ${formatMonetaire(props.data.totalSales)})`, // Légende du graphique avec la somme
                    data: salesData,// Valeurs du graphique
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: false,
                },
                {
                    label: `Pertes (Total: ${formatMonetaire(props.data.totalLosses)})`,
                    data: lossesData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: false,
                },
                {
                    label: `Bénéfices (Total: ${formatMonetaire(props.data.totalProfit)})`,
                    data: profitData,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: false,
                },
            ],
        },
        // options: {
        //     responsive: true,
        //     scales: {
        //         y: {
        //             beginAtZero: true,
        //         },
        //     },
        // },
    });
});

</script>

<style scoped></style>