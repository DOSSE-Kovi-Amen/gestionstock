<template>
  <div>
    <div v-if="!statsStore.loading">
    <div  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

      <NuxtLink class="shadow-2xl rounded-md transition-transform transform hover:scale-105 duration-300" to="/categories">
        <Card title="Dettes" icon="fa-list" :count="animateCounter(statsStore.stats?.total.totalOfDebt)"
          class="bg-card-0 text-white rounded-md" />
      </NuxtLink>
      <NuxtLink class="shadow-2xl rounded-md transition-transform transform hover:scale-105 duration-300" to="/low-stock-products">
        <Card title="Ruptures" icon="fa-users" :count="animateCounter(statsStore.stats?.total.outOfStock)"

          class="bg-card-1 text-white rounded-md" />
      </NuxtLink>

      <NuxtLink class="shadow-2xl rounded-md transition-transform transform hover:scale-105 duration-300"
        to="/sales">
        <Card title="Ventes" icon="fa-building" :count="animateCounter(statsStore.stats?.total.sales)"
          class="bg-card-2 text-white rounded-md" />
      </NuxtLink>
      <NuxtLink to="settings/users"class="shadow-2xl rounded-md transition-transform transform hover:scale-105 duration-300">
        <Card title="Utilisateurs" icon="fa-users" :count="animateCounter(statsStore.stats?.total.users)"
          class="bg-card-3 text-white rounded-md" />
      </NuxtLink>


    </div>
    <div class="rounded-xl p-6 bg-white  shadow-xl mt-5">

      <div class="grid grid-cols-1 sm:grid-cols-3">
        <div class="col-span-2 rounded-xl p-6 bg-white  shadow-xl mt-5">
          <h1>Statistiques par an</h1>
          <!-- <Card title="Utilisateurs" count="0" class="h-40 md:h-96 bg-card-4 text-white" /> -->
          <Chart :data="statsStore.stats?.total.chartLine"/>
        </div>

        <div class="card p-6 bg-white shadow-lg rounded-lg">
          <div class="flex gap-4 mb-6">
            <select id="period" v-model="selectedPeriod" class="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option value="day">Aujourd'hui</option>
              <option value="week">Cette Semaine</option>
              <option value="month">Ce Mois</option>
              <option value="year">Cette Année</option>
              <option value="total">Total</option>
            </select>
          </div>
          <h2 class="text-2xl font-semibold mb-4">Statistiques - {{ periodTitle }}</h2>
          <ul>
            <li v-for="(value, key) in selectedStats" :key="key" class="flex justify-between py-2 border-b">
              <span>{{ key }}</span>
              <span>{{ value }}</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
    <div style="height: 80vh;" v-else class="flex flex-col bg-white justify-center items-center ">
      <p class="m-2">Chargement en cours...</p>
      <Spinner class="h-12" />
    </div>
  </div>

</template>

<script setup lang="ts">

const statsStore = useStatisticsStore();

onMounted(() => {
  statsStore.getData();
  
  setTimeout(() => {
      selectedStats.value = statsStore.stats.day

  }, 3000);
  
})
const selectedPeriod: any = ref('day');
const selectedStats = ref(statsStore.stats.day);
const periodTitle = ref('Aujourd\'hui');

const periods: any = {
  day: "Aujourd'hui",
  week: "Cette Semaine",
  month: "Ce Mois",
  year: "Cette Année",
  total: "Total"
};

watch(selectedPeriod, (newPeriod:any) => {
  switch(newPeriod){
    case 'day': selectedStats.value = statsStore.stats.day;
    break;
    case 'week':selectedStats.value = statsStore.stats.week;
    break;
    case 'month':selectedStats.value = statsStore.stats.month;
    break;
    default :selectedStats.value = statsStore.stats.year;

  }  periodTitle.value = periods[newPeriod];
});
function selectPeriod(period: any) {
  statsStore.getData()

  selectedPeriod.value = period;
  periodTitle.value = periods[period];
  switch(period){
    case 'day': selectedStats.value = statsStore.stats.day;
    break;
    case 'week':selectedStats.value = statsStore.stats.week;
    break;
    case 'month':selectedStats.value = statsStore.stats.month;
    break;
    default :selectedStats.value = statsStore.stats.year;

  }
}
definePageMeta({
  layout: "main",
});
</script>

<style scoped>
.btn {
  @apply text-white font-bold py-2 px-4 rounded transition duration-300;
}

.card {
  @apply max-w-2xl mx-auto;
}
</style>