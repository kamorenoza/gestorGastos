<template>
  <div>
    <title-general :title="productSelected.getName()" backRoute="/products" :addButtonFunction="addExpense" />
     <div class="l-content">
      <expenses-per-product :product="productSelected" />
      <add-product-expense />
    </div>
  </div>
</template>

<script>
import TitleGeneral from '@/shared/components/TitleGeneral.vue'
import { mapMutations, mapState } from 'vuex'
import Notification from '@/shared/notification'
import AddProductExpense from '../components/AddProductExpense.vue'
import ExpensesPerProduct from '../components/ExpensesPerProduct.vue'

export default {

  components: {
    TitleGeneral,
    AddProductExpense,
    ExpensesPerProduct
  },

  name: 'DetailsAccount',

  computed: {
    ...mapState('productsStore', ['productSelected'])
  },

  methods: {
    async addExpense () {
      const confirmation = await new Notification().selectOption('Gasto', 'Ingreso')

      if (confirmation.isConfirmed) this.setType('credit')
      else if (confirmation.isDenied) this.setType('debit')

      if (confirmation.isConfirmed || confirmation.isDenied) this.$bvModal.show('add-expense-product-modal')
    },

    ...mapMutations('productsStore', ['setType', 'setProductSelected'])
  },

  created () {
    if (!this.productSelected) this.$router.push('/products')
  },

  beforeDestroy () {
    this.setProductSelected(null)
  }
}
</script>
