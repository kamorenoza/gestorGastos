<template>
  <div>
    <title-general title="Mis cuentas" addButtonRoute="/save-product" />
    <div class="l-content l-content--blue">
    <div class="l-list">
      <product-summary :expenses="totalCredit" :incomes="totalDebit" />
      <product-row v-for="(product, index) in products" :key="index" :product="product" />
    </div>
  </div>
  </div>
</template>

<script>
import TitleGeneral from '@/shared/components/TitleGeneral.vue'
import ProductRow from '../components/ProductRow.vue'
import { mapState } from 'vuex'
import ProductSummary from '../components/ProductSummary.vue'

export default {
  name: 'ProductsView',

  components: {
    TitleGeneral,
    ProductRow,
    ProductSummary
  },

  computed: {
    totalCredit () {
      let total = 0
      this.products.forEach(product => { total += product.getTotalExpense() })

      return total
    },

    totalDebit () {
      let total = 0
      this.products.forEach(product => { total += product.getTotalIncome() })

      return total
    },

    ...mapState('productsStore', ['products'])
  }
}
</script>
