<template>
  <div class="l-all-content">
    <div class="l-title-graph">
      <p class="title pl-2 mb-4">Estadísticas</p>
      <select-period class="m-select-period--graph" />
    </div>

    <pie-chart />
  </div>
</template>

<script>
import SelectPeriod from '@/home/context/components/selectPeriod.vue'
import PieChart from '../components/PieChart.vue'
export default {
  components: { PieChart, SelectPeriod },
  name: 'StatisticsView'
}
</script>
