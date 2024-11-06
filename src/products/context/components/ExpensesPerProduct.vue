<template>
  <div class="l-list px-4">
    <product-summary :expenses="product.getTotalExpense()" :incomes="product.getTotalIncome()" />

    <div class="pb-1 border-bottom d-flex align-items-center justify-content-center">
      <div class="d-flex align-items-center justify-content-center">
        <div class="action action--sm mr-2 d-flex">
          <button disabled class="button-action">
            <b-icon icon="coin" />
          </button>
        </div>
        <p class="gray-xs-text mr-1">Saldo total</p>
      </div>
      <div class="text-center pl-2 mb3">
        <p class="text-book text-medium">$ {{ product.getTotalIncome() - product.getTotalExpense() | formatNumber }}</p>
      </div>
    </div>

    <div class="mt-4" v-for="item in expensesByDate" :key="item.date">
      <p class="text-sm text-book mb-3"> {{ item.date | formatDateMonthYear }} </p>
      <expense-product-row v-for="expense in item.expenses" :key="expense.id" :expense="expense" />
    </div>
  </div>
</template>

<script>
import { utils } from '@/shared/utils'
import ExpenseProductRow from './ExpenseProductRow.vue'
import ProductSummary from './ProductSummary.vue'
import moment from 'moment'

export default {
  components: { ExpenseProductRow, ProductSummary },
  name: 'ExpensesPerProduct',

  props: {
    product: {
      type: Object,
      required: true
    }
  },

  computed: {
    expensesByDate () {
      let expenses = []
      const dates = []
      let firstDatePeriod = ''
      let lastDatePeriod = ''
      const product = this.product

      product.expenses.sort((a, b) => { return new Date(b.date) - new Date(a.date) })

      product.expenses.forEach((expense, index) => {
        if (index === 0) {
          firstDatePeriod = utils.getFirstDay(expense.date)
          lastDatePeriod = utils.getLastDay(expense.date)
        }

        if (moment(expense.date).isBetween(firstDatePeriod, lastDatePeriod, undefined, '[]')) {
          expenses.push(expense)
        } else {
          dates.push({ date: firstDatePeriod, expenses })

          firstDatePeriod = utils.getFirstDay(expense.date)
          lastDatePeriod = utils.getLastDay(expense.date)
          expenses = []

          expenses.push(expense)
        }
      })

      dates.push({ date: firstDatePeriod, expenses })

      return product.expenses.length > 0 ? dates : []
    }
  }
}
</script>
