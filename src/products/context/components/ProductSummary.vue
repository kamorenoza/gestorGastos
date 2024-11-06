<template>
  <div class="summary d-flex align-items-center mb-2">
    <div class="d-flex align-items-center w-50">
      <b-icon class="text-success mx-2" :font-scale="1.4"  icon="arrow-up-circle-fill" />
      <div>
        <p class="gray-xs-text">Ingresos</p>
        <p class="text-success text-book">$ {{ incomes | formatNumber }}</p>
      </div>
    </div>

    <div class="d-flex align-items-center border-left w-50 pl-2">
      <b-icon class="text-danger mx-2" :font-scale="1.3" icon="arrow-down-circle-fill" />
      <div>
        <p class="gray-xs-text">Gastos</p>
        <p class="text-danger text-book">$ {{ expenses | formatNumber }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountsSummary',

  props: {
    expenses: {
      type: Number,
      default: 0
    },

    incomes: {
      type: Number,
      default: 0
    }
  }
}
</script>
